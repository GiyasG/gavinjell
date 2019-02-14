(function () {
  'use strict';

  angular.module('ShopApp')
  .controller('ProjectController', ProjectController);

  ProjectController.$inject = ['items', '$stateParams', '$http', '$sce', '$scope'];

  function ProjectController(items, $stateParams, $http, $sce, $scope) {
    var projectCtrl = this;
    projectCtrl.items = items;
    console.log(items);
    console.log($stateParams);
    // $scope.hasRoleAdmin = projectCtrl.items[5].AdminIsIn;
    window.scrollTo(0, 0);
    };

})();
