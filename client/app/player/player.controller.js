'use strict';
(function(){

class PlayerComponent {
  constructor($state) {
    this.message = 'Hello';
    this.id = $state.params.id;
  }

  $onInit() { 
  }
}

angular.module('testApp')
  .component('player', {
    templateUrl: 'app/player/player.html',
    controller: PlayerComponent
  });

})();
