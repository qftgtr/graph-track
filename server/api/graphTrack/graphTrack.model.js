'use strict';

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

var GraphTrackModel = {
  GT_States: mongoose.model('GT_States', new mongoose.Schema({
    _id: String,
    version: String,
    state: String,
    count: Number,
  })),
  GT_Edges: mongoose.model('GT_Edges', new mongoose.Schema({
    _id: String,
    stateFrom: String,
    stateTo: String,
    path: String,
    version: String,
    count: Number,
  })),
}

export default GraphTrackModel;
