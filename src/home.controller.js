(function () {
  'use strict';

  angular.module('ShopApp')
  .controller('HomeController', HomeController)
  .directive('sessionCart', SessionCartDirective)
  .directive('sessionLogin', SessionLoginDirective)
  .directive('sessionRegister', SessionRegisterDirective)
  .directive('forgottenPassword', ForgottenPassordDirective);

  HomeController.$inject = ['$scope', '$http', 'isloggedin', '$uibModal', '$log', 'Upload'];

    function HomeController($scope, $http, isloggedin, $uibModal, $log, Upload) {

        var hCtrl = this;
        //**************** Data for Dbase Upload ********************//
          $scope.fElements = {};
          $scope.fElements.sizes =
          {
            "i39" : {"all": "0", "reserved": "0", "forsale": "0", "sold": "0"},
            "i40" : {"all": "0", "reserved": "0", "forsale": "0", "sold": "0"},
            "i41" : {"all": "0", "reserved": "0", "forsale": "0", "sold": "0"},
            "i42" : {"all": "0", "reserved": "0", "forsale": "0", "sold": "0"},
            "i43" : {"all": "0", "reserved": "0", "forsale": "0", "sold": "0"},
            "i44" : {"all": "0", "reserved": "0", "forsale": "0", "sold": "0"},
            "i45" : {"all": "0", "reserved": "0", "forsale": "0", "sold": "0"},
          };
          console.log($scope.fElements.sizes);
        //**********************************************************//
        //**************** File Upload *********************//
        $scope.onFileSelect = function(file) {

          console.log(file);
            $scope.message = "";
                $scope.upload = Upload.upload({
                    url: 'php/upload.php',
                    method: 'POST',
                    file: file,
                    data: {
                              'item': $scope.fElements
                          }
                }).success(function(data, status, headers, config) {
                    $scope.message = data;
                    console.log($scope.message);
                }).error(function(data, status) {
                    $scope.message = data;
                });
        };

        //************************************************//
        //****************** MODAL ****************//
        hCtrl.data = false;

          hCtrl.open = function () {
            var modalInstance = $uibModal.open({
              // animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'src/template/myModalContent.html',
              controller: 'ModalInstanceController',
              controllerAs: 'mCtrl',
              // size: size,
              resolve: {
                data: function () {
                  console.log(hCtrl.data);
                  return hCtrl.data;
                }
              }
            });

            modalInstance.result.then(function () {
              $scope.showLogin = false;
              $scope.hasRoleAdmin = true;
              // alert($scope.showLogin);
            });
          };
        //*****************************************//
        $scope.hasRoleAdmin = false;
        hCtrl.isloggedin = isloggedin;
        if (hCtrl.isloggedin[2].Role != null) {
          $scope.hasRoleAdmin = true;
        } else {
          $scope.hasRoleAdmin = false;
        }
        if (hCtrl.isloggedin[0].isIn === false) {
          $scope.showLogin = true;
          $scope.showRegister = true;
          hCtrl.data = false;
          if (isloggedin[1].items === null) {
            $scope.showCart = false;
          } else {
            $scope.showCart = true;
          }
          console.log("Logged out "+hCtrl.isloggedin[1].items);
        } else {
          $scope.showLogin = false;
          $scope.showRegister = false;
          hCtrl.data = true;
          if (isloggedin[1].items === null) {
            $scope.showCart = false;
          } else {
            $scope.showCart = true;
          }
          console.log("Logged in "+hCtrl.isloggedin[0]);
        }

        $scope.showLoginForm = false;
        $scope.loginWarning = "";

//**********************************************************//
        $scope.logoutForm = function() {
          var userparams = "logOut";
          $http({
                  method  : 'POST',
                  url     : 'php/logoutsubmit.php',
                  data    : userparams,
                  headers : { 'Content-Type': 'application/x-www-form-urlencoded'},
                   })
                .then(function(response) {
                  if (response.data.isloggedin[0].isIn === false) {
                    $scope.showLogin = true;
                    $scope.hasRoleAdmin = false;
                  }
                    return response.data;
                  });
        };

// ***************************************** //
hCtrl.emptyCart = function () {
$http({
      method  : 'POST',
      url     : 'php/emptyCart.php'
       })
    .then(function(response) {
        hCtrl.isloggedin[1].items = response.data.cart;
        $scope.showCart = false;
        return response.data.cart;
    });
  };


// ***************************************** //
          $scope.openloginForm = function() {
            // console.log("Clicked open");
            if (!($scope.showLoginForm)) {
              $scope.pwarnings = "";
              $scope.loginWarning = "";
              $scope.showLoginForm = true;
              $scope.showRegisterForm = false;
              $scope.showPasswordChange = false;
              $scope.showPasswordForm = false;
            }
          };

          $scope.closeloginForm = function() {
            // console.log("Clicked close");
            if ($scope.showLoginForm) {
              $scope.loginWarning = "";
              $scope.showLoginForm = false;
              $scope.showPasswordForm = false;
              $scope.showPasswordChange = false;
            }
          };


          // $scope.openregisterForm = function() {
          //   // console.log("Clicked open");
          //   if (!($scope.showRegisterForm)) {
          //     $scope.loginWarning = "";
          //     $scope.showRegisterForm = true;
          //     $scope.showLoginForm = false;
          //     $scope.showPasswordForm = false;
          //     $scope.showPasswordChange = false;
          //   }
          // };

          $scope.closeregisterForm = function() {
            // console.log("Clicked close");
            if ($scope.showRegisterForm) {
              $scope.loginWarning = "";
              $scope.showRegisterForm = false;
              $scope.showPasswordForm = false;
              $scope.showPasswordChange = false;
            }
          };
};

    function SessionCartDirective () {
      return {
        templateUrl: 'src/template/session-cart.html'
      }
    };

    function SessionLoginDirective () {
      return {
        templateUrl: 'src/template/session-login.html'
      }
    };

    function SessionRegisterDirective () {
      return {
        templateUrl: 'src/template/session-register.html'
      }
    };

    function ForgottenPassordDirective () {
      return {
        templateUrl: 'src/template/forgotten-password.html'
      }
    };

})();
