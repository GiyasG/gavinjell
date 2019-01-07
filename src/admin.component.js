(function () {
  'use strict';

  angular.module('ShopApp')
  .component('items', {
    templateUrl: 'src/template/admin.template.html',
    bindings: {
      items: '<'
        }
  });

})();
