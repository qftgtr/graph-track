'use strict';

var app = require('../..');
import request from 'supertest';

var newGraphTrack;

describe('GraphTrack API:', function() {

  describe('GET /api/track', function() {
    var graphTracks;

    beforeEach(function(done) {
      request(app)
        .get('/api/track')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          graphTracks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      graphTracks.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/track', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/track')
        .send({
          name: 'New GraphTrack',
          info: 'This is the brand new graphTrack!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newGraphTrack = res.body;
          done();
        });
    });

    it('should respond with the newly created graphTrack', function() {
      newGraphTrack.name.should.equal('New GraphTrack');
      newGraphTrack.info.should.equal('This is the brand new graphTrack!!!');
    });

  });

  describe('GET /api/track/:id', function() {
    var graphTrack;

    beforeEach(function(done) {
      request(app)
        .get('/api/track/' + newGraphTrack._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          graphTrack = res.body;
          done();
        });
    });

    afterEach(function() {
      graphTrack = {};
    });

    it('should respond with the requested graphTrack', function() {
      graphTrack.name.should.equal('New GraphTrack');
      graphTrack.info.should.equal('This is the brand new graphTrack!!!');
    });

  });

  describe('PUT /api/track/:id', function() {
    var updatedGraphTrack;

    beforeEach(function(done) {
      request(app)
        .put('/api/track/' + newGraphTrack._id)
        .send({
          name: 'Updated GraphTrack',
          info: 'This is the updated graphTrack!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedGraphTrack = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGraphTrack = {};
    });

    it('should respond with the updated graphTrack', function() {
      updatedGraphTrack.name.should.equal('Updated GraphTrack');
      updatedGraphTrack.info.should.equal('This is the updated graphTrack!!!');
    });

  });

  describe('DELETE /api/track/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/track/' + newGraphTrack._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when graphTrack does not exist', function(done) {
      request(app)
        .delete('/api/track/' + newGraphTrack._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
