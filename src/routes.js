(function () {
'use strict';

angular.module('ShopApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  var home = {
    name: 'home',
    url: '/',
    templateUrl: 'src/template/home.template.html',
    controller: 'HomeController as hCtrl',
    resolve: {
      isloggedin: function (ShopDataService) {
        return ShopDataService.isLoggedIn();
      }
    }
  }

  var items = {
    name: 'items',
    url:'/items',
    views: {
        'content@': {
          templateUrl: 'src/template/items.template.html',
          controller: 'ItemsController as itemsCtrl',
          resolve: {
            items: ['ShopDataService', function (ShopDataService) {
              return ShopDataService.getAllItems();
            }]
          }
    }
   }
  }

  var checkout = {
    name: 'checkout',
    // parent: 'home',
    url: '/checkout',
    // params: { basket: null },
    views: {
         'basket@': {
          templateUrl: 'src/template/checkout.template.html',
          controller: 'CheckoutController as bCtrl',
        }
      },
      resolve: {
                  // basketitems: function(ShopDataService, $stateParams) {
                  //   console.log("basket in route: "+$stateParams.basket);
                  //   return ShopDataService.CheckoutItems($stateParams.basket);
                    cart: function(ShopDataService) {
                    return ShopDataService.CheckoutItems();
                  }
                }
  }

  var emailconfirmed = {
    name: 'verifyemail',
    parent: 'home',
    url: 'verifyemail/{selector}/{token}',
    views: {
         'verifyemail@home': {
          templateUrl: 'src/template/verify.template.html',
          controller: 'VerifyController as vCtrl'
        }
      },
      resolve: {
              info: function(ShopDataService, $stateParams) {
                    return ShopDataService.VerifyEmail($stateParams.selector, $stateParams.token);
                  }
                }
  }


  var passwordconfirmed = {
    name: 'changepassword',
    parent: 'home',
    url: 'changepassword/{selector}/{token}',
    views: {
         'changepassword@home': {
          templateUrl: 'src/template/passwordchange.template.html',
          controller: 'ChangepasswordController as cpCtrl'
        }
      },
      resolve: {
              info: function(ShopDataService, $stateParams) {
                    return ShopDataService.resetPassword($stateParams.selector, $stateParams.token);
                  }
                }
  }

  var admin = {
    name: 'admin',
    // parent: 'home',
    url: '/admin',
    // params: { basket: null },
    views: {
         'admin@': {
          templateUrl: 'src/template/admin.template.html',
          controller: 'AdminController as aCtrl',
        }
      },
      resolve: {
        items: ['ShopDataService', function (ShopDataService) {
          return ShopDataService.getAllItems();
        }]
      }
  }

  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state(home)
  .state(items)
  .state(checkout)
  .state(emailconfirmed)
  .state(passwordconfirmed)
  .state(admin)
 }
})();
