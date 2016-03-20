'use strict';

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

var GraphTrackModel = {
  GT_Apps: mongoose.model('GT_Apps', new mongoose.Schema({
    _id: String,
    userId: String,
    name: String,
    versions: Array,
  })),
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
}

export default GraphTrackModel;
