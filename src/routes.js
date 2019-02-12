(function () {
'use strict';

angular.module('GJapp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  var home = {
    name: 'home',
    url: '/',
    templateUrl: 'src/template/home.template.html',
    controller: 'HomeController as hCtrl',
    resolve: {
      isloggedin: function (DataService) {
        return DataService.isLoggedIn('home');
      }
    }
  }

  var projects = {
    name: 'projects',
    url:'/projects',
    views: {
        'content@': {
          templateUrl: 'src/template/projects.template.html',
          controller: 'ProjectsController as projectsCtrl',
          resolve: {
            items: function (DataService) {
              return DataService.getItems('projects');
            },
            isloggedin: function (DataService) {
              return DataService.isLoggedIn('projects');
          }
    }
   }
  }
}
  var papers = {
    name: 'papers',
    url:'/papers',
    views: {
        'content@': {
          templateUrl: 'src/template/papers.template.html',
          controller: 'PapersController as papersCtrl',
          resolve: {
            items: function (DataService) {
              return DataService.getItems('papers');
            },
            isloggedin: function (DataService) {
              return DataService.isLoggedIn('projects');
            }
          }
    }
   }
  }

  var teams = {
    name: 'teams',
    url:'/teams',
    views: {
        'content@': {
          templateUrl: 'src/template/teams.template.html',
          controller: 'TeamsController as teamsCtrl',
          resolve: {
            items: function (DataService) {
              return DataService.getItems('teams');
            },
            isloggedin: function (DataService) {
              return DataService.isLoggedIn('projects');
            }
      }
    }
   }
  }


  // var checkout = {
  //   name: 'checkout',
  //   // parent: 'home',
  //   url: '/checkout',
  //   // params: { basket: null },
  //   views: {
  //        'basket@': {
  //         templateUrl: 'src/template/checkout.template.html',
  //         controller: 'CheckoutController as bCtrl',
  //       }
  //     },
  //     resolve: {
  //                 // basketitems: function(DataService, $stateParams) {
  //                 //   console.log("basket in route: "+$stateParams.basket);
  //                 //   return DataService.CheckoutItems($stateParams.basket);
  //                   cart: function(DataService) {
  //                   return DataService.CheckoutItems();
  //                 }
  //               }
  // }

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
              info: function(DataService, $stateParams) {
                    return DataService.VerifyEmail($stateParams.selector, $stateParams.token);
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
              info: function(DataService, $stateParams) {
                    return DataService.resetPassword($stateParams.selector, $stateParams.token);
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
        items: ['DataService', function (DataService) {
          return DataService.getItems('admin');
        }]
      }
  }

  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state(home)
  .state(projects)
  .state(papers)
  .state(teams)
  // .state(checkout)
  .state(emailconfirmed)
  .state(passwordconfirmed)
  .state(admin)
 }
})();
