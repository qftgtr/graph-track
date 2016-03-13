'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var graphTrackCtrlStub = {
  index: 'graphTrackCtrl.index',
  show: 'graphTrackCtrl.show',
  create: 'graphTrackCtrl.create',
  update: 'graphTrackCtrl.update',
  destroy: 'graphTrackCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var graphTrackIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './graphTrack.controller': graphTrackCtrlStub
});

describe('GraphTrack API Router:', function() {

  it('should return an express router instance', function() {
    graphTrackIndex.should.equal(routerStub);
  });

  describe('GET /api/track', function() {

    it('should route to graphTrack.controller.index', function() {
      routerStub.get
        .withArgs('/', 'graphTrackCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/track/:id', function() {

    it('should route to graphTrack.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'graphTrackCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/track', function() {

    it('should route to graphTrack.controller.create', function() {
      routerStub.post
        .withArgs('/', 'graphTrackCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/track/:id', function() {

    it('should route to graphTrack.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'graphTrackCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/track/:id', function() {

    it('should route to graphTrack.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'graphTrackCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/track/:id', function() {

    it('should route to graphTrack.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'graphTrackCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
