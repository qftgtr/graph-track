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
router.get('/transition', controller.transition);
router.post('/exit', controller.exit);

module.exports = router;
//# sourceMappingURL=index.js.map
