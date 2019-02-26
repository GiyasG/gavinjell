(function () {
  'use strict';

  angular.module('ShopApp')
  .component('cart', {
    templateUrl: 'src/template/cart.template.html',
    bindings: {
      items: '<'
        }
  });

})();
