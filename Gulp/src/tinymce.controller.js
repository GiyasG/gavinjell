(function () {
  'use strict';
  angular.module('GJApp')
  .controller('TinyMceController', TinyMceController);
  TinyMceController.$inject = ['$scope', '$sce'];
  function TinyMceController($scope, $sce) {
    var ctrl = this;
    $scope.tinymceModel = 'Initial content';
    $scope.tinymceOptions = {
      theme: 'modern',
      toolbar_items_size: 'small',
      plugins: ['link', 'image', 'code'],
      menubar: 'insert tools',
      toolbar: 'undo redo | link | bold italic | alignleft aligncenter alignright | code'
  };
  this.updateHtml = function () {
    ctrl.tinymceHtml = $sce.trustAsHtml(ctrl.tinymce);
  }
};
})();
