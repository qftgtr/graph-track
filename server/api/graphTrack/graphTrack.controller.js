/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /api/launch             ->  launch
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

export function launch(req, res) {
  const {appVersion, launchFrom} = req.query;
  if (!appVersion)
    return res.status(404).json({ok: 0, msg: 'app version required'}).end();
  
  const version = parseAppVersion(appVersion);
  
  let stateCache = req.session.stateCache;
  if (!stateCache) {
    stateCache = req.session.stateCache = {};
  }
  
  console.log(req.session.id);
  
  var promise = stateCache.state ? endTrack(stateCache) : Promise.resolve();
  
  console.log('launch -> ' + launchFrom);
  
  promise
    .then(() => {
      stateCache.version = version;
      stateCache.state = 'launch';
      return;
    })
    .then(() => {
      if (!launchFrom)
        return incState(version, 'launch');
    
      stateCache.state = launchFrom;
      return Promise.all([
        incState(version, 'launch'),
        launchState(version, launchFrom, 'launch'),
      ]);
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function go(req, res) {
  const stateCache = req.session.stateCache;
  if (!stateCache.state)
    return res.status(404).json({ok: 0, msg: 'no cache state'}).end();
  
  const {state, path} = req.query;
  if (!state)
    return res.status(404).json({ok: 0, msg: 'state required'}).end();
  
  if (stateCache.state === state)
    return res.status(404).json({ok: 0, msg: 'repeated state'}).end();
  
  
//  console.log('version:' + stateCache.version);
  console.log(stateCache.state + ' -> ' + state);
  
//  stateCache.state = state;
  
  let promise;
  if (stateCache.state === 'launch') {
    promise = launchState(stateCache.version, state);
  } else {
    promise = Promise.all([
      incEdge(stateCache.version, stateCache.state, state),
      incState(stateCache.version, state),
    ]);
  }
  
  stateCache.state = state;
  
  promise
    .then(respondWithResult(res))
    .catch(handleError(res));
}
  
export function exit(req, res) {
  const stateCache = req.session.stateCache;
  if (!stateCache.state)
    return res.status(404).json({ok: 0, msg: 'no cache state'}).end();
  
  endTrack(stateCache)
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function graph(req, res) {
  const {appVersion} = req.query;
  
  if (!appVersion)
    return res.status(404).json({ok: 0, msg: 'app version required'}).end();
  
  const version = parseAppVersion(appVersion);
  
  Promise.all([
    GT_States.find({version: version}, {
      _id: false,
      state: true,
      count: true,
      launch: true,
      exit: true,
    }).exec(),
    GT_Edges.find({version: version}, {
      _id: false,
      state_from: true,
      state_to: true,
      count: true,
    }).exec(),
  ]).then(respondWithResult(res))
    .catch(handleError(res));
}


function launchState(version, state, type) {
  const _id = [version, state].join('_');
  
  return GT_States.update({_id}, {$inc: {count: 1, launch: 1}}).exec()
    .then(result => {
      if (result.nModified)
        return result;
    
      return GT_States.create({
        _id,
        version,
        state,
        count: 1,
        launch: 1,
        exit: 0,
      });
    });
}
  
function incState(version, state) {
  const _id = [version, state].join('_');
  
  return GT_States.update({_id}, {$inc: {count: 1}}).exec()
    .then(result => {
      if (result.nModified)
        return result;
    
      return GT_States.create({
        _id,
        version,
        state,
        count: 1,
        launch: 0,
        exit: 0,
      });
    });
}

function incEdge(version, stateFrom, stateTo) {
  const _id = [version, stateFrom, stateTo].join('_');
  
  return GT_Edges.update({_id}, {$inc: {count: 1}}).exec()
    .then(result => {
      if (result.nModified)
        return result;

      return GT_Edges.create({
        _id,
        version,
        state_from: stateFrom,
        state_to: stateTo,
        count: 1,
      });
    });
}

function endTrack(stateCache) {
  console.log(stateCache.state + ' -> exit');
  
  return Promise.all([
    exitState(stateCache.version, stateCache.state),
    incState(stateCache.version, 'exit'),
  ]).then(() => {
    stateCache = {};
    return;
  });
}

function exitState(version, state) {
  const _id = [version, state].join('_');
  return GT_States.update({_id}, {$inc: {exit: 1}}).exec();
}

function parseAppVersion(v) {
  const version = v.split('.'),
    major = parseInt(version[0],10) || '0',
    minor = parseInt(version[1],10) || '0',
    fix = parseInt(version[2],10) || '0';
  return [major, minor, fix].join('.');
}