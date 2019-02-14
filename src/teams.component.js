(function () {
  'use strict';

  angular.module('ShopApp')
  .component('items', {
    templateUrl: 'src/template/teams.template.html',
    bindings: {
      items: '<'
        }
  });

})();
