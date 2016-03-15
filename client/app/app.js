'use strict';

var width = 1200,
    height = 640;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-1000)
    .linkDistance(100)
    .size([width, height]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

const nodeMap = {};
const nodeNetFlow = {};

function parseNodes(rawNodes) {
  const parsedNodes = [];
  
  rawNodes.forEach((s,i) => {
    if (s.state === 'launch')
      return;
    
    nodeMap[s.state] = parsedNodes.length;
    nodeNetFlow[s.state] = s.launch;
    parsedNodes.push({
      name: s.state,
      count: s.count,
      launch: s.launch,
      exit: s.exit,
      group: 1,
    });
  });
  
  return parsedNodes;
}

function parseLinks(rawLinks) {
  return rawLinks.map(s => {
    nodeNetFlow[s.state_from] -= s.count;
    nodeNetFlow[s.state_to] += s.count;
    
    return {
      source: nodeMap[s.state_from],
      target: nodeMap[s.state_to],
      value: s.count,
    };
  });
}

d3.json("/api/track/graph?appVersion=0.1", function(err, rawData) {
  if (err) throw err;

  const nodes = parseNodes(rawData[0]);
  const links = parseLinks(rawData[1]);
  
  force
    .nodes(nodes)
    .links(links)
    .start();

  const d3Links = svg.selectAll(".link")
    .data(links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return 1.5*Math.sqrt(d.value); })
      .style('stroke', '#666');
  
  const d3Nodes = svg.selectAll('.node')
    .data(nodes)
    .enter()
      .append('g')
      .attr("class", "node")
      .call(force.drag)
  
  d3Nodes.append('line')
    .style('stroke-width', function(d) { return 1.5*Math.sqrt(d.launch); })
    .style('stroke', 'rgba(0,255,0,0.15)')
    .attr('x1', 0)
    .attr('y1', -height)
    .attr('x2', 0)
    .attr('y2', 0);
  
  d3Nodes.append("line")
    .style('stroke-width', function(d) { return 1.5*Math.sqrt(nodeNetFlow[d.name]); })
    .style('stroke', 'rgba(255,0,0,0.15)')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', height);
  
  d3Nodes.append("circle")
    .attr("r", d => Math.sqrt(d.count))
    .style("fill", function(d) { return color(d.group); })
  
  d3Nodes.append("text")
    .attr('dy', '.3em')
    .text(function(d) { return d.name; });
  
  force.on("tick", function() {
    d3Links.attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
    
    d3Nodes.attr('transform', d => {      
      return `translate(${d.x},${d.y})`;
    });
  });
});