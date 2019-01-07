(function () {
  'use strict';

  angular.module('ShopApp')
  .component('items', {
    templateUrl: 'src/template/items.template.html',
    bindings: {
      items: '<'
        }
  });

})();
