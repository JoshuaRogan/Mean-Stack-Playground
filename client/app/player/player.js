'use strict';

angular.module('testApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('player', {
        url: '/players',
        template: '<player></player>'
      });
  });
