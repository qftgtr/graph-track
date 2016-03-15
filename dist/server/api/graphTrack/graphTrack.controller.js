/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /api/go                 ->  go
 * POST    /api/exit               ->  exit
 */

'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.go = go;
exports.graph = graph;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _graphTrackModel = require('./graphTrack.model');

var _graphTrackModel2 = _interopRequireDefault(_graphTrackModel);

var GT_States = _graphTrackModel2['default'].GT_States;
var GT_Edges = _graphTrackModel2['default'].GT_Edges;

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

function go(req, res) {
  var _req$query = req.query;
  var states = _req$query.states;
  var appVersion = _req$query.appVersion;

  if (!appVersion) return res.status(404).json({ ok: 0, msg: 'app version required' }).end();

  if (!states) return res.status(404).json({ ok: 0, msg: 'state required' }).end();

  states = states.split(',');
  appVersion = parseAppVersion(appVersion);

  var promises = [];

  for (var i = 0; i < states.length - 1; i++) {
    if (states[i]) {
      promises.push(incEdge(appVersion, states[i], states[i + 1]));
      promises.push(incState(appVersion, states[i + 1]));
    } else {
      promises.push(incState(appVersion, 'launch'));
      promises.push(launchState(appVersion, states[i + 1]));
    }
  }

  _Promise.all(promises).then(respondWithResult(res))['catch'](handleError(res));
}

function graph(req, res) {
  var appVersion = req.query.appVersion;

  if (!appVersion) return res.status(404).json({ ok: 0, msg: 'app version required' }).end();

  var version = parseAppVersion(appVersion);

  _Promise.all([GT_States.find({ version: version }, {
    _id: false,
    state: true,
    count: true,
    launch: true,
    exit: true
  }).exec(), GT_Edges.find({ version: version }, {
    _id: false,
    state_from: true,
    state_to: true,
    count: true
  }).exec()]).then(respondWithResult(res))['catch'](handleError(res));
}

function launchState(version, state, type) {
  var _id = [version, state].join('_');

  return GT_States.update({ _id: _id }, { $inc: { count: 1, launch: 1 } }).exec().then(function (result) {
    if (result.nModified) return result;

    return GT_States.create({
      _id: _id,
      version: version,
      state: state,
      count: 1,
      launch: 1,
      exit: 0
    });
  });
}

function incState(version, state) {
  var _id = [version, state].join('_');

  return GT_States.update({ _id: _id }, { $inc: { count: 1 } }).exec().then(function (result) {
    if (result.nModified) return result;

    return GT_States.create({
      _id: _id,
      version: version,
      state: state,
      count: 1,
      launch: 0,
      exit: 0
    });
  });
}

function incEdge(version, stateFrom, stateTo) {
  var _id = [version, stateFrom, stateTo].join('_');

  return GT_Edges.update({ _id: _id }, { $inc: { count: 1 } }).exec().then(function (result) {
    if (result.nModified) return result;

    return GT_Edges.create({
      _id: _id,
      version: version,
      state_from: stateFrom,
      state_to: stateTo,
      count: 1
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
  var version = v.split('.'),
      major = parseInt(version[0], 10) || '0',
      minor = parseInt(version[1], 10) || '0',
      fix = parseInt(version[2], 10) || '0';
  return [major, minor, fix].join('.');
}
//# sourceMappingURL=graphTrack.controller.js.map
