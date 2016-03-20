'use strict';

describe('Component: PlayersComponent', function () {

  // load the controller's module
  beforeEach(module('testApp'));

  var PlayersComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    PlayersComponent = $componentController('PlayersComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
