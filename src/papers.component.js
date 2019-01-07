(function () {
  'use strict';

  angular.module('ShopApp')
  .component('items', {
    templateUrl: 'src/template/papers.template.html',
    bindings: {
      items: '<'
        }
  });

})();
