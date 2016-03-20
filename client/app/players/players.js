'use strict';

angular.module('testApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('players', {
        url: '/players',
        template: '<players></players>'
      });
  });
