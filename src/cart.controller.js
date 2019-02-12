(function () {
  'use strict';

  angular.module('GJapp')
  .controller('CartController', CartController);

  CartController.$inject = ['items'];
  function CartController(items) {
    var cartCtrl = this;
    cartCtrl.items = items;
    console.log("cCtrl: " + items);
    console.log(cartCtrl.items);

  }

})();
