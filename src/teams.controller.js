(function () {
  'use strict';

  angular.module('ShopApp')
  .controller('TeamsController', TeamsController);

  TeamsController.$inject = ['items', '$http', '$sce'];

  function TeamsController(items, $http, $sce) {
    var teamsCtrl = this;
    teamsCtrl.items = items;
    console.log("tCtrl: "+teamsCtrl.items);

    teamsCtrl.totalPages = [];
    teamsCtrl.PagesTeams = [];
    for (var i = 1; i <= teamsCtrl.items[3].teams[0].length; i++) {
      teamsCtrl.totalPages.push(i);
    }
    teamsCtrl.sz = "";
    teamsCtrl.totalPagesNumber = teamsCtrl.totalPages.length;

    teamsCtrl.currentPage = 0;
    teamsCtrl.PagesTeams.push(teamsCtrl.items[3].teams[0][0]);
    teamsCtrl.NextPage = function (pn) {
      console.log(pn);
      if (parseInt(pn)<0) {
        pn =0;
      } else if (pn>teamsCtrl.totalPages.length-1) {
        pn =teamsCtrl.totalPages.length-1;
      } else {
        window.scrollTo(0, 0);
      }
      teamsCtrl.PagesTeams[0] = teamsCtrl.items[3].teams[0][pn];
      teamsCtrl.currentPage = pn;
    };



  }
})();
