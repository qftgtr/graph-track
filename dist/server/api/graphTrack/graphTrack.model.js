'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

_mongoose2['default'].Promise = global.Promise;

var GraphTrackModel = {
  GT_States: _mongoose2['default'].model('GT_States', new _mongoose2['default'].Schema({
    _id: String,
    version: String,
    state: String,
    count: Number,
    launch: Number,
    exit: Number,
    type: String
  })),
  GT_Edges: _mongoose2['default'].model('GT_Edges', new _mongoose2['default'].Schema({
    _id: String,
    version: String,
    state_from: String,
    state_to: String,
    count: Number
  }))
};

exports['default'] = GraphTrackModel;
module.exports = exports['default'];
//# sourceMappingURL=graphTrack.model.js.map
