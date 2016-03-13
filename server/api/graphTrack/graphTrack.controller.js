/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /api/launch             ->  launch
 * POST    /api/transition         ->  transition
 * POST    /api/exit               ->  exit
 */

'use strict';

import _ from 'lodash';
import GraphTrack from './graphTrack.model';
var {GT_States, GT_Edges} = GraphTrack;

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}


export function launch(req, res) {
  const data = req.query;
  if (!data.appVersion)
    return res.status(404).json({ok: 0, msg: 'app version required'}).end();

  const version = parseAppVersion(data.appVersion),
        state = data.state || 'emptystate',
        path = data.launchFrom || 'default';
  
  Promise.all([
    incState(version, 'launch'),
    incState(version, state),
    incEdge(version, 'launch', state, path),
  ]).then(respondWithResult(res), handleError(res));
}

export function transition(req, res) {
  const data = req.query;
  if (!data.appVersion)
    return res.status(404).json({ok: 0, msg: 'app version required'}).end();

  const version = parseAppVersion(data.appVersion),
        stateFrom = data.stateFrom || 'emptystate',
        stateTo = data.stateTo || 'emptystate',
        path = data.path || 'default';
  
  Promise.all([
    incState(version, stateTo, res),
    incEdge(version, stateFrom, stateTo, path, res),
  ]).then(respondWithResult(res), handleError(res));
}
  
export function exit(req, res) {
  const data = req.query;
  if (!data.appVersion)
    return res.status(404).json({ok: 0, msg: 'app version required'}).end();

  const version = parseAppVersion(data.appVersion),
        state = data.state || 'emptystate';
  
  Promise.all([
    incState(version, 'exit'),
    incEdge(version, state, 'exit', 'default'),
  ]).then(respondWithResult(res), handleError(res));
}

export function graph(req, res) {
  const data = req.query;
  if (!data.appVersion)
    return res.status(404).json({ok: 0, msg: 'app version required'}).end();

  const version = parseAppVersion(data.appVersion);
  var stateMap = {};
  
  Promise.all([
    GT_States.find({version: version}, {
      _id: false,
      state: true,
      count: true,
    }).exec(),
    
    GT_Edges.find({version: version}, {
      _id: false,
      stateFrom: true,
      stateTo: true,
      path: true,
      count: true,
    }).exec(),
  ]).then(respondWithResult(res));
  
//  results => res.json({
//    nodes: results[0],
//    links: results[1].map(s => {
//      return {
//        source: stateMap[s.stateFrom],
//        target: stateMap[s.stateTo],
//        value: s.count,
//        path: s.path,
//      }
//    }),
//  }));
}


function incState(version, state) {
  const id = [version, state].join('_');
  
  return GT_States.update({_id: id}, {$inc: {count: 1}}).exec()
    .then(function(result) {
      if (result.nModified)
        return result;
    
      return GT_States.create({
        _id: id,
        version: version,
        state: state,
        count: 1,
      });
    });
}

function incEdge(version, stateFrom, stateTo, path) {
  const id = [version, stateFrom, stateTo, path].join('_');
  
  return GT_Edges.update({_id: id}, {$inc: {count: 1}}).exec()
    .then(function(result) {
      if (result.nModified)
        return result;

      return GT_Edges.create({
        _id: id,
        stateFrom: stateFrom,
        stateTo: stateTo,
        path: path,
        version: version,
        count: 1,
      });
    });
}

function parseAppVersion(v) {
  const version = v.split('.'),
    major = parseInt(version[0],10) || '0',
    minor = parseInt(version[1],10) || '0',
    fix = parseInt(version[2],10) || '0';
  return [major, minor, fix].join('.');
}