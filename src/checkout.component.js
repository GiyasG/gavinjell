(function () {
  'use strict';

  angular.module('ShopApp')
  .component('checkout', {
    templateUrl: 'src/template/checkout.template.html',
    bindings: {
      cart: '<'
        }
  });

})();
