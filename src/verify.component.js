(function () {
  'use strict';

  angular.module('ShopApp')
  .component('verify', {
    templateUrl: 'src/template/verify.template.html',
    bindings: {
      info: '<'
        }
  });

})();
