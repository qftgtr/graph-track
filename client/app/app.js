'use strict';

var width = 960,
    height = 500;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-300)
    .linkDistance(100)
    .size([width, height]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var nodeMap = {},
  nodeNetFlow = {};

function parseNodes(rawNodes) {
  const parsedNodes = [];
  
  rawNodes.forEach((s,i) => {
    if (s.name === 'exit' || s.name === 'launch')
      return;
    
    nodeMap[s.state] = parsedNodes.length;
    nodeNetFlow[s.state] = 0;
    parsedNodes.push({
      name: s.state,
      group: 1,
      count: s.count,
    });
  });
  
  return parsedNodes;
}

function parseLinks(rawLinks) {
  return rawLinks.map(s => {
    nodeNetFlow[s.stateFrom] -= s.count;
    nodeNetFlow[s.stateTo] += s.count;
    
    return {
      source: nodeMap[s.stateFrom],
      target: nodeMap[s.stateTo],
      value: s.count,
      path: s.path,
    };
  });
}

d3.json("/api/track/graph?appVersion=1.0", function(err, rawData) {
  if (err) throw err;

  const nodes = parseNodes(rawData[0]);
  const links = parseLinks(rawData[1]);
  
  console.log(nodes);
  console.log(links);
  
  force
    .nodes(nodes)
    .links(links)
    .start();

  const d3Links = svg.selectAll(".link")
    .data(links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return 1.5*Math.sqrt(d.value); })
      .style('stroke', d => {
        if (d.target.name === 'exit')
          return '#633';
        
        if (d.source.name === 'launch')
          return '#353';
        
        return '#666';
      });

  const d3Nodes = svg.selectAll(".node")
    .data(nodes)
    .enter()
      .append('g')
      .attr("class", "node")
      .call(force.drag)
  
  d3Nodes.append("circle")
    .attr("r", d => 3*Math.sqrt(d.count))
    .style("fill", function(d) { return color(d.group); })
  
  d3Nodes.append("text")
    .attr('dy', '.3em')
    .text(function(d) { return d.name; });

//  node.append("title")
//    .text(function(d) { return d.name; });

  force.on("tick", function() {
    d3Links.attr("x1", d => (d.source.name==='launch') ? d.target.x : d.source.x)
        .attr("y1", d => (d.source.name==='launch') ? 0 : d.source.y)
        .attr("x2", d => (d.target.name==='exit') ? d.source.x : d.target.x)
        .attr("y2", d => (d.target.name==='exit') ? height : d.target.y);

    d3Nodes.attr('transform', d => {
      if (d.name === 'launch')
        return `translate(${width/2},${30})`
      
      if (d.name === 'exit')
        return `translate(${width/2},${height-30})`
      
      return `translate(${d.x},${d.y})`;
    });
  });
});