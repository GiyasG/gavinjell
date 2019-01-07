(function () {
  'use strict';
  angular.module('ShopApp')
  .controller('CheckoutController', CheckoutController);
  CheckoutController.$inject = ['cart'];
  function CheckoutController(cart) {
    var bCtrl = this;
    bCtrl.cart = cart;
    console.log("bCtrl: "+bCtrl.cart[0].description);
  }
})();
