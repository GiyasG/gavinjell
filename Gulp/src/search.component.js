(function () {
  'use strict';
  angular.module('GJApp')
  .component('items', {
    templateUrl: 'src/template/search.template.html',
    bindings: {
      items: '<'
        }
  });
})();
