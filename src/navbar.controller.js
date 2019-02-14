(function () {
  'use strict';

  angular.module('ShopApp')
  .controller('NavbarController', NavbarController)
  .directive('sessionLogin', SessionLoginDirective)
  .directive('sessionRegister', SessionRegisterDirective)
  .directive('forgottenPassword', ForgottenPassordDirective);

  NavbarController.$inject = ['$http', '$scope', 'isloggedin', '$uibModal', '$log'];

    function NavbarController($http, $scope, isloggedin, $uibModal, $log) {

        var nCtrl = this;
        //****************** MODAL ****************//
        nCtrl.data = false;

          nCtrl.open = function () {
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
                  console.log(nCtrl.data);
                  return nCtrl.data;
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
        nCtrl.isloggedin = isloggedin;
        if (nCtrl.isloggedin[1].Role != null) {
          $scope.hasRoleAdmin = true;
        } else {
          $scope.hasRoleAdmin = false;
        }
        if (nCtrl.isloggedin[0].isIn === false) {
          $scope.showLogin = true;
          $scope.showRegister = true;
          nCtrl.data = false;
          if (isloggedin[1].items === null) {
            $scope.showCart = false;
          } else {
            $scope.showCart = true;
          }
          console.log("Logged out "+nCtrl.isloggedin[1].items);
        } else {
          $scope.showLogin = false;
          $scope.showRegister = false;
          nCtrl.data = true;
          if (isloggedin[1].items === null) {
            $scope.showCart = false;
          } else {
            $scope.showCart = true;
          }
          console.log("Logged in "+nCtrl.isloggedin[1].Role);
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
nCtrl.emptyCart = function () {
$http({
      method  : 'POST',
      url     : 'php/emptyCart.php'
       })
    .then(function(response) {
        nCtrl.isloggedin[1].items = response.data.cart;
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
