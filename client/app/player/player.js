'use strict';

angular.module('testApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('player', {
        url: '/player/:id',
        template: '<player></player>'
      });
  });
