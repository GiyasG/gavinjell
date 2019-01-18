(function () {
  'use strict';

  angular.module('ShopApp')
  .controller('PapersController', PapersController);

  PapersController.$inject = ['items', '$http'];

  function PapersController(items, $http) {
    var papersCtrl = this;
    papersCtrl.items = items;
    console.log("pCtrl: "+papersCtrl.items);

    papersCtrl.totalPages = [];
    papersCtrl.PagesPapers = [];
    for (var i = 1; i <= papersCtrl.items[2].papers[0].length; i++) {
      papersCtrl.totalPages.push(i);
    }
    papersCtrl.sz = "";
    papersCtrl.totalPagesNumber = papersCtrl.totalPages.length;

    papersCtrl.currentPage = 0;
    papersCtrl.PagesPapers.push(papersCtrl.items[2].papers[0][0]);
    papersCtrl.NextPage = function (pn) {
      console.log(pn);
      if (parseInt(pn)<0) {
        pn =0;
      } else if (pn>papersCtrl.totalPages.length-1) {
        pn =papersCtrl.totalPages.length-1;
      } else {
        window.scrollTo(0, 0);
      }
      papersCtrl.PagesPapers[0] = papersCtrl.items[2].papers[0][pn];
      papersCtrl.currentPage = pn;
    };
    // console.log(papersCtrl.totalPages);
    // console.log(papersCtrl.PagesPapers[0]);
    // console.log(papersCtrl.items[1].papers[0]);


  }
})();
