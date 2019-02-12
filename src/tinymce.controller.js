(function () {
  'use strict';

  angular.module('GJapp')
  .controller('TinyMceController', TinyMceController);

  TinyMceController.$inject = ['$scope'];
  function TinyMceController($scope) {

    $scope.tinymceModel = 'Initial content';

    $scope.tinymceOptions = {
      plugins: 'link image code',
      menubar: 'insert',
      toolbar: 'undo redo | link | bold italic | alignleft aligncenter alignright | code'
  };
};
})();
