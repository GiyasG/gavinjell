(function () {
'use strict';

angular.module('ShopApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  var home = {
    name: 'home',
    url: '/',
        views: {
          'content@': {
            templateUrl: 'src/template/home.template.html',
            controller: 'HomeController as hCtrl',
              resolve: {
                isloggedin: function (ShopDataService) {
                  return ShopDataService.isLoggedIn('home');
                  }
              }
          },
          'navbar@': {
            templateUrl: 'src/template/navbar.template.html',
            controller: 'NavbarController as nCtrl',
              resolve: {
                isloggedin: function (ShopDataService) {
                  return ShopDataService.isLoggedIn('home');
                  }
              }
          },
        }
    }

  var projects = {
    name: 'projects',
    url:'projects',
    parent: 'home',
    views: {
        'content@': {
          templateUrl: 'src/template/projects.template.html',
          controller: 'ProjectsController as projectsCtrl',
          resolve: {
            items: function (ShopDataService) {
              return ShopDataService.getItems('projects');
            },
            isloggedin: function (ShopDataService) {
              return ShopDataService.isLoggedIn('projects');
          }
    }
   }
  }
}
  var papers = {
    name: 'papers',
    url:'papers',
    parent: 'home',
    views: {
        'content@': {
          templateUrl: 'src/template/papers.template.html',
          controller: 'PapersController as papersCtrl',
          resolve: {
            items: function (ShopDataService) {
              return ShopDataService.getItems('papers');
            },
            isloggedin: function (ShopDataService) {
              return ShopDataService.isLoggedIn('projects');
            }
          }
    }
   }
  }

  var teams = {
    name: 'teams',
    url:'teams',
    parent: 'home',
    views: {
        'content@': {
          templateUrl: 'src/template/teams.template.html',
          controller: 'TeamsController as teamsCtrl',
          resolve: {
            items: function (ShopDataService) {
              return ShopDataService.getItems('teams');
            },
            isloggedin: function (ShopDataService) {
              return ShopDataService.isLoggedIn('projects');
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
  //                 // basketitems: function(ShopDataService, $stateParams) {
  //                 //   console.log("basket in route: "+$stateParams.basket);
  //                 //   return ShopDataService.CheckoutItems($stateParams.basket);
  //                   cart: function(ShopDataService) {
  //                   return ShopDataService.CheckoutItems();
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
    parent: 'home',
    url: 'admin',
    // params: { basket: null },
    views: {
         'content@': {
          templateUrl: 'src/template/admin.template.html',
          controller: 'AdminController as aCtrl',
        }
      },
      resolve: {
        items: ['ShopDataService', function (ShopDataService) {
          return ShopDataService.getItems('admin');
        }]
      }
  }

  var project = {
    name: 'project',
    parent: 'home',
    url: 'projects/{id}',
    // params: { basket: null },
    views: {
         'content@': {
          templateUrl: 'src/template/project.template.html',
          controller: 'ProjectController as psCtrl',
        }
      },
      resolve: {
        items: function (ShopDataService, $stateParams) {
          return ShopDataService.getItems('projects', $stateParams.id);
        }
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
  .state(project)
 }
})();
