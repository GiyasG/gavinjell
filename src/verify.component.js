(function () {
  'use strict';

  angular.module('GJapp')
  .component('verify', {
    templateUrl: 'src/template/verify.template.html',
    bindings: {
      info: '<'
        }
  });

})();
