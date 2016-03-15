/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _apiThingThingModel = require('../api/thing/thing.model');

var _apiThingThingModel2 = _interopRequireDefault(_apiThingThingModel);

var _apiUserUserModel = require('../api/user/user.model');

var _apiUserUserModel2 = _interopRequireDefault(_apiUserUserModel);

var _apiGraphTrackGraphTrackModel = require('../api/graphTrack/graphTrack.model');

var _apiGraphTrackGraphTrackModel2 = _interopRequireDefault(_apiGraphTrackGraphTrackModel);

var GT_States = _apiGraphTrackGraphTrackModel2['default'].GT_States;
var GT_Edges = _apiGraphTrackGraphTrackModel2['default'].GT_Edges;
var GT_Sessions = _apiGraphTrackGraphTrackModel2['default'].GT_Sessions;

//GT_States.remove({})
//  .then(() => {
//    GT_States.create(
//      {"state":"s0","count":1800,"launch":1800,"exit":200,"version":"1.0.0",_id:"1.0.0_s0"},
//      {"state":"s1","count":900,"launch":0,"exit":200,"version":"1.0.0",_id:"1.0.0_s1"},
//      {"state":"s2","count":601,"launch":1,"exit":200,"version":"1.0.0",_id:"1.0.0_s2"},
//      {"state":"s3","count":401,"launch":0,"exit":200,"version":"1.0.0",_id:"1.0.0_s3"},
//      {"state":"s4","count":201,"launch":0,"exit":200,"version":"1.0.0",_id:"1.0.0_s4"},
//      {"state":"s5","count":1,"launch":0,"exit":1,"version":"1.0.0",_id:"1.0.0_s5"},
//      {"state":"t1","count":1000,"launch":0,"exit":200,"version":"1.0.0",_id:"1.0.0_t1"},
//      {"state":"t2","count":601,"launch":1,"exit":200,"version":"1.0.0",_id:"1.0.0_t2"},
//      {"state":"t3","count":401,"launch":0,"exit":200,"version":"1.0.0",_id:"1.0.0_t3"},
//      {"state":"t4","count":201,"launch":0,"exit":200,"version":"1.0.0",_id:"1.0.0_t4"},
//      {"state":"t5","count":1,"launch":0,"exit":1,"version":"1.0.0",_id:"1.0.0_t5"}
//    );
//  });
// 
//GT_Edges.remove({})
//  .then(() => {
//    GT_Edges.create(
//      {"_id":"1.0.0_s0_s1","state_from":"s0","state_to":"s1","count":800,"version":"1.0.0"},
//      {"_id":"1.0.0_s1_s2","state_from":"s1","state_to":"s2","count":600,"version":"1.0.0"},
//      {"_id":"1.0.0_s2_s3","state_from":"s2","state_to":"s3","count":401,"version":"1.0.0"},
//      {"_id":"1.0.0_s3_s4","state_from":"s3","state_to":"s4","count":201,"version":"1.0.0"},
//      {"_id":"1.0.0_s4_s5","state_from":"s4","state_to":"s5","count":1,"version":"1.0.0"},
//      {"_id":"1.0.0_s0_t1","state_from":"s0","state_to":"t1","count":800,"version":"1.0.0"},
//      {"_id":"1.0.0_t1_t2","state_from":"t1","state_to":"t2","count":600,"version":"1.0.0"},
//      {"_id":"1.0.0_t2_t3","state_from":"t2","state_to":"t3","count":401,"version":"1.0.0"},
//      {"_id":"1.0.0_t3_t4","state_from":"t3","state_to":"t4","count":201,"version":"1.0.0"},
//      {"_id":"1.0.0_t4_t5","state_from":"t4","state_to":"t5","count":1,"version":"1.0.0"},
//      {"_id":"1.0.0_s1_t1","state_from":"s1","state_to":"t1","count":200,"version":"1.0.0"},
//      {"_id":"1.0.0_t1_s1","state_from":"t1","state_to":"s1","count":100,"version":"1.0.0"}
//    );
//  });

_apiThingThingModel2['default'].find({}).remove().then(function () {
  _apiThingThingModel2['default'].create({
    name: 'Development Tools',
    info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' + 'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' + 'Stylus, Sass, and Less.'
  }, {
    name: 'Server and Client integration',
    info: 'Built with a powerful and fun stack: MongoDB, Express, ' + 'AngularJS, and Node.'
  }, {
    name: 'Smart Build System',
    info: 'Build system ignores `spec` files, allowing you to keep ' + 'tests alongside code. Automatic injection of scripts and ' + 'styles into your index.html'
  }, {
    name: 'Modular Structure',
    info: 'Best practice client and server structures allow for more ' + 'code reusability and maximum scalability'
  }, {
    name: 'Optimized Build',
    info: 'Build process packs up your templates as a single JavaScript ' + 'payload, minifies your scripts/css/images, and rewrites asset ' + 'names for caching.'
  }, {
    name: 'Deployment Ready',
    info: 'Easily deploy your app to Heroku or Openshift with the heroku ' + 'and openshift subgenerators'
  });
});

_apiUserUserModel2['default'].find({}).remove().then(function () {
  _apiUserUserModel2['default'].create({
    provider: 'local',
    name: 'Test User',
    email: 'test@example.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin'
  }).then(function () {
    console.log('finished populating users');
  });
});
//# sourceMappingURL=seed.js.map
