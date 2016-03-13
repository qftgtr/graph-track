'use strict';

var express = require('express');
var controller = require('./graphTrack.controller');

var router = express.Router();

//router.get('/', controller.create);
//router.get('/:id', controller.show);
//router.post('/', controller.create);
//router.put('/:id', controller.update);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);

router.get('/launch', controller.launch);
router.get('/go', controller.go);
router.get('/exit', controller.exit);
router.get('/graph', controller.graph);

module.exports = router;
//# sourceMappingURL=index.js.map
