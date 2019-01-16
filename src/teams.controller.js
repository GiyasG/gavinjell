(function () {
  'use strict';

  angular.module('ShopApp')
  .controller('TeamsController', TeamsController);

  TeamsController.$inject = ['items', '$http'];

  function TeamsController(items, $http) {
    var teamsCtrl = this;
    teamsCtrl.items = items;
    console.log("tCtrl: "+teamsCtrl.items);
  }
})();
