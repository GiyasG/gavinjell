(function () {
  'use strict';

  angular.module('GJapp')
  .component('items', {
    templateUrl: 'src/template/teams.template.html',
    bindings: {
      items: '<'
        }
  });

})();
