'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.players = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('player');
    });
  }

  $onInit() {
    this.$http.get('/api/players').then(response => {
      this.players = response.data;
      this.socket.syncUpdates('player', this.players);
    });
  }

  addPlayer() {
    if (this.newPlayer) {
      this.$http.post('/api/players', { name: this.newPlayer });
      this.this.newPlayer = '';
    }
  }

  deletePlayer(player) {
    // this.$http.delete('/api/players/' + player._id);
  }
}

angular.module('testApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
