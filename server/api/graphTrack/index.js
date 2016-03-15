'use strict';

var express = require('express');
var cors = require('cors');
var controller = require('./graphTrack.controller');

var router = express.Router();

var corsConfig = cors({
  origin: 'http://192.168.2.203:8585',
  methods: 'POST',
  credentials: true,
  allowedHeaders: 'Content-Type, Accept, X-Requested-With',
});

router.post('/launch', corsConfig, controller.launch);
router.post('/go', corsConfig, controller.go);
router.post('/exit', corsConfig, controller.exit);
router.get('/graph', controller.graph);

module.exports = router;
