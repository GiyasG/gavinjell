(function () {
  'use strict';

  angular.module('ShopApp')
  .component('changepassword', {
    templateUrl: 'src/template/passwordchange.template.html',
    bindings: {
      info: '<'
        }
  });

})();
