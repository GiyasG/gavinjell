(function () {
  'use strict';

  angular.module('GJapp')
  .component('changepassword', {
    templateUrl: 'src/template/passwordchange.template.html',
    bindings: {
      info: '<'
        }
  });

})();
