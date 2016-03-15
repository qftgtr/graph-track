"use strict";function parseNodes(t){var e=[];return t.forEach(function(t,r){"exit"!==t.state&&"launch"!==t.state&&(nodeMap[t.state]=e.length,nodeNetFlow[t.state]=0,e.push({name:t.state,count:t.count,launch:t.launch,exit:t.exit,group:1}))}),e}function parseLinks(t){return t.map(function(t){return nodeNetFlow[t.state_from]-=t.count,nodeNetFlow[t.state_to]+=t.count,{source:nodeMap[t.state_from],target:nodeMap[t.state_to],value:t.count}})}var width=1200,height=640,color=d3.scale.category20(),force=d3.layout.force().charge(-1e3).linkDistance(100).size([width,height]),svg=d3.select("body").append("svg").attr("width",width).attr("height",height),nodeMap={},nodeNetFlow={};d3.json("/api/track/graph?appVersion=0.1",function(t,e){if(t)throw t;var r=parseNodes(e[0]),n=parseLinks(e[1]);force.nodes(r).links(n).start();var a=svg.selectAll(".link").data(n).enter().append("line").attr("class","link").style("stroke-width",function(t){return 1.5*Math.sqrt(t.value)}).style("stroke","#666"),o=svg.selectAll(".node").data(r).enter().append("g").attr("class","node").call(force.drag);o.append("line").style("stroke-width",function(t){return 1.5*Math.sqrt(t.launch)}).style("stroke","rgba(0,255,0,0.15)").attr("x1",0).attr("y1",-height).attr("x2",0).attr("y2",0),o.append("line").style("stroke-width",function(t){return 1.5*Math.sqrt(t.exit)}).style("stroke","rgba(255,0,0,0.15)").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",height),o.append("circle").attr("r",function(t){return Math.sqrt(t.count)}).style("fill",function(t){return color(t.group)}),o.append("text").attr("dy",".3em").text(function(t){return t.name}),force.on("tick",function(){a.attr("x1",function(t){return t.source.x}).attr("y1",function(t){return t.source.y}).attr("x2",function(t){return t.target.x}).attr("y2",function(t){return t.target.y}),o.attr("transform",function(t){return"translate("+t.x+","+t.y+")"})})}),function(t,e){t.module("graphTrackApp.constants",[]).constant("appConfig",{userRoles:["guest","user","admin"]})}(angular);