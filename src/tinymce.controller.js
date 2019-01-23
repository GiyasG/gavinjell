(function () {
  'use strict';

  angular.module('ShopApp')
  .controller('TinyMceController', TinyMceController);

  TinyMceController.$inject = ['$scope'];
  function TinyMceController($scope) {


    $scope.tinymceModel = 'Initial content';

    $scope.getContent = function() {
      console.log('Editor content:', $scope.tinymceModel);
    };

    $scope.setContent = function(db) {
      if (db=="proj") {
        $scope.tinymceModel = $scope.itemU.description;
      }
    };

    $scope.tinymceData = {
      description: ""
    }

    $scope.tinymceOptions = {
      plugins: 'link image code',
      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
  };
};
})();
