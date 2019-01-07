(function () {
  'use strict';

  angular.module('ShopApp')
  .controller('ProjectsController', ProjectsController);

  ProjectsController.$inject = ['items', '$http'];

  function ProjectsController(items, $http) {
    var projectsCtrl = this;
    projectsCtrl.items = items;
    console.log("pCtrl: "+projectsCtrl.items[0].all[0]);

    projectsCtrl.sz = "";

    console.log(projectsCtrl.items);
  }
})();
