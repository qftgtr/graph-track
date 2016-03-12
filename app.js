var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;


var MONGO_URL = process.env.MONGO_URL;
var url = 'mongodb://'+MONGO_URL+'/graph-track';

var stateColl = null,
    edgeColl = null;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Connected correctly to server");
  stateColl = db.collection('gt_states');
  edgeColl = db.collection('gt_edges');
  
  startServer();
//  db.close();
});

var app = express();

function parseAppVersion(v) {
  var version = v.split('.'),
      major = version[0] || '0',
      minor = version[1] || '0',
      fix = version[2] || '0';
  return [major, minor, fix].join('.');
}

function incState(version, state) {
  var id = [version, state].join('_');
  
  stateColl.update({_id: id}, {$inc: {count: 1}}, function(err, result) {
    if (err) {
      return {success: false, message: 'database error'};
    }

    if (result.result.nModified) {
      return {success: true, message: result.result};
    }

    stateColl.insert({
      _id: id,
      version: version,
      state: state,
      count: 1,
    }, function(err, result) {
      if (err) {
        return {success: false, message: 'database error'};
      }
      
      return {success: true, message: result.result};
    });
  });
}

function incEdge(version, stateFrom, stateTo, path) {
  var id = [version, stateFrom, stateTo, path].join('_');
  
  edgeColl.update({_id: id}, {$inc: {count: 1}}, function(err, result) {
    if (err) {
      return {success: false, message: 'database error'};
    }

    if (result.result.nModified) {
      return {success: true, message: result.result};
    }

    edgeColl.insert({
      _id: id,
      stateFrom: stateFrom,
      stateTo: stateTo,
      path: path,
      version: version,
      count: 1,
    }, function(err, result) {
      if (err) {
        return {success: false, message: 'database error'};
      }
      
      return {success: true, message: result.result};
    });
  });
}

function startServer() {
//  app.post('/api/gtrack/launch', bodyParser.json(), function(req, res) {
//    var data = req.body;
  app.get('/api/gtrack/launch', function(req, res) {
    var data = req.query;
    if (!data.appVersion)
      return res.json({success: false, message: 'no app version'});
    
    var version = parseAppVersion(data.appVersion),
        state = data.state || 'emptystate',
        path = data.launchFrom || 'default';
    
    incState(version, 'launch');
    incState(version, state);
    incEdge(version, 'launch', state, path);
    res.json({ success: true });
  });
  
  app.get('/api/gtrack/transition', function(req, res) {
    var data = req.query;
//  app.post('/api/gtrack/edge', bodyParser.json(), function(req, res) {
//    var data = req.body;
    if (!data.appVersion)
      return res.json({success: false, message: 'no app version'});
    
    var version = parseAppVersion(data.appVersion),
        stateFrom = data.stateFrom || 'emptystate',
        stateTo = data.stateTo || 'emptystate',
        path = data.path || 'default';
    
    incState(version, stateTo);
    incEdge(version, stateFrom, stateTo, path);
    res.json({ success: true });
  });
  
  app.get('/api/gtrack/exit', function(req, res) {
    var data = req.query;
//  app.post('/api/gtrack/exit', bodyParser.json(), function(req, res) {
//    var data = req.body;
    if (!data.appVersion)
      return res.json({success: false, message: 'no app version'});
    
    var version = parseAppVersion(data.appVersion),
        state = data.state || 'emptystate';
    
    incState(version, 'exit');
    incEdge(version, state, 'exit', 'default');
    res.json({ success: true });
  });

  app.listen(8080, '0.0.0.0', function () {
    console.log('Example app listening on port 8080!');
  });
}