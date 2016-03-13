/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /api/launch             ->  launch
 * POST    /api/transition         ->  transition
 * POST    /api/exit               ->  exit
 */

'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.launch = launch;
exports.go = go;
exports.exit = exit;
exports.graph = graph;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _graphTrackModel = require('./graphTrack.model');

var _graphTrackModel2 = _interopRequireDefault(_graphTrackModel);

var GT_States = _graphTrackModel2['default'].GT_States;
var GT_Edges = _graphTrackModel2['default'].GT_Edges;
var GT_Sessions = _graphTrackModel2['default'].GT_Sessions;

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

function launch(req, res) {
  var _req$query = req.query;
  var appVersion = _req$query.appVersion;
  var launchFrom = _req$query.launchFrom;

  if (!appVersion) return res.status(404).json({ ok: 0, msg: 'app version required' }).end();

  var version = parseAppVersion(appVersion);

  endTrack().then(function () {
    return GT_Sessions.create({
      version: version,
      state: ''
    });
  }).then(function (result) {
    if (launchFrom) {
      return _Promise.all([incState(version, 'launch'), launchState(version, launchFrom, 'launch'), setCurrentState(result._id, launchFrom)]);
    } else {
      return incState(version, 'launch');
    }
  }).then(respondWithResult(res))['catch'](handleError(res));
}

function go(req, res) {
  var _req$query2 = req.query;
  var state = _req$query2.state;
  var path = _req$query2.path;

  if (!state) return res.status(404).json({ ok: 0, msg: 'state required' }).end();

  GT_Sessions.findOne({}).then(function (result) {
    if (!result) {
      return { ok: 0, msg: 'no session' };
    }

    if (result.state === state) {
      return { ok: 0, msg: 'repeated state' };
    }

    if (result.state) {
      return _Promise.all([incEdge(result.version, result.state, state), incState(result.version, state), setCurrentState(result._id, state)]);
    } else {
      return _Promise.all([launchState(result.version, state), setCurrentState(result._id, state)]);
    }
  }).then(respondWithResult(res))['catch'](handleError(res));
}

function exit(req, res) {
  endTrack().then(respondWithResult(res))['catch'](handleError(res));
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

function endTrack() {
  return GT_Sessions.findOne({}).then(function (result) {
    return result ? _Promise.all([exitState(result.version, result.state), incState(result.version, 'exit'), GT_Sessions.remove({ _id: result._id })]) : null;
  });
}

function exitState(version, state) {
  var _id = [version, state].join('_');
  return GT_States.update({ _id: _id }, { $inc: { exit: 1 } }).exec();
}

function setCurrentState(_id, state) {
  return GT_Sessions.update({ _id: _id }, { $set: { state: state } });
}

function parseAppVersion(v) {
  var version = v.split('.'),
      major = parseInt(version[0], 10) || '0',
      minor = parseInt(version[1], 10) || '0',
      fix = parseInt(version[2], 10) || '0';
  return [major, minor, fix].join('.');
}
//# sourceMappingURL=graphTrack.controller.js.map
