(function () {
  'use strict';

  angular.module('GJapp')
  .component('items', {
    templateUrl: 'src/template/admin.template.html',
    bindings: {
      items: '<',
        }
  });

})();
