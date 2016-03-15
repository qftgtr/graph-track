'use strict';

var express = require('express');
var cors = require('cors');
var controller = require('./graphTrack.controller');

var router = express.Router();

//var corsConfig = cors({
//  origin: '*',
//  methods: 'POST',
//  credentials: true,
//  allowedHeaders: 'Content-Type, Accept, X-Requested-With',
//});

router.post('/go', cors({ origin: '*' }), controller.go);
//router.post('/exit', corsConfig, controller.exit);
router.get('/graph', controller.graph);

module.exports = router;
//# sourceMappingURL=index.js.map
