(function () {
  'use strict';

  angular.module('ShopApp')
  .component('items', {
    templateUrl: 'src/template/projects.template.html',
    bindings: {
      items: '<'
        }
  });

})();
