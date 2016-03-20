'use strict';
(function(){

class PlayersComponent {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.players = [];

  }

  $onInit() {
    this.$http.get('/api/players/', {params: {list: true, page: 0, limit: 100}})
    .then(response => {
      this.players = response.data;
    });
  }

  openPlayer(player){
    console.log('Opening', player);
  }
}

angular.module('testApp')
  .component('players', {
    templateUrl: 'app/players/players.html',
    controller: PlayersComponent
  });

})();
