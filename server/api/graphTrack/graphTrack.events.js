/**
 * GraphTrack model events
 */

'use strict';

import {EventEmitter} from 'events';
var {GT_States, GT_Edges} = require('./graphTrack.model');
var GraphTrackEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GraphTrackEvents.setMaxListeners(0);
/*
// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  GraphTrack.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    GraphTrackEvents.emit(event + ':' + doc._id, doc);
    GraphTrackEvents.emit(event, doc);
  }
}
*/
export default GraphTrackEvents;
