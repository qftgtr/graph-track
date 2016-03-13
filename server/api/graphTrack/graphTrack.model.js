'use strict';

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

var GraphTrackModel = {
  GT_States: mongoose.model('GT_States', new mongoose.Schema({
    _id: String,
    version: String,
    state: String,
    count: Number,
    launch: Number,
    exit: Number,
    type: String,
  })),
  GT_Edges: mongoose.model('GT_Edges', new mongoose.Schema({
    _id: String,
    version: String,
    state_from: String,
    state_to: String,
    count: Number,
  })),
  GT_Sessions: mongoose.model('GT_Sessions', new mongoose.Schema({
    version: String,
    state: String,
  })),
}

export default GraphTrackModel;
