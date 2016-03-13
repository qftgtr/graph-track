/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /api/launch             ->  launch
 * POST    /api/transition         ->  transition
 * POST    /api/exit               ->  exit
 */

'use strict';

import _ from 'lodash';
import GraphTrack from './graphTrack.model';
const {GT_States, GT_Edges, GT_Sessions} = GraphTrack;

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
  
  endTrack()
    .then(() => {
      return GT_Sessions.create({
        version,
        state: '',
      });
    })
    .then(result => {
      if (launchFrom) {
        return Promise.all([
          incState(version, 'launch'),
          launchState(version, launchFrom, 'launch'),
          setCurrentState(result._id, launchFrom),
        ]);
      } else {
        return incState(version, 'launch');
      }
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function go(req, res) {
  const {state, path} = req.query;
  
  if (!state)
    return res.status(404).json({ok: 0, msg: 'state required'}).end();
  
  GT_Sessions.findOne({})
    .then(result => {
      if (!result) {
        return {ok: 0, msg: 'no session'};
      }
    
      if (result.state === state) {
        return {ok: 0, msg: 'repeated state'};
      }
    
      if (result.state) {
        return Promise.all([
          incEdge(result.version, result.state, state),
          incState(result.version, state),
          setCurrentState(result._id, state),
        ]);
      } else {
        return Promise.all([
          launchState(result.version, state),
          setCurrentState(result._id, state),
        ]);
      }
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}
  
export function exit(req, res) {
  endTrack()
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

function endTrack() {
  return GT_Sessions.findOne({})
    .then(result => {
      return result ? Promise.all([
        exitState(result.version, result.state),
        incState(result.version, 'exit'),
        GT_Sessions.remove({_id: result._id}),
      ]) : null;
    });
}

function exitState(version, state) {
  const _id = [version, state].join('_');
  return GT_States.update({_id}, {$inc: {exit: 1}}).exec();
}

function setCurrentState(_id, state) {
  return GT_Sessions.update({_id}, { $set: {state} });
}

function parseAppVersion(v) {
  const version = v.split('.'),
    major = parseInt(version[0],10) || '0',
    minor = parseInt(version[1],10) || '0',
    fix = parseInt(version[2],10) || '0';
  return [major, minor, fix].join('.');
}