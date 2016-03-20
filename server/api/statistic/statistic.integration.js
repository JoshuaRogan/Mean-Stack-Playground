'use strict';

var app = require('../..');
import request from 'supertest';

var newStatistic;

describe('Statistic API:', function() {

  describe('GET /api/statistics', function() {
    var statistics;

    beforeEach(function(done) {
      request(app)
        .get('/api/statistics')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          statistics = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      statistics.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/statistics', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/statistics')
        .send({
          name: 'New Statistic',
          info: 'This is the brand new statistic!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newStatistic = res.body;
          done();
        });
    });

    it('should respond with the newly created statistic', function() {
      newStatistic.name.should.equal('New Statistic');
      newStatistic.info.should.equal('This is the brand new statistic!!!');
    });

  });

  describe('GET /api/statistics/:id', function() {
    var statistic;

    beforeEach(function(done) {
      request(app)
        .get('/api/statistics/' + newStatistic._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          statistic = res.body;
          done();
        });
    });

    afterEach(function() {
      statistic = {};
    });

    it('should respond with the requested statistic', function() {
      statistic.name.should.equal('New Statistic');
      statistic.info.should.equal('This is the brand new statistic!!!');
    });

  });

  describe('PUT /api/statistics/:id', function() {
    var updatedStatistic;

    beforeEach(function(done) {
      request(app)
        .put('/api/statistics/' + newStatistic._id)
        .send({
          name: 'Updated Statistic',
          info: 'This is the updated statistic!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedStatistic = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStatistic = {};
    });

    it('should respond with the updated statistic', function() {
      updatedStatistic.name.should.equal('Updated Statistic');
      updatedStatistic.info.should.equal('This is the updated statistic!!!');
    });

  });

  describe('DELETE /api/statistics/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/statistics/' + newStatistic._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when statistic does not exist', function(done) {
      request(app)
        .delete('/api/statistics/' + newStatistic._id)
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
