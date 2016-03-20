/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /api/go                 ->  go
 * POST    /api/exit               ->  exit
 */

'use strict';

import _ from 'lodash';
import GraphTrack from './graphTrack.model';
const {GT_Apps} = GraphTrack;

// Gets a list of Things
export function indexApps(req, res) {
  const session = req.session.user;
  
  return GT_Apps.find({userId: user._id}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Thing from the DB
//export function show(req, res) {
//  return GT_Apps.findById(req.params.id).exec()
//    .then(handleEntityNotFound(res))
//    .then(respondWithResult(res))
//    .catch(handleError(res));
//}

// Creates a new Thing in the DB
export function createApp(req, res) {
  const user = req.session.user;
  const data = req.body;
  
  return GT_Apps.create({
    userId: user._id,
    name: req.body.name,
    version: [],
  })
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}
