"use strict";var GraphTrackForceLayout=function(t,e,n){function r(t){var e=[];return t.forEach(function(t){"launch"!==t.state&&(x[t.state]=e.length,m[t.state]=t.launch,v[t.state]={ins:[],outs:[]},e.push({state:t.state,count:t.count,launch:t.launch,exit:t.exit,group:1}))}),e}function o(t){return t.map(function(t){return m[t.state_from]-=t.count,m[t.state_to]+=t.count,v[t.state_to].ins.push(t),v[t.state_from].outs.push(t),w[t.state_to+":"+t.state_from]=t,{source:x[t.state_from],target:x[t.state_to],count:t.count}})}function a(t){return 1.5*Math.sqrt(t)}function s(t){var e=k.selectAll(".gt-force-external").data(t).enter().append("g").attr("class","gt-force-external").call(h.drag);return e.append("line").attr("class","gt-force-external-launch").style("stroke-width",function(t){return a(t.launch)}).attr("x1",0).attr("y1",-n).attr("x2",0).attr("y2",0),e.append("line").attr("class","gt-force-external-exit").style("stroke-width",function(t){return a(m[t.state])}).attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",n),e}function c(t){return k.selectAll(".gt-force-link").data(t).enter().append("line").attr("class","gt-force-link").style("stroke-width",function(t){return a(t.count)}).on("mouseover",d).on("mouseout",f)}function u(t){var e=k.selectAll(".gt-force-node").data(t).enter().append("g").attr("class","gt-force-node").call(h.drag);return e.append("circle").attr("r",function(t){return Math.sqrt(t.count)}).style("fill",function(t){return y(t.group)}).on("mouseover",p).on("mouseout",f),e.append("text").attr("dy",".3em").text(function(t){return t.state}).on("mouseover",p).on("mouseout",f),e}function i(t){var e='<pre class="gt-force-tooltip-box"><p><kbd>'+t.state+"</kbd> "+t.count+"</p></pre>";return e+='<pre class="gt-force-tooltip-box gt-force-tooltip-box-in">',e+="<p><b>流入</b></p>",t.launch&&(e+='<p><kbd style="background:aquamarine;">启动</kbd> '+t.launch+"</p>"),e+="<p>"+_.sortBy(v[t.state].ins,"count").reverse().map(function(t){return"<kbd>"+t.state_from+"</kbd> "+t.count+"</p>"}).join(""),e+="</p></pre>",e+='<pre class="gt-force-tooltip-box gt-force-tooltip-box-out">',e+="<p><b>流出</b></p>",m[t.state]&&(e+='<p><kbd style="background:coral;color:white;">退出</kbd> '+m[t.state]+"</p>"),e+="<p>"+_.sortBy(v[t.state].outs,"count").reverse().map(function(t){return"<kbd>"+t.state_to+"</kbd> "+t.count+"</p>"}).join(""),e+="</p></pre>"}function p(t){b.transition().style("display","block").duration(200).style("opacity",.9),b.html(i(t)).style("left",d3.event.pageX+"px").style("top",d3.event.pageY+20+"px")}function l(t){var e="<p><kbd>"+t.source.state+'</kbd> <span class="glyphicon glyphicon-arrow-right"></span> <kbd>'+t.target.state+"</kbd> "+t.count+"</p>",n=w[t.source.state+":"+t.target.state];if(n){var r="<p><kbd>"+n.state_from+'</kbd> <span class="glyphicon glyphicon-arrow-right"></span> <kbd>'+n.state_to+"</kbd> "+n.count+"</p>";n.count<t.count?e+=r:e=r+e}return'<pre class="gt-force-tooltip-box">'+e+"</pre>"}function d(t){b.transition().style("display","block").duration(200).style("opacity",.9),b.html(l(t)).style("left",d3.event.pageX+"px").style("top",d3.event.pageY+20+"px")}function f(t){b.transition().duration(200).style("opacity",0).transition().style("display","none")}function g(t){d3.json(t,function(t,e){if(t)throw t;var n=r(e[0]),a=o(e[1]);h.nodes(n).links(a).start();var i=s(n),p=c(a),l=u(n);h.on("tick",function(){p.attr("x1",function(t){return t.source.x}).attr("y1",function(t){return t.source.y}).attr("x2",function(t){return t.target.x}).attr("y2",function(t){return t.target.y}),l.attr("transform",function(t){return"translate("+t.x+","+t.y+")"}),i.attr("transform",function(t){return"translate("+t.x+","+t.y+")"})})})}var y=d3.scale.category20(),h=d3.layout.force().charge(-1e3).linkDistance(100).size([e,n]),k=d3.select(t).append("svg").attr("width",e).attr("height",n),b=d3.select(t).append("div").attr("class","gt-force-tooltip").style("opacity",0),x={},m={},v={},w={};return{render:g}},gt=GraphTrackForceLayout("body",1200,640);gt.render("/api/track/graph?appVersion=0.1"),function(t,e){t.module("graphTrackApp.constants",[]).constant("appConfig",{userRoles:["guest","user","admin"]})}(angular);