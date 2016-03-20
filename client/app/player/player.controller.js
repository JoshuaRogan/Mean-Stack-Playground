'use strict';
(function(){

class PlayerComponent {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.http = $http;
    this.socket = socket;
    this.players = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('player');
    });
  }

  $onInit() {
    this.$http.get('/api/players/', {params: {list: true, page: 5}})
    .then(response => {
      this.players = response.data;
      this.socket.syncUpdates('player', this.players);
    });
  }

}

angular.module('testApp')
  .component('player', {
    templateUrl: 'app/player/player.html',
    controller: PlayerComponent
  });

})();
