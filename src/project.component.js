(function () {
  'use strict';

  angular.module('ShopApp')
  .component('items', {
    templateUrl: 'src/template/project.template.html',
    bindings: {
      items: '<'
        }
  });

})();
