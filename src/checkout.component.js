(function () {
  'use strict';

  angular.module('GJapp')
  .component('checkout', {
    templateUrl: 'src/template/checkout.template.html',
    bindings: {
      cart: '<'
        }
  });

})();
