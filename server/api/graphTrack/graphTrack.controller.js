/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /api/go                 ->  go
 * POST    /api/exit               ->  exit
 */

'use strict';

import _ from 'lodash';
import GraphTrack from './graphTrack.model';
const {GT_States, GT_Edges} = GraphTrack;

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

export function go(req, res) {
  let {appId, appVersion, states} = req.body;
  if (!appId)
    return res.status(400).json({ok: 0, msg: 'appId required'}).end();
  
  if (!appVersion)
    return res.status(400).json({ok: 0, msg: 'app version required'}).end();
  
  if (!states)
    return res.status(400).json({ok: 0, msg: 'state required'}).end();
  
  states = states.split(',');
  appVersion = parseAppVersion(appVersion);
  
  var promises = [];
  
  for (let i=0; i<states.length-1; i++) {
    if (states[i]) {
      promises.push(incEdge(appId, appVersion, states[i], states[i+1]));
      promises.push(incState(appId, appVersion, states[i+1]));
    } else {
      promises.push(incState(appId, appVersion, 'launch'));
      promises.push(launchState(appId, appVersion, states[i+1]));
    }
  }
  
  Promise.all(promises)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

export function graph(req, res) {  
  const {appId, appVersion} = req.query;
  if (!appId)
    return res.status(400).json({ok: 0, msg: 'appId required'}).end();
  
  if (!appVersion)
    return res.status(400).json({ok: 0, msg: 'app version required'}).end();
  
  const version = parseAppVersion(appVersion);
  
  Promise.all([
    GT_States.find({appId, version: version}, {
      _id: false,
      state: true,
      count: true,
      launch: true,
      exit: true,
    }).exec(),
    GT_Edges.find({appId, version: version}, {
      _id: false,
      state_from: true,
      state_to: true,
      count: true,
    }).exec(),
  ]).then(respondWithResult(res))
    .catch(handleError(res));
}


function launchState(appId, version, state, type) {
  const _id = [appId, version, state].join('_');
  
  return GT_States.update({_id}, {$inc: {count: 1, launch: 1}}).exec()
    .then(result => {
      if (result.nModified)
        return result;
    
      return GT_States.create({
        _id,
        appId,
        version,
        state,
        count: 1,
        launch: 1,
        exit: 0,
      });
    });
}
  
function incState(appId, version, state) {
  const _id = [appId, version, state].join('_');
  
  return GT_States.update({_id}, {$inc: {count: 1}}).exec()
    .then(result => {
      if (result.nModified)
        return result;
    
      return GT_States.create({
        _id,
        appId,
        version,
        state,
        count: 1,
        launch: 0,
        exit: 0,
      });
    });
}

function incEdge(appId, version, stateFrom, stateTo) {
  const _id = [appId, version, stateFrom, stateTo].join('_');
  
  return GT_Edges.update({_id}, {$inc: {count: 1}}).exec()
    .then(result => {
      if (result.nModified)
        return result;

      return GT_Edges.create({
        _id,
        appId,
        version,
        state_from: stateFrom,
        state_to: stateTo,
        count: 1,
      });
    });
}

//function endTrack(stateCache) {
//  console.log(stateCache.state + ' -> exit');
//  
//  return Promise.all([
//    exitState(stateCache.version, stateCache.state),
//    incState(stateCache.version, 'exit'),
//  ]).then(() => {
//    stateCache = {};
//    return;
//  });
//}
//
//function exitState(version, state) {
//  const _id = [version, state].join('_');
//  return GT_States.update({_id}, {$inc: {exit: 1}}).exec();
//}

function parseAppVersion(v) {
  const version = v.split('.'),
    major = parseInt(version[0],10) || '0',
    minor = parseInt(version[1],10) || '0',
    fix = parseInt(version[2],10) || '0';
  return [major, minor, fix].join('.');
}