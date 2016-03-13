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
exports.transition = transition;
exports.exit = exit;

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

function launch(req, res) {
  var data = req.query;
  if (!data.appVersion) return res.status(404).json({ ok: 0, msg: 'app version required' }).end();

  var version = parseAppVersion(data.appVersion),
      state = data.state || 'emptystate',
      path = data.launchFrom || 'default';

  _Promise.all([incState(version, 'launch'), incState(version, state), incEdge(version, 'launch', state, path)]).then(respondWithResult(res), handleError(res));
}

function transition(req, res) {
  var data = req.query;
  if (!data.appVersion) return res.status(404).json({ ok: 0, msg: 'app version required' }).end();

  var version = parseAppVersion(data.appVersion),
      stateFrom = data.stateFrom || 'emptystate',
      stateTo = data.stateTo || 'emptystate',
      path = data.path || 'default';

  _Promise.all([incState(version, stateTo, res), incEdge(version, stateFrom, stateTo, path, res)]).then(respondWithResult(res), handleError(res));
}

function exit(req, res) {
  var data = req.query;
  if (!data.appVersion) return res.status(404).json({ ok: 0, msg: 'app version required' }).end();

  var version = parseAppVersion(data.appVersion),
      state = data.state || 'emptystate';

  _Promise.all([incState(version, 'exit'), incEdge(version, state, 'exit', 'default')]).then(respondWithResult(res), handleError(res));
}

function incState(version, state) {
  var id = [version, state].join('_');

  return GT_States.update({ _id: id }, { $inc: { count: 1 } }).exec().then(function (result) {
    if (result.nModified) return result;

    return GT_States.create({
      _id: id,
      version: version,
      state: state,
      count: 1
    });
  });
}

function incEdge(version, stateFrom, stateTo, path) {
  var id = [version, stateFrom, stateTo, path].join('_');

  return GT_Edges.update({ _id: id }, { $inc: { count: 1 } }).exec().then(function (result) {
    if (result.nModified) return result;

    return GT_Edges.create({
      _id: id,
      stateFrom: stateFrom,
      stateTo: stateTo,
      path: path,
      version: version,
      count: 1
    });
  });
}

function parseAppVersion(v) {
  var version = v.split('.'),
      major = parseInt(version[0], 10) || '0',
      minor = parseInt(version[1], 10) || '0',
      fix = parseInt(version[2], 10) || '0';
  return [major, minor, fix].join('.');
}
//# sourceMappingURL=graphTrack.controller.js.map
