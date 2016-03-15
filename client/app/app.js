'use strict';

var GraphTrackForceLayout = function(target, width, height) {  
  const _color = d3.scale.category20();
  
  const _d3Layout = d3.layout.force()
    .charge(-1000)
    .linkDistance(100)
    .size([width, height]);
  
  const _d3Target = d3.select(target).append('svg')
    .attr('width', width)
    .attr('height', height);
  
  const _d3Tooltip = d3.select(target).append('div')
    .attr('class', 'gt-force-tooltip')
    .style('opacity', 0);
  
  const _nodeMap = {};
  const _nodeNetFlow = {};
  const _nodeInOuts = {};
  const _reverseLink = {};
  
  function _parseNodes(rawNodes) {
    const parsedNodes = [];

    rawNodes.forEach(s => {
      if (s.state === 'launch') {
        return;
      }

      _nodeMap[s.state] = parsedNodes.length;
      _nodeNetFlow[s.state] = s.launch;
      _nodeInOuts[s.state] = { ins: [], outs: [] };
      
      parsedNodes.push({
        state: s.state,
        count: s.count,
        launch: s.launch,
        exit: s.exit,
        group: 1,
      });
    });

    return parsedNodes;
  }
  
  function _parseLinks(rawLinks) {
    return rawLinks.map(link => {
      _nodeNetFlow[link.state_from] -= link.count;
      _nodeNetFlow[link.state_to] += link.count;
      
      _nodeInOuts[link.state_to].ins.push(link);
      _nodeInOuts[link.state_from].outs.push(link);
      
      _reverseLink[link.state_to+':'+link.state_from] = link;
      
      return {
        source: _nodeMap[link.state_from],
        target: _nodeMap[link.state_to],
        count: link.count,
      };
    });
  }
  
  function _lineWidth(value) {
    return 1.5 * Math.sqrt(value);
  }
  
  function _mkExternals(nodes) {
    const d3External = _d3Target.selectAll('.gt-force-external')
      .data(nodes).enter().append('g')
        .attr('class', 'gt-force-external')
        .call(_d3Layout.drag);
    
    d3External.append('line')
      .attr('class', 'gt-force-external-launch')
      .style('stroke-width', d => _lineWidth(d.launch))
      .attr('x1', 0).attr('y1', -height)
      .attr('x2', 0).attr('y2', 0);

    d3External.append('line')
      .attr('class', 'gt-force-external-exit')
      .style('stroke-width', d => _lineWidth(_nodeNetFlow[d.state]))
      .attr('x1', 0).attr('y1', 0)
      .attr('x2', 0).attr('y2', height);
    
    return d3External;
  }
  
  function _mkLinks(links) {
    return _d3Target.selectAll('.gt-force-link')
      .data(links).enter().append('line')
        .attr('class', 'gt-force-link')
        .style('stroke-width', d => _lineWidth(d.count))
        .on('mouseover', _showLineTooltip)
        .on('mouseout', _hideTooltip);
  }
  
  function _mkNodes(nodes) {
    const d3Nodes = _d3Target.selectAll('.gt-force-node')
      .data(nodes).enter().append('g')
        .attr('class', 'gt-force-node')
        .call(_d3Layout.drag);
    
    d3Nodes.append('circle')
      .attr('r', d => Math.sqrt(d.count))
      .style('fill', d => _color(d.group))
      .on('mouseover', _showTooltip)
      .on('mouseout', _hideTooltip);

    d3Nodes.append('text')
      .attr('dy', '.3em')
      .text(d => d.state)
      .on('mouseover', _showTooltip)
      .on('mouseout', _hideTooltip);
    
    return d3Nodes;
  }
  
  function _tooltipHtml(d) {
    var str = `<pre class="gt-force-tooltip-box"><p><kbd>${d.state}</kbd> ${d.count}</p></pre>`;
    
    
    str += '<pre class="gt-force-tooltip-box gt-force-tooltip-box-in">';
    str += '<p><b>流入</b></p>';
    if (d.launch) {
      str += `<p><kbd style="background:aquamarine;">启动</kbd> ${d.launch}</p>`;
    }
    str += '<p>' + _.sortBy(_nodeInOuts[d.state].ins, 'count').reverse().map(link => `<kbd>${link.state_from}</kbd> ${link.count}</p>`).join('');
    str += '</p></pre>';
    
    
    str += '<pre class="gt-force-tooltip-box gt-force-tooltip-box-out">';
    str += '<p><b>流出</b></p>';
    if (_nodeNetFlow[d.state]) {
      str += `<p><kbd style="background:coral;color:white;">退出</kbd> ${_nodeNetFlow[d.state]}</p>`;
    }
    str += '<p>' + _.sortBy(_nodeInOuts[d.state].outs, 'count').reverse().map(link => `<kbd>${link.state_to}</kbd> ${link.count}</p>`).join('');
    str += '</p></pre>';
    
    
    return str;
  }
  
  function _showTooltip(d) {
    _d3Tooltip.transition()
      .style('display', 'block')
      .duration(200)
      .style('opacity', .9);
    
    _d3Tooltip.html(_tooltipHtml(d))
      .style('left', (d3.event.pageX)+'px')
      .style('top', (d3.event.pageY+20)+'px');
  }
  
  function _lineTooltipHtml(d) {
    var str = `<p><kbd>${d.source.state}</kbd> <span class="glyphicon glyphicon-arrow-right"></span> <kbd>${d.target.state}</kbd> ${d.count}</p>`;
    
    var reverse = _reverseLink[d.source.state+':'+d.target.state];
    
    if (reverse) {
      const str2 = `<p><kbd>${reverse.state_from}</kbd> <span class="glyphicon glyphicon-arrow-right"></span> <kbd>${reverse.state_to}</kbd> ${reverse.count}</p>`;
      if (reverse.count < d.count) {
        str += str2;
      } else {
        str = str2 + str;
      }
    }
    
    return `<pre class="gt-force-tooltip-box">${str}</pre>`;
  }
  
  function _showLineTooltip(d) {
    _d3Tooltip.transition()
      .style('display', 'block')
      .duration(200)
      .style('opacity', .9);
    
    _d3Tooltip.html(_lineTooltipHtml(d))
      .style('left', (d3.event.pageX)+'px')
      .style('top', (d3.event.pageY+20)+'px');
  }
  
  function _hideTooltip(d) {
    _d3Tooltip.transition()
      .duration(200)
      .style('opacity', 0)
      .transition()
      .style('display', 'none');
  }
  
  function render(url) {
    d3.json(url, (err, rawData) => {
      if (err) {
        throw err;
      }
      
      const nodes = _parseNodes(rawData[0]);
      const links = _parseLinks(rawData[1]);
      
      _d3Layout
        .nodes(nodes)
        .links(links)
        .start();
      
      const d3External = _mkExternals(nodes);
      const d3Links = _mkLinks(links);
      const d3Nodes = _mkNodes(nodes);
      
      _d3Layout.on('tick', () => {
        
        d3Links
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);
    
        d3Nodes.attr('transform', d => `translate(${d.x},${d.y})`);
        d3External.attr('transform', d => `translate(${d.x},${d.y})`);
      });
    });
  }
  
  return { render };
};

const gt = GraphTrackForceLayout('body', 1200, 640);
gt.render('/api/track/graph?appVersion=0.1');