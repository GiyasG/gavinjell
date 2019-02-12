(function () {
  'use strict';

  angular.module('GJapp')
  .component('items', {
    templateUrl: 'src/template/projects.template.html',
    bindings: {
      items: '<'
        }
  });

})();
