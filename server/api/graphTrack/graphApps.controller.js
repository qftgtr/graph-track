/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /api/go                 ->  go
 * POST    /api/exit               ->  exit
 */

'use strict';

import _ from 'lodash';
import GraphTrack from './graphTrack.model';
const {GT_Apps} = GraphTrack;

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

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}


// Gets a list of apps
export function indexApps(req, res) {
  const user = req.session.user;
  
  return GT_Apps.find({userId: user._id}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single app from the DB
//export function show(req, res) {
//  return GT_Apps.findById(req.params.id).exec()
//    .then(handleEntityNotFound(res))
//    .then(respondWithResult(res))
//    .catch(handleError(res));
//}

// Creates an app in the DB
export function createApp(req, res) {
  const user = req.session.user;
  
  return GT_Apps.create({
    userId: user._id,
    name: req.body.name,
//    version: [],
  })
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Deletes a Thing from the DB
export function destroy(req, res) {
  const user = req.session.user;
  
  return GT_Apps.findById({
    _id: req.params.id,
    userId: user._id,
  }).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
