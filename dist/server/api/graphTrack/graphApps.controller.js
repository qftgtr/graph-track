/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /api/go                 ->  go
 * POST    /api/exit               ->  exit
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.indexApps = indexApps;
exports.createApp = createApp;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _graphTrackModel = require('./graphTrack.model');

var _graphTrackModel2 = _interopRequireDefault(_graphTrackModel);

var GT_Apps = _graphTrackModel2['default'].GT_Apps;

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

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

// Gets a list of apps

function indexApps(req, res) {
  var user = req.session.user;

  return GT_Apps.find({ userId: user._id }).exec().then(respondWithResult(res))['catch'](handleError(res));
}

// Gets a single app from the DB
//export function show(req, res) {
//  return GT_Apps.findById(req.params.id).exec()
//    .then(handleEntityNotFound(res))
//    .then(respondWithResult(res))
//    .catch(handleError(res));
//}

// Creates an app in the DB

function createApp(req, res) {
  var user = req.session.user;

  return GT_Apps.create({
    userId: user._id,
    name: req.body.name
  }). //    version: [],
  then(respondWithResult(res, 201))['catch'](handleError(res));
}

// Deletes a Thing from the DB

function destroy(req, res) {
  var user = req.session.user;

  return GT_Apps.findById({
    _id: req.params.id,
    userId: user._id
  }).exec().then(handleEntityNotFound(res)).then(removeEntity(res))['catch'](handleError(res));
}
//# sourceMappingURL=graphApps.controller.js.map
