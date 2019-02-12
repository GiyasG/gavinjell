(function () {
  'use strict';

  angular.module('GJapp')
  .component('cart', {
    templateUrl: 'src/template/cart.template.html',
    bindings: {
      items: '<'
        }
  });

})();
