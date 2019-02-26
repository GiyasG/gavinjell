(function () {
  'use strict';
  angular.module('GJApp')
  .controller('TeamController', TeamController);
  TeamController.$inject = ['items', '$stateParams', '$scope', 'FData'];
  function TeamController(items, $stateParams, $scope, FData) {
    var teamCtrl = this;
    teamCtrl.items = items;
    $scope.fD = FData;
    window.scrollTo(0, 0);
    };
})();
