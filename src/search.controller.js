(function () {
  'use strict';
  angular.module('GJApp')
  .controller('SearchController', SearchController);
  SearchController.$inject = ['items', '$http', '$sce', '$scope'];
  function SearchController(items, $http, $sce, $scope) {
    var searchCtrl = this;
    searchCtrl.items = items;
    searchCtrl.totalPages = [];

    for (var i = 1; i <= searchCtrl.items[0].length; i++) {
      searchCtrl.totalPages.push(i);
    }
    console.log("totalPages: "+searchCtrl.totalPages);
    searchCtrl.totalPagesNumber = searchCtrl.items[0].length;


    searchCtrl.PagesSearch = searchCtrl.items[0][0];
    console.log(searchCtrl.PagesSearch);
    $scope.isPrevious = {
    "background-color" : "lightblue"
   };
    $scope.isNext = {
      "background-color" : "lightblue"
    };
    searchCtrl.totalPages = [];

    if (searchCtrl.PagesSearch[0] != null) {
    searchCtrl.currentPage = 0;
    window.scrollTo(0, 0);

    searchCtrl.NextPage = function (pn) {
      if (parseInt(pn)<0) {
        pn = 0;
      } else if (pn > searchCtrl.totalPagesNumber-1) {
        pn = searchCtrl.totalPagesNumber-1;
      } else {
        searchCtrl.PagesSearch = searchCtrl.items[0][0];
        window.scrollTo(0, 0);
      }
      searchCtrl.currentPage = pn;
      searchCtrl.PagesSearch = searchCtrl.items[0][pn];
    };

  } else {
    // searchCtrl.PagesSearch[0][0] = null;
  }
 }
})();
