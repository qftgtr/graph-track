/**
 * GraphTrack model events
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _events = require('events');

var _require = require('./graphTrack.model');

var GT_States = _require.GT_States;
var GT_Edges = _require.GT_Edges;

var GraphTrackEvents = new _events.EventEmitter();

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
exports['default'] = GraphTrackEvents;
module.exports = exports['default'];
//# sourceMappingURL=graphTrack.events.js.map
