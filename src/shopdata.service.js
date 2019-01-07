(function () {
  'use strict'

  angular.module('data')
  .service('ShopDataService', ShopDataService);

  ShopDataService.$inject = ['$http', '$stateParams'];
    function ShopDataService($http, $stateParams) {
      var service = this;

      service.isLoggedIn = function () {
        return $http.get("php/isloggedin.php")
          .then(function (response) {
          return response.data.isloggedin;
        });
      };

       service.getAllItems = function () {
        return $http.get("php/data.php")
          .then(function (response) {
            console.log("all items:"+response.data);
          return response.data.items;
        });
      };

      service.CheckoutItems = function (basket) {
        // console.log("basket in service: "+basket);
        // var basketitems = basket;
        // return basketitems
        return $http.get("php/checkout.php")
          .then(function (response) {
          console.log(response.data);
          return response.data.cart;
          });
        };

        service.VerifyEmail = function (sl, tk) {
          // console.log($stateParams);
          return $http.get("php/verifyemail.php?selector="+sl+"&token="+tk)
            .then(function (response) {
            console.log(response.data.info);
            return response.data.info;
          });
        };

        service.resetPassword = function (sl, tk) {
          return $http.get("php/canresetpassword.php?selector="+sl+"&token="+tk)
            .then(function (response) {
            console.log(response.data.info);
            return response.data.info;
          });
        };

      }
})();
