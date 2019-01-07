(function () {
  'use strict';

  angular.module('ShopApp')
  .controller('PapersController', PapersController);

  PapersController.$inject = ['items', '$http'];

  function PapersController(items, $http) {
    var papersCtrl = this;
    papersCtrl.items = items;
    console.log("pCtrl: "+papersCtrl.items);
  }
})();
