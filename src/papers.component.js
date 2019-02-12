(function () {
  'use strict';

  angular.module('GJapp')
  .component('items', {
    templateUrl: 'src/template/papers.template.html',
    bindings: {
      items: '<'
        }
  });

})();
