'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var statisticCtrlStub = {
  index: 'statisticCtrl.index',
  show: 'statisticCtrl.show',
  create: 'statisticCtrl.create',
  update: 'statisticCtrl.update',
  destroy: 'statisticCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var statisticIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './statistic.controller': statisticCtrlStub
});

describe('Statistic API Router:', function() {

  it('should return an express router instance', function() {
    statisticIndex.should.equal(routerStub);
  });

  describe('GET /api/statistics', function() {

    it('should route to statistic.controller.index', function() {
      routerStub.get
        .withArgs('/', 'statisticCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/statistics/:id', function() {

    it('should route to statistic.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'statisticCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/statistics', function() {

    it('should route to statistic.controller.create', function() {
      routerStub.post
        .withArgs('/', 'statisticCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/statistics/:id', function() {

    it('should route to statistic.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'statisticCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/statistics/:id', function() {

    it('should route to statistic.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'statisticCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/statistics/:id', function() {

    it('should route to statistic.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'statisticCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
