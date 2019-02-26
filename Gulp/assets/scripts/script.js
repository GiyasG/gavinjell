(function () {
'use strict'
angular.module('GJApp', ['ui.router', 'data', 'ui.bootstrap', 'ngFileUpload', 'ui.tinymce','ngSanitize'])
.config(config);
config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}
})();

(function() {
"use strict";

angular.module('GJApp')
.component('loading', {
  template: '<img src="img/infinity.svg" ng-if="$ctrl.show">',
  controller: LoadingController
});


LoadingController.$inject = ['$rootScope'];
function LoadingController ($rootScope) {
  var $ctrl = this;
  var listener;

  $ctrl.$onInit = function() {
    $ctrl.show = false;
    listener = $rootScope.$on('spinner:activate', onSpinnerActivate);
  };

  $ctrl.$onDestroy = function() {
    listener();
  };

  function onSpinnerActivate(event, data) {
    $ctrl.show = data.on;
  }
}

})();

(function() {
"use strict";

angular.module('GJApp')
.factory('loadingHttpInterceptor', LoadingHttpInterceptor);

LoadingHttpInterceptor.$inject = ['$rootScope', '$q'];
/**
 * Tracks when a request begins and finishes. When a
 * request starts, a progress event is emitted to allow
 * listeners to determine when a request has been initiated.
 * When the response completes or a response error occurs,
 * we assume the request has ended and emit a finish event.
 */
function LoadingHttpInterceptor($rootScope, $q) {

  var loadingCount = 0;
  var loadingEventName = 'spinner:activate';

  return {
    request: function (config) {
      // console.log("Inside interceptor, config: ", config);

      if (++loadingCount === 1) {
        $rootScope.$broadcast(loadingEventName, {on: true});
      }

      return config;
    },

    response: function (response) {
      if (--loadingCount === 0) {
        $rootScope.$broadcast(loadingEventName, {on: false});
      }

      return response;
    },

    responseError: function (response) {
      if (--loadingCount === 0) {
        $rootScope.$broadcast(loadingEventName, {on: false});
      }

      return $q.reject(response);
    }
  };
}

})();

(function () {
'use strict'
angular.module('data', []);
})();

(function () {
  'use strict'
  angular.module('data')
  .service('DataService', DataService)
  .factory('FData', FData);
  DataService.$inject = ['$http', '$stateParams'];
    function DataService($http, $stateParams) {
      var service = this;
      service.isLoggedIn = function (param) {
        return $http.get("php/isloggedin.php?"+param)
          .then(function (response) {
          return response.data.isloggedin;
        });
      };
       service.getItems = function (param, id) {
        if (!id) {
          return $http.get("php/data.php?db="+param)
          .then(function (response) {
            return response.data.items;
          });
        } else {
          return $http.get("php/data.php?db="+param+"&id="+id)
          .then(function (response) {
            return response.data.items;
          });
        }
      };

      service.searchItem = function (param) {
         return $http.get("php/search.php?searching="+param)
         .then(function (response) {
           return response.data.items;
         });
     };

        service.VerifyEmail = function (sl, tk) {
          return $http.get("php/verifyemail.php?selector="+sl+"&token="+tk)
            .then(function (response) {
            return response.data.info;
          });
        };

        service.resetPassword = function (sl, tk) {
          return $http.get("php/canresetpassword.php?selector="+sl+"&token="+tk)
            .then(function (response) {
            return response.data.info;
          });
        };
      }

        FData.$inject = ['$sce'];
        function FData($sce) {
        var fD = this;
        return {
        description: function(string) {
                 return $sce.trustAsHtml(string);
              }
          }
          // this.uCanTrust =
        }

})();

(function () {
  'use strict';
  angular.module('GJApp')
  .controller('HomeController', HomeController);
  HomeController.$inject = ['FData', '$state', '$scope', '$http', 'isloggedin', '$log', 'Upload', '$sce'];
    function HomeController(FData, $state, $scope, $http, isloggedin, $log, Upload, $sce) {
        var hCtrl = this;
        //**************** Data for Dbase Upload ********************//
        $scope.fD = FData;
        $scope.fElements = {};
        $scope.onFileSelect = function(file) {
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
                }).error(function(data, status) {
                    $scope.message = data;
                });
        };
        //****************** MODAL ****************//
        hCtrl.data = false;
          hCtrl.open = function () {
            var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'src/template/myModalContent.html',
              controller: 'ModalInstanceController',
              controllerAs: 'mCtrl',
              resolve: {
                data: function () {
                  return hCtrl.data;
                }
              }
            });
            modalInstance.result.then(function () {
              $scope.showLogin = false;
              $scope.hasRoleAdmin = true;
            });
          };
        //*****************************************//
        $scope.hasRoleAdmin = false;
        hCtrl.isloggedin = isloggedin;
        if (hCtrl.isloggedin[1].Role != null) {
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
        } else {
          $scope.showLogin = false;
          $scope.showRegister = false;
          hCtrl.data = true;
          if (isloggedin[1].items === null) {
            $scope.showCart = false;
          } else {
            $scope.showCart = true;
          }
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
          $scope.openloginForm = function() {
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
            if ($scope.showLoginForm) {
              $scope.loginWarning = "";
              $scope.showLoginForm = false;
              $scope.showPasswordForm = false;
              $scope.showPasswordChange = false;
            }
          };
          $scope.closeregisterForm = function() {
            if ($scope.showRegisterForm) {
              $scope.loginWarning = "";
              $scope.showRegisterForm = false;
              $scope.showPasswordForm = false;
              $scope.showPasswordChange = false;
            }
          };
};
})();

(function () {
  'use strict';
  angular.module('GJApp')
  .controller('ModalInstanceController', ModalInstanceController);
  ModalInstanceController.$inject = ['$uibModalInstance', 'data', '$scope', '$http'];
  function ModalInstanceController($uibModalInstance, data, $scope, $http) {
    var mCtrl = this;
        mCtrl.data = data;
        if ($scope.showLogin) {
          mCtrl.title = "You are already logged in";
        } else {
          mCtrl.title = "Loggining into account";
        }
        $scope.showModalLogin = true;
        $scope.showModalRegister = false;
        $scope.showModalForgotten = false;
        $scope.rms = {
          model: null,
          availableOptions: [
            {id: "1", Name: 'Remember (keep logged in)? — Yes'},
            {id: "2", Name: 'Remember (keep logged in)? — No'}
          ]
         };
        $scope.user = {};
// ***************************************** //
        $scope.showForgottenPassword = function(ev) {
          ev.preventDefault();
          mCtrl.title = "Sending request for forgotten password";
          $scope.showModalLogin = false;
          $scope.showModalForgotten = true;
          $scope.showModalRegister = false;
          $scope.loginWarning = "";
        };
// ***************************************** //
          $scope.openregisterForm = function(ev) {
            ev.preventDefault();
            mCtrl.title = "Registering a new account";
            $scope.showModalLogin = false;
            $scope.showModalForgotten = false;
            $scope.showModalRegister = true;
            $scope.loginWarning = "";
};
// ***************************************** //
            $scope.loginForm = function() {
              if (!$scope.user.em) {
                $scope.loginWarning = "invalid email format";
                return
              } else if (!$scope.user.ps) {
                $scope.loginWarning = "Please enter the password";
                return
              } else if (!$scope.rms.model) {
                $scope.loginWarning = "Please specify 'remember me' option";
                return
              }
              else {
                var regem = ($scope.user.em).replace(new RegExp('[.]', 'g'), '-dot-');
                var regps = ($scope.user.ps).replace(new RegExp('[.]', 'g'), '-dot-').replace(new RegExp('\\[', 'g'), '-sqbl-');
              }
                var userparams =
                {
                  em: regem,
                  ps: regps,
                  rm: $scope.rms.model
                };
              $http({
                      method  : 'POST',
                      url     : 'php/loginsubmit.php',
                      data    : userparams,
                      headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                       })
                    .then(function(response) {
                        if (response.data.isloggedin[0].isLoggedIn == "1") {
                          $scope.showLoginForm = false;
                            if (response.data.isloggedin[0].Admin) {
                              mCtrl.role = true;
                            } else {
                              mCtrl.role = false;
                            }
                          $scope.user = {};
                          $uibModalInstance.close(mCtrl.role);
                        } else {
                          $scope.hasRoleAdmin = false;
                          $scope.showLogin = false;
                          $scope.loginWarning = response.data.isloggedin[0].Error;
                        }
                        return response.data.isloggedin;
                    });
                  };
// ***************************************** //
$scope.showRegisterForm = false;
$scope.ems = [
                {emid: 1, emName: 'Require email confirmation? — No'},
                {emid: 2, emName: 'Require email confirmation? — Yes'}
            ];
$scope.showPasswordForm = false;
var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
$scope.passwordStrength = {
  "color": "grey",
  "margin-left": "5px",
  "margin-top": "5px",
  "font-size": "0.9em"
};
$scope.disabledRegister = true;
$scope.passwordRegister = "Use at least one an uppercase letter, a number and a special character";
$scope.analyze = function(value) {
if (value) {
  if(strongRegex.test(value) & value.length >= 8) {
    $scope.passwordStrength["color"] = "green";
    $scope.disabledRegister = false;
    $scope.passwordRegister = "Strong password";
  } else if(mediumRegex.test(value) & value.length >= 8) {
    $scope.passwordStrength["color"] = "orange";
    $scope.disabledRegister = false;
    $scope.passwordRegister = "Fair password";
  } else {
    $scope.passwordStrength["color"] = "red";
    $scope.disabledRegister = true;
    $scope.passwordRegister = "Not valid password, Use at least one an uppercase letter, a number and a special character";
  }
} else {
  $scope.passwordStrength["color"] = "grey";
  $scope.passwordRegister = "Use at least one an uppercase letter, a number and a special character";
}
};
// ***************************************** //
$scope.registerForm = function() {
  if (!$scope.user.em) {
    $scope.loginWarning = "invalid email format";
    return
  } else if (!$scope.user.ps) {
    $scope.loginWarning = "Please enter the password";
    return
  } else if (!$scope.ems.emid) {
    $scope.loginWarning = "Please specify option";
    return
  } else {
    var regem = ($scope.user.em).replace(new RegExp('[.]', 'g'), '-dot-');
    var regps = ($scope.user.ps).replace(new RegExp('[.]', 'g'), '-dot-').replace(new RegExp('\\[', 'g'), '-sqbl-');
    if (!$scope.user.un) {
      var regun = regem;
    } else {
      var regun = ($scope.user.un).replace(new RegExp('[.]', 'g'), '-dot-').replace(new RegExp('\\[', 'g'), '-sqbl-');
    }
  }
    var userparams =
      {
        em: regem,
        ps: regps,
        un: regun,
        rm: $scope.ems.emid
      };
  $http({
          method  : 'POST',
          url     : 'php/registersubmit.php',
          data    : userparams,
          headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
           })
        .then(function(response) {
            if (response.data.sitems) {
              if (response.data.sitems[0].Info) {
                $scope.showRegister = false;
                $scope.loginWarning = response.data.sitems[0].Info;
                $scope.user = {};
                $scope.passwordStrength["color"] = "grey";
                $scope.passwordRegister = "Use at least one an uppercase letter, a number and a special character";
              } else if (response.data.sitems[0].Error) {
                $scope.showLogin = false;
                $scope.loginWarning = response.data.sitems[0].Error;
              }
            }
            return response.data.sitems;
        });
      };
// *************************************** //
$scope.changepassConfirmation = function () {
  if (!$scope.user.resend_email) {
    $scope.loginWarning = "invalid email format";
    return
  }
var regem = ($scope.user.resend_email).replace(new RegExp('[.]', 'g'), '-dot-');
var userparams =
  {
    em: regem
  };
$http({
      method  : 'POST',
      url     : 'php/requestforpassword.php',
      data    : userparams,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
       })
    .then(function(response) {
        if (response.data.info[0].ConfirmationStatus) {
          $scope.showRegister = false;
          $scope.loginWarning = response.data.info[0].ConfirmationStatus;
          $scope.resend_email = "";
          $scope.showPasswordForm = false;
        } else {
          $scope.showLogin = true;
          $scope.loginWarning = response.data.info[0].ConfirmationStatus;
        }
        return response.data.info;
    });
  };
//******************************************************************//
        mCtrl.CloseModal = function () {
          $scope.loginWarning = "";
        // alert("You clicked the cancel button.");
        $uibModalInstance.dismiss('cancel');
      };
  }
})();

(function () {
  'use strict';
  angular.module('GJApp')
  .component('items', {
    templateUrl: 'src/template/projects.template.html',
    bindings: {
      items: '<'
        }
  });
})();

(function () {
  'use strict';
  angular.module('GJApp')
  .controller('ProjectsController', ProjectsController);
  ProjectsController.$inject = ['items', '$http', '$sce', '$scope'];
  function ProjectsController(items, $http, $sce, $scope) {
    var projectsCtrl = this;
    projectsCtrl.items = items;
    $scope.hasRoleAdmin = projectsCtrl.items[5].AdminIsIn;
    $scope.isPrevious = {
    "background-color" : "lightblue"
   };
    $scope.isNext = {
      "background-color" : "lightblue"
    };
    projectsCtrl.totalPages = [];
    projectsCtrl.PagesProjects = [];
    for (var i = 1; i <= projectsCtrl.items[1].projects[0].length; i++) {
      projectsCtrl.totalPages.push(i);
    }
    projectsCtrl.sz = "";
    projectsCtrl.totalPagesNumber = projectsCtrl.totalPages.length;
    projectsCtrl.currentPage = 0;
    projectsCtrl.PagesProjects.push(projectsCtrl.items[1].projects[0][0]);
    window.scrollTo(0, 0);
    projectsCtrl.NextPage = function (pn) {
      if (parseInt(pn)<0) {
        pn =0;
      } else if (pn>projectsCtrl.totalPages.length-1) {
        pn =projectsCtrl.totalPages.length-1;
      } else {
        window.scrollTo(0, 0);
      }
      projectsCtrl.PagesProjects[0] = projectsCtrl.items[1].projects[0][pn];
      projectsCtrl.currentPage = pn;
    };
  }
})();

(function () {
  'use strict';
  angular.module('GJApp')
  .component('items', {
    templateUrl: 'src/template/papers.template.html',
    bindings: {
      items: '<'
        }
  });
})();

(function () {
  'use strict';
  angular.module('GJApp')
  .controller('PapersController', PapersController);
  PapersController.$inject = ['items', '$http', '$sce', '$scope'];
  function PapersController(items, $http, $sce, $scope) {
    var papersCtrl = this;
    papersCtrl.items = items;
    $scope.hasRoleAdmin = papersCtrl.items[5].AdminIsIn;
    $scope.isPrevious = {
    "background-color" : "lightblue"
   };
    $scope.isNext = {
      "background-color" : "lightblue"
    };
    papersCtrl.totalPages = [];
    papersCtrl.PagesPapers = [];
    for (var i = 1; i <= papersCtrl.items[2].papers[0].length; i++) {
      papersCtrl.totalPages.push(i);
    }
    papersCtrl.sz = "";
    papersCtrl.totalPagesNumber = papersCtrl.totalPages.length;
    papersCtrl.currentPage = 0;
    papersCtrl.PagesPapers.push(papersCtrl.items[2].papers[0][0]);
    window.scrollTo(0, 0);
    papersCtrl.NextPage = function (pn) {
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
  }
})();

(function () {
  'use strict';
  angular.module('GJApp')
  .component('items', {
    templateUrl: 'src/template/teams.template.html',
    bindings: {
      items: '<'
        }
  });
})();

(function () {
  'use strict';
  angular.module('GJApp')
  .controller('TeamsController', TeamsController);
  TeamsController.$inject = ['items', '$http', '$sce', '$scope'];
  function TeamsController(items, $http, $sce, $scope) {
    var teamsCtrl = this;
    teamsCtrl.items = items;
    $scope.hasRoleAdmin = teamsCtrl.items[5].AdminIsIn;
    teamsCtrl.totalPages = [];
    teamsCtrl.PagesTeams = [];
    for (var i = 1; i <= teamsCtrl.items[3].teams[0].length; i++) {
      teamsCtrl.totalPages.push(i);
    }
    teamsCtrl.sz = "";
    teamsCtrl.totalPagesNumber = teamsCtrl.totalPages.length;
    teamsCtrl.currentPage = 0;
    teamsCtrl.PagesTeams.push(teamsCtrl.items[3].teams[0][0]);
    window.scrollTo(0, 0);
    teamsCtrl.NextPage = function (pn) {
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

(function () {
  'use strict';
  angular.module('GJApp')
  .component('verify', {
    templateUrl: 'src/template/verify.template.html',
    bindings: {
      info: '<'
        }
  });
})();

(function () {
  'use strict';
  angular.module('GJApp')
  .controller('VerifyController', VerifyController);
  VerifyController.$inject = ['$scope', '$http', 'info'];
  function VerifyController($scope, $http, info) {
    var vCtrl = this;
    vCtrl.info = info;
    $scope.user = {};
    $scope.loginWarningResend = "";
    // ***************************************** //
    $scope.resendConfirmation = function() {
        var regem = ($scope.user.resend_email).replace(new RegExp('[.]', 'g'), '-dot-');
        var userparams =
          {
            em: regem
          };
      $http({
              method  : 'POST',
              url     : 'php/resendconfirmation.php',
              data    : userparams,
              headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
               })
            .then(function(response) {
                if (response.data.info[0].ConfirmationStatus) {
                  $scope.showRegister = false;
                  $scope.loginWarning = "";
                  $scope.loginWarningResend = response.data.info[0].ConfirmationStatus;
                  $scope.resend_email = "";
                } else {
                  $scope.showLogin = true;
                  $scope.loginWarning = "";
                  $scope.loginWarningResend = response.data.info[0].ConfirmationStatus;
                }
                return response.data.info;
            });
          };
  }
})();

(function () {
  'use strict';
  angular.module('GJApp')
  .component('changepassword', {
    templateUrl: 'src/template/passwordchange.template.html',
    bindings: {
      info: '<'
        }
  });
})();

(function () {
  'use strict';

  angular.module('GJApp')
  .controller('ChangepasswordController', ChangepasswordController);

  ChangepasswordController.$inject = ['$scope', '$http', '$stateParams', 'info'];
  function ChangepasswordController($scope, $http, $stateParams, info) {
    var cpCtrl = this;
    cpCtrl.info = info;
    $scope.user = {};
    $scope.loginWarningResend = "";
    $scope.showLoginForm = false;
    $scope.showPasswordChange = true;
    // ***************************************** //
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    $scope.passwordStrength = {
        "color": "grey",
        "margin-left": "5px",
        "margin-top": "5px",
        "font-size": "0.9em"
    };
    $scope.disabledChange = true;
    $scope.passwordMatch = false;
    $scope.passwordRegister = "Use at least one an uppercase letter, a number and a special character";
    $scope.analyze1 = function(value) {
      if (value) {
        if(strongRegex.test(value) & value.length >= 8) {
          $scope.passwordStrength["color"] = "green";
          $scope.passwordRegister = "Strong password";
        } else if(mediumRegex.test(value) & value.length >= 8) {
          $scope.passwordStrength["color"] = "orange";
          $scope.passwordRegister = "Fair password";
        } else {
          $scope.passwordStrength["color"] = "red";
          $scope.passwordRegister = "Not valid password, Use at least one an uppercase letter, a number and a special character";
        }
      } else {
        $scope.passwordStrength["color"] = "grey";
        $scope.passwordRegister = "Use at least one an uppercase letter, a number and a special character";
      }
    };
      $scope.analyze2 = function(value1, value2) {
        if (value1) {
          if(value1 == value2) {
            $scope.disabledChange = false;
            $scope.passwordMatch = true;
          } else {
            $scope.disabledChange = true;
            $scope.passwordMatch = false;
          }
        }
    };
// ***************************************** //
    $scope.changePassword = function() {
        var userparams =
          {
            sl: $stateParams.selector,
            tk: $stateParams.token,
            ps: $scope.user.new_password
          };
      $http({
              method  : 'POST',
              url     : 'php/changepassword.php',
              data    : userparams,
              headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
               })
            .then(function(response) {
                if (response.data.info[0].ConfirmationStatus) {
                  $scope.loginWarning = "";
                  $scope.showPasswordChange = false;
                  $scope.loginWarningResend = response.data.info[0].ConfirmationStatus;
                  $scope.user = {};
                } else {
                  $scope.loginWarning = "";
                  $scope.loginWarningResend = response.data.info[0].ConfirmationStatus;
                }
                return response.data.info;
            });
          };
  }
})();

(function () {
  'use strict';

  angular.module('GJApp')
  .component('items', {
    templateUrl: 'src/template/admin.template.html',
    bindings: {
      items: '<',
        }
  });

})();

(function () {
  'use strict';
  angular.module('GJApp')
  .controller('AdminController', AdminController)
  .directive('adminAdd', AdminAddDirective)
  .directive('adminUpdate', AdminUpdateDirective)
  .directive('contactAdd', ContactAddDirective)
  .directive('contactUpdate', ContactUpdateDirective)
  .directive('projectAdd', ProjectAddDirective)
  .directive('projectUpdate', ProjectUpdateDirective)
  .directive('paperAdd', PaperAddDirective)
  .directive('paperUpdate', PaperUpdateDirective)
  .directive('teamAdd', TeamAddDirective)
  .directive('teamUpdate', TeamUpdateDirective)
  .directive('teamcontactAdd', TeamcontactAddDirective)
  .directive('teamcontactUpdate', TeamcontactUpdateDirective);
  AdminController.$inject = ['FData', '$state', '$scope', '$http', '$sce', 'Upload', 'items'];
    function AdminController(FData, $state, $scope, $http, $sce, Upload, items) {
        var aCtrl = this;
        $scope.fD = FData;
        aCtrl.items = items;
        if (aCtrl.items[5].Role === "Admin") {
            $scope.hasRoleAdmin = true;
        } else {
          window.scrollTo(0, 0);
          $state.go('home');
        }
        $scope.updateIndexItem = null;
        $scope.updateIndexProject = null;
        $scope.updateIndexPaper = null;
        $scope.updateIndexTeam = null;
        $scope.updateIndexContact = null;
        $scope.updateIndexTeamcontact = null;

        $scope.AddNewRecord = false;
        $scope.AddNewProject = false;
        $scope.AddNewPaper = false;
        $scope.AddNewTeam = false;
        $scope.AddNewTeamcontact = false;
        $scope.AddNewContact = false;
        $scope.tinymceModel = "";
        //**************** Data for Dbase Upload ********************//
          $scope.itemU = {};
          $scope.fElements = {};
          $scope.fElements.about = "";
          $scope.fElements.genders = {
            model: null,
            sex: ["male","female"]
         };
         $scope.fProjects = {};
         $scope.fPapers = {};
         $scope.fTeams = {};
         $scope.fContact = {};
         $scope.fTeamcontact = {};
         $scope.fTeams.genders = {
           model: null,
           sex: ["male","female"]
        };
        $scope.fProjects.authors = {
          model: {
            id: null,
            name: null,
          }
         };
         $scope.fPapers.authors = {
           model: {
             id: null,
             name: null,
           }
          };
          $scope.fSlides = {};
          $scope.fSlides.projects = {
            model: {
              id: null,
              name: null,
            }
           };
           $scope.fSlides.papers = {
             model: {
               id: null,
               name: null,
             }
            };
          $scope.author = [];
          $scope.disabledTM ={};
          $scope.disabledSI ={};
          angular.forEach(aCtrl.items[6].slide[0], function(value, key){
            $scope.disabledSI[value.id+value.title] = true;
          });
        //**************** Authority Add new record *********************//
        $scope.onFileSelect = function(file, abauth) {
          $scope.fElements.about = abauth;
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
                    if ($scope.message.info[0].newitem[0].id) {
                      var newitem = {};
                      newitem.id = $scope.message.info[0].newitem[0].id;
                      newitem.title = $scope.message.info[0].newitem[0].title;
                      newitem.name = $scope.message.info[0].newitem[0].name;
                      newitem.surname = $scope.message.info[0].newitem[0].surname;
                      newitem.about = $scope.message.info[0].newitem[0].about;
                      newitem.position = $scope.message.info[0].newitem[0].position;
                      newitem.dob = $scope.message.info[0].newitem[0].dob;
                      newitem.sex = $scope.message.info[0].newitem[0].genders.model;
                      newitem.image = $scope.message.info[0].newitem[0].filename;
                      aCtrl.items[0].all.push(newitem);
                      $scope.AddNewRecord = false;
                      $scope.fElements = {};
                    }
                }).error(function(data, status) {
                    $scope.message = data;
                });
        };
        //************************************************//
        $scope.DeleteItem = function(id) {
          $http({
                method  : 'POST',
                url     : 'php/DeleteItem.php',
                data    : {id: id},
                headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                 })
              .then(function(response) {
                  var rid = aCtrl.items[0].all.findIndex(x => x.id === id);
                  aCtrl.items[0].all.splice(rid, 1);
                  return response.data.info;
              });
        };
        $scope.UpdateItem = function (id, sid) {
          $scope.message = "";
          $scope.updateIndexItem = sid;
          $http({
                method  : 'POST',
                url     : 'php/getUpdateItem.php',
                data    : {id: id},
                headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                 })
              .then(function(response) {
                  $scope.itemU = response.data[0];
                  $scope.fElements.genders.model = $scope.itemU.sex;
                  return response.data[0];
              });
            }
          //**************** Authority Update *********************//
          $scope.onFileUpdate = function(file) {
            if ($scope.fElements.genders.model != null) {
              $scope.itemU.sex = $scope.fElements.genders.model;
            }
              $scope.message = "";
                  $scope.upload = Upload.upload({
                      url: 'php/update.php',
                      method: 'POST',
                      file: file,
                      data: {
                                'item': $scope.itemU
                            }
                  }).success(function(data, status, headers, config) {
                      $scope.uadata = data;
                      $scope.updateIndexItem = null;
                      var uitem = {};
                      uitem.authority_id = $scope.uadata.info[0].updateitem[0].id;
                      uitem.title = $scope.uadata.info[0].updateitem[0].title;
                      uitem.name = $scope.uadata.info[0].updateitem[0].name;
                      uitem.surname = $scope.uadata.info[0].updateitem[0].surname;
                      uitem.about = $scope.uadata.info[0].updateitem[0].about;
                      uitem.position = $scope.uadata.info[0].updateitem[0].position;
                      uitem.dob = $scope.uadata.info[0].updateitem[0].dob;
                      uitem.sex = $scope.uadata.info[0].updateitem[0].sex;
                    if (file) {
                      $scope.itemU.image = $scope.uadata.info[0].updateitem[0].image;
                    }
                      uitem.image = $scope.uadata.info[0].updateitem[0].image;
                      var rid = aCtrl.items[0].all[0].findIndex(x => x.authority_id === uitem.authority_id);
                      aCtrl.items[0].all[0][rid] = uitem;
                  }).error(function(data, status) {
                      $scope.message.info[1].message = data;
                  });
          };
          //**************** Contact Add new record *********************//
          $scope.onContactSelect = function() {
              $scope.message = "";
                  $scope.upload = Upload.upload({
                      url: 'php/uploadContact.php',
                      method: 'POST',
                      // file: file,
                      data: {
                                'item': $scope.fContact
                            }
                  }).success(function(data, status, headers, config) {
                      $scope.message = data;
                      if ($scope.message.info[0].newitem[0].id) {
                        var newitem = {};
                        newitem.id = $scope.message.info[0].newitem[0].id;
                        newitem.propertytype = $scope.message.info[0].newitem[0].propertytype;
                        newitem.country = $scope.message.info[0].newitem[0].country;
                        newitem.city = $scope.message.info[0].newitem[0].city;
                        newitem.postcode = $scope.message.info[0].newitem[0].postcode;
                        newitem.street = $scope.message.info[0].newitem[0].street;
                        newitem.phone = $scope.message.info[0].newitem[0].phone;
                        newitem.email = $scope.message.info[0].newitem[0].email;
                        newitem.authority_id = $scope.message.info[0].newitem[0].authority_id;
                        aCtrl.items[4].all.push(newitem);
                        $scope.AddNewContact = false;
                        $scope.fContact = {};
                      }
                  }).error(function(data, status) {
                      $scope.message = data;
                  });
          };
          //************************************************//
          $scope.DeleteContact = function(aid, id) {
            $http({
                  method  : 'POST',
                  url     : 'php/DeleteContact.php',
                  data    : {aid: aid, id: id},
                  headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                   })
                .then(function(response) {
                    var rid = aCtrl.items[4].contact[0].findIndex(x => x.id === id);
                    aCtrl.items[4].contact[0].splice(rid, 1);
                    return response.data.info;
                });
          };
          $scope.UpdateContact = function (aid, id, sid) {
            $scope.message = "";
            $scope.updateIndexContact = sid;
            $http({
                  method  : 'POST',
                  url     : 'php/getUpdateContact.php',
                  data    : {aid: aid, id: id},
                  headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                   })
                .then(function(response) {
                    $scope.itemU = response.data[0];
                    return response.data[0];
                });
              }
          //**************** Contact Update *********************//
          $scope.onContactUpdate = function() {
              $scope.message = "";
                  $scope.upload = Upload.upload({
                      url: 'php/updateContact.php',
                      method: 'POST',
                      // file: file,
                      data: {
                                'item': $scope.itemU
                            }
                  }).success(function(data, status, headers, config) {
                      $scope.message = data;
                      var uitem = {};
                      uitem.id = $scope.message.info[0].updateitem[0].id;
                      uitem.propertytype = $scope.message.info[0].updateitem[0].propertytype;
                      uitem.country = $scope.message.info[0].updateitem[0].country;
                      uitem.city = $scope.message.info[0].updateitem[0].city;
                      uitem.postcode = $scope.message.info[0].updateitem[0].postcode;
                      uitem.street = $scope.message.info[0].updateitem[0].street;
                      uitem.phone = $scope.message.info[0].updateitem[0].phone;
                      uitem.email = $scope.message.info[0].updateitem[0].email;
                      uitem.authority_id = $scope.message.info[0].updateitem[0].authority_id;
                      var rid = aCtrl.items[4].contact[0].findIndex(x => x.id === $scope.itemU.id);
                      aCtrl.items[4].contact[0][rid] = uitem;
                      $scope.updateIndexContact = null;
                  }).error(function(data, status) {
                      $scope.message = data;
                  });
          };
          //**************** Project Add new record *********************//
          $scope.onProjectSelect = function(file, id) {
            if ($scope.author) {
              $scope.fProjects.author = $scope.author
            }
              $scope.message = "";
                  $scope.upload = Upload.upload({
                      url: 'php/uploadProject.php',
                      method: 'POST',
                      file: file,
                      data: {
                                'item': $scope.fProjects,
                                'authority_id': id
                            }
                  }).success(function(data, status, headers, config) {
                      $scope.message = data;
                      if ($scope.message.info[0].newitem[0].id) {
                        var newitem = {};
                        newitem.id = $scope.message.info[0].newitem[0].id;
                        newitem.title = $scope.message.info[0].newitem[0].title;
                        newitem.description = $scope.message.info[0].newitem[0].description;
                        newitem.url = $scope.message.info[0].newitem[0].url;
                        newitem.started = $scope.message.info[0].newitem[0].started;
                        newitem.finished = $scope.message.info[0].newitem[0].finished;
                        newitem.authority_id = $scope.message.info[0].newitem[0].authority_id;
                        newitem.image = $scope.message.info[0].newitem[0].image;
                        if ($scope.message.info[0].newitem[0].author) {
                          newitem.author = $scope.message.info[0].newitem[0].author.name;
                        }
                        aCtrl.items[1].projects[0][0].push(newitem);
                        $scope.AddNewProject = false;
                        $scope.fProjects = {};
                      }
                  }).error(function(data, status) {
                      $scope.message = data;
                  });
          };
          //**************** Project Update *********************//
          $scope.onProjectUpdate = function(file) {
              $scope.message = "";
              if ($scope.author) {
                $scope.itemU.author = $scope.author
              }
                  $scope.upload = Upload.upload({
                      url: 'php/updateProject.php',
                      method: 'POST',
                      file: file,
                      data: {
                                'item': $scope.itemU
                            }
                  }).success(function(data, status, headers, config) {
                      $scope.message = data;
                      var uitem = {};
                      uitem.id = $scope.message.info[0].updateitem[0].id;
                      uitem.title = $scope.message.info[0].updateitem[0].title;
                      uitem.description = $scope.message.info[0].updateitem[0].description;
                      uitem.url = $scope.message.info[0].updateitem[0].url;
                      if (file) {
                        $scope.itemU.image = $scope.message.info[0].updateitem[0].image;
                      }
                      uitem.image = $scope.message.info[0].updateitem[0].image;
                      uitem.started = $scope.message.info[0].updateitem[0].started;
                      uitem.finished = $scope.message.info[0].updateitem[0].finished;
                      uitem.authority_id = $scope.message.info[0].updateitem[0].authority_id;
                      var rid = aCtrl.items[1].projects[0][0].findIndex(x => x.id === $scope.itemU.id);
                      aCtrl.items[1].projects[0][0][rid] = uitem;
                      $scope.updateIndexProject = null
                      $scope.disabledTM = {};
                      $scope.author = [];
                  }).error(function(data, status) {
                      $scope.message = data;
                  });
          };
          //************************************************//
          $scope.DeleteProject = function(aid, id) {
            $http({
                  method  : 'POST',
                  url     : 'php/DeleteProject.php',
                  data    : {aid: aid, id: id},
                  headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                   })
                .then(function(response) {
                    var rid = aCtrl.items[1].projects[0][0].findIndex(x => x.id === id);
                    aCtrl.items[1].projects[0][0].splice(rid, 1);
                    return response.data.info;
                });
          };
          // **************** GetUpdateProject *********************//
          $scope.UpdateProject = function (aid, id, sid) {
            $scope.message = "";
            $scope.updateIndexProject = sid;
            $http({
                  method  : 'POST',
                  url     : 'php/getUpdateProject.php',
                  data    : {ida: aid, id: id},
                  headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                   })
                .then(function(response) {
                    $scope.itemU = response.data[0];
                    if ($scope.itemU.author) {
                      angular.forEach($scope.itemU.author, function(value, key){
                        $scope.disabledTM[$scope.itemU.author[key].team_id] = true;
                      });
                    }
                    $scope.fProjects.authors = $scope.itemU.team;
                    return response.data;
                });
              }
              //**************** Project Add new record *********************//
              $scope.onPaperSelect = function(file, id) {
                  $scope.message = "";
                      $scope.upload = Upload.upload({
                          url: 'php/uploadPaper.php',
                          method: 'POST',
                          file: file,
                          data: {
                                    'authority_id': id,
                                    'item': $scope.fPapers
                                }
                      }).success(function(data, status, headers, config) {
                          $scope.message = data;
                          if ($scope.message.info[0].newitem[0].id) {
                            var newitem = {};
                            newitem.id = $scope.message.info[0].newitem[0].id;
                            newitem.title = $scope.message.info[0].newitem[0].title;
                            newitem.url = $scope.message.info[0].newitem[0].url;
                            newitem.description = $scope.message.info[0].newitem[0].description;
                            newitem.authority_id = $scope.message.info[0].newitem[0].authority_id;
                            newitem.image = $scope.message.info[0].newitem[0].image;
                            aCtrl.items[2].papers[0][0].push(newitem);
                            $scope.AddNewPaper = false;
                            $scope.fPapers = {};
                          }
                      }).error(function(data, status) {
                          $scope.message = data;
                      });
              };
              //**************** Project Update *********************//
              $scope.onPaperUpdate = function(file) {
                  $scope.message = "";
                  if ($scope.author) {
                    $scope.itemU.author = $scope.author
                  }
                      $scope.upload = Upload.upload({
                          url: 'php/updatePaper.php',
                          method: 'POST',
                          file: file,
                          data: {
                                    'item': $scope.itemU
                                }
                      }).success(function(data, status, headers, config) {
                          $scope.message = data;
                          var uitem = {};
                          uitem.title = $scope.message.info[0].updateitem[0].title;
                          uitem.description = $scope.message.info[0].updateitem[0].description;
                          uitem.url = $scope.message.info[0].updateitem[0].url;
                          if (file) {
                            $scope.itemU.image = $scope.message.info[0].updateitem[0].image;
                          }
                          uitem.image = $scope.message.info[0].updateitem[0].image;
                          uitem.id = $scope.message.info[0].updateitem[0].id;
                          uitem.authority_id = $scope.message.info[0].updateitem[0].authority_id;
                          var rid = aCtrl.items[2].papers[0][0].findIndex(x => x.id === $scope.itemU.id);
                          aCtrl.items[2].papers[0][0][rid] = uitem;
                          $scope.updateIndexPaper = null
                          $scope.disabledTM = {};
                          $scope.author = [];
                      }).error(function(data, status) {
                          $scope.message = data;
                      });
              };
              //************************************************//
              $scope.DeletePaper = function(aid, id) {
                $http({
                      method  : 'POST',
                      url     : 'php/DeletePaper.php',
                      data    : {aid: aid, id: id},
                      headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                       })
                    .then(function(response) {
                      var rid = aCtrl.items[2].papers[0][0].findIndex(x => x.id === id);
                      aCtrl.items[2].papers[0][0].splice(rid, 1);
                      return response.data.info;
                    });
              };
              // **************** GetUpdatePaper *********************//
              $scope.UpdatePaper = function (aid, id, sid) {
                $scope.message = "";
                $scope.updateIndexPaper = sid;
                $http({
                      method  : 'POST',
                      url     : 'php/getUpdatePaper.php',
                      data    : {ida: aid, id: id},
                      headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                       })
                    .then(function(response) {
                        $scope.itemU = response.data[0];
                        if ($scope.itemU.author) {
                          angular.forEach($scope.itemU.author, function(value, key){
                            $scope.disabledTM[$scope.itemU.author[key].team_id] = true;
                          });
                        }
                        $scope.fPapers.authors = $scope.itemU.team;
                        return response.data;
                    });
                  }
                  //**************** Team Add new record *********************//
                  $scope.onTeamSelect = function(file) {
                      $scope.message = "";
                          $scope.upload = Upload.upload({
                              url: 'php/uploadTeam.php',
                              method: 'POST',
                              file: file,
                              data: {
                                        'item': $scope.fTeams
                                    }
                          }).success(function(data, status, headers, config) {
                              $scope.message = data;
                              if ($scope.message.info[0].newitem[0].id) {
                                var newitem = {};
                                newitem.id = $scope.message.info[0].newitem[0].id;
                                newitem.authority_id = $scope.message.info[0].newitem[0].authority_id;
                                newitem.title = $scope.message.info[0].newitem[0].title;
                                newitem.name = $scope.message.info[0].newitem[0].name;
                                newitem.surname = $scope.message.info[0].newitem[0].surname;
                                newitem.about = $scope.message.info[0].newitem[0].about;
                                newitem.position = $scope.message.info[0].newitem[0].position;
                                newitem.dob = $scope.message.info[0].newitem[0].dob;
                                newitem.sex = $scope.message.info[0].newitem[0].genders.model;
                                newitem.image = $scope.message.info[0].newitem[0].filename;
                                aCtrl.items[3].teams[0][0].push(newitem);
                                $scope.AddNewTeam = false;
                                $scope.fTeams = {};
                              }
                          }).error(function(data, status) {
                              $scope.message = data;
                          });
                  };
                  //************************************************//
                  $scope.DeleteTeam = function(aid, id) {
                    $http({
                          method  : 'POST',
                          url     : 'php/DeleteTeam.php',
                          data    : {aid: aid, id: id},
                          headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                           })
                        .then(function(response) {
                            var rid = aCtrl.items[3].teams[0][0].findIndex(x => x.id === id);
                            aCtrl.items[3].teams[0][0].splice(rid, 1);
                            return response.data.info;
                        });
                  };
                  $scope.UpdateTeam = function (aid, id, sid) {
                    $scope.message = "";
                    $scope.updateIndexTeam = sid;
                    $http({
                          method  : 'POST',
                          url     : 'php/getUpdateTeam.php',
                          data    : {ida: aid, id: id},
                          headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                           })
                        .then(function(response) {
                            $scope.itemU = response.data[0];
                            $scope.fTeams.genders.model = $scope.itemU.sex;
                            return response.data[0];
                        });
                      }
                    //**************** Team Update *********************//
                    $scope.onTeamUpdate = function(file) {
                      if ($scope.fTeams.genders.model != null) {
                        $scope.itemU.sex = $scope.fTeams.genders.model;
                      }
                        $scope.message = "";
                            $scope.upload = Upload.upload({
                                url: 'php/updateTeam.php',
                                method: 'POST',
                                file: file,
                                data: {
                                          'item': $scope.itemU
                                      }
                            }).success(function(data, status, headers, config) {
                                $scope.uadata = data;
                                $scope.updateIndex = null;
                                var uitem = {};
                                uitem.id = $scope.uadata.info[0].updateitem[0].id;
                                uitem.authority_id = $scope.uadata.info[0].updateitem[0].authority_id;
                                uitem.title = $scope.uadata.info[0].updateitem[0].title;
                                uitem.name = $scope.uadata.info[0].updateitem[0].name;
                                uitem.surname = $scope.uadata.info[0].updateitem[0].surname;
                                uitem.about = $scope.uadata.info[0].updateitem[0].about;
                                uitem.position = $scope.uadata.info[0].updateitem[0].position;
                                uitem.dob = $scope.uadata.info[0].updateitem[0].dob;
                                uitem.sex = $scope.uadata.info[0].updateitem[0].sex;
                              if (file) {
                                $scope.itemU.image = $scope.uadata.info[0].updateitem[0].image;
                              }
                                uitem.image = $scope.uadata.info[0].updateitem[0].image;
                                var rid = aCtrl.items[3].teams[0][0].findIndex(x => x.id === uitem.id);
                                aCtrl.items[3].teams[0][0][rid] = uitem;
                                $scope.updateIndexTeam = null
                            }).error(function(data, status) {
                                $scope.message.info[1].message = data;
                            });
                    };
          //**************** TeamContact Add new record *********************//
          $scope.onTeamcontactSelect = function(id, aid) {
              $scope.message = "";
                  $scope.upload = Upload.upload({
                      url: 'php/uploadTeamcontact.php',
                      method: 'POST',
                      data: {
                                'item': $scope.fTeamcontact,
                                'id' : id,
                                'aid': aid
                            }
                  }).success(function(data, status, headers, config) {
                      $scope.message = data;
                      if ($scope.message.info[0].newitem[0].id) {
                        var newitem = {};
                        var contact = [{}];
                        newitem.contact_id = $scope.message.info[0].newitem[0].id;
                        newitem.propertytype = $scope.message.info[0].newitem[0].propertytype;
                        newitem.country = $scope.message.info[0].newitem[0].country;
                        newitem.city = $scope.message.info[0].newitem[0].city;
                        newitem.postcode = $scope.message.info[0].newitem[0].postcode;
                        newitem.street = $scope.message.info[0].newitem[0].street;
                        newitem.phone = $scope.message.info[0].newitem[0].phone;
                        newitem.email = $scope.message.info[0].newitem[0].email;
                        newitem.team_id = $scope.message.info[0].newitem[0].authority_id;
                        newitem.authority_id = $scope.message.info[0].newitem[0].authority_id;
                        var rid1 = aCtrl.items[3].teams[0][0].findIndex(x => x.id === id);
                        aCtrl.items[3].teams[0][0][rid1].contact = [];
                        aCtrl.items[3].teams[0][0][rid1].contact.push(newitem);
                        $scope.AddNewTeamcontact = false;
                        $scope.fTeamcontact = {};
                        $scope.updateIndexTeamcontact = null
                      }
                  }).error(function(data, status) {
                      $scope.message = data;
                  });
          };
          //************************************************//
          $scope.DeleteTeamcontact = function(aid, id) {
            $http({
                  method  : 'POST',
                  url     : 'php/DeleteTeamcontact.php',
                  data    : {aid: aid, id: id},
                  headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                   })
                .then(function(response) {
                    var rid1 = aCtrl.items[3].teams[0][0].findIndex(x => x.id === aid);
                    var rid = aCtrl.items[3].teams[0][0][rid1].contact.findIndex(x => x.id === id);
                    aCtrl.items[3].teams[0][0][rid1].contact.splice(rid, 1);
                    if (aCtrl.items[3].teams[0][0][rid1].contact.length===0) {
                      $scope.AddNewTeamcontact = true;
                    }
                    return response.data.info;
                });
          };
          $scope.UpdateTeamcontact = function (aid, id, sid) {
            $scope.message = "";
            $scope.updateIndexTeamcontact = sid;
            $http({
                  method  : 'POST',
                  url     : 'php/getUpdateTeamcontact.php',
                  data    : {ida: aid, id: id},
                  headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                   })
                .then(function(response) {
                    $scope.itemU = response.data[0];
                    return response.data[0];
                });
              }
            //**************** Team Update *********************//
            $scope.onTeamcontactUpdate = function() {
                $scope.message = "";
                    $scope.upload = Upload.upload({
                        url: 'php/updateTeamcontact.php',
                        method: 'POST',
                        data: {
                                  'item': $scope.itemU
                              }
                    }).success(function(data, status, headers, config) {
                        $scope.message = data;
                        $scope.updateIndex = null;
                        var uitem = {};
                        uitem.id = $scope.message.info[0].updateitem[0].id;
                        uitem.propertytype = $scope.message.info[0].updateitem[0].propertytype;
                        uitem.country = $scope.message.info[0].updateitem[0].country;
                        uitem.city = $scope.message.info[0].updateitem[0].city;
                        uitem.postcode = $scope.message.info[0].updateitem[0].postcode;
                        uitem.street = $scope.message.info[0].updateitem[0].street;
                        uitem.phone = $scope.message.info[0].updateitem[0].phone;
                        uitem.email = $scope.message.info[0].updateitem[0].email;
                        uitem.authority_id = $scope.message.info[0].updateitem[0].authority_id;
                        uitem.team_id = $scope.message.info[0].updateitem[0].team_id;
                        var rid1 = aCtrl.items[3].teams[0][0].findIndex(x => x.id === uitem.team_id);
                        var rid = aCtrl.items[3].teams[0][0][rid1].contact.findIndex(x => x.id === uitem.id);
                        aCtrl.items[3].teams[0][0][rid1].contact[rid] = uitem;
                        $scope.updateIndexTeamcontact = null
                    }).error(function(data, status) {
                        $scope.message.info[1].message = data;
                    });
            };
  //************************************************//
        $scope.AddItem = function() {
          $scope.AddNewRecord = true;
        }

        $scope.CloseAdd = function() {
          $scope.AddNewRecord = false;
        }

        $scope.CancelUpdate = function(id) {
          $scope.updateIndexItem = null;
          $scope.itemU.authority_id = id;
          if ($scope.uadata && $scope.uadata.info[1].message) {
            $scope.uadata.info[1].message = "";
          } else if ($scope.uadata && !$scope.uadata.info) {
            $scope.uadata = "";
          }
        }
        //************************************************//
        $scope.AddProject = function(id) {
          $scope.AddNewProject = true;
          $scope.fProjects.id = id;
          $scope.disabledTM = {};
          $scope.author = [];
          $scope.fProjects.authors = aCtrl.items[3].teams[0];
        }
        $scope.CloseAddProject = function() {
          $scope.AddNewProject = false;
          $scope.author = [];
        }

        $scope.CancelUpdateProject = function(aid, id) {
          $scope.updateIndexProject = null;
          $scope.itemU.id = id;
          $scope.itemU.authority_id = aid;
          $scope.disabledTM = {};
          $scope.author = [];
        }

        //************************************************//
        $scope.AddPaper = function(id) {
          $scope.AddNewPaper = true;
          $scope.fPapers.id = id;
          $scope.disabledTM = {};
          $scope.author = [];
          $scope.fProjects.authors = aCtrl.items[3].teams[0];
        }

        $scope.CloseAddPaper = function() {
          $scope.AddNewPaper = false;
          $scope.author = [];
        }

        $scope.CancelUpdatePaper = function(aid, id) {
          $scope.updateIndexPaper = null;
          $scope.itemU.id = id;
          $scope.itemU.authority_id = aid;
          $scope.disabledTM = {};
          $scope.author = [];
        }
        //************************************************//

        $scope.AddTeam = function(id) {
          $scope.AddNewTeam = true;
          $scope.fTeams.id = id;
        }

        $scope.CloseAddTeam = function() {
          $scope.AddNewTeam = false;
        }

        $scope.CancelUpdateTeam = function(aid, id) {
          $scope.updateIndexTeam = null;
          $scope.itemU.id = id;
          $scope.itemU.authority_id = aid;

        }
        //************************************************//
        $scope.AddTeamContact = function(aid, id, sid) {
          $scope.AddNewTeamcontact = true;
          $scope.updateIndexTeamcontact = sid;
          $scope.fTeamcontact.id = id;
        }

        $scope.CloseAddTeamcontact = function() {
          $scope.AddNewTeamcontact = false;
          $scope.updateIndexTeamcontact = null;
        }

        $scope.CancelUpdateTeamcontact = function(id) {
          $scope.updateIndexTeamcontact = null;
          $scope.itemU.id = id;
        }

        //************************************************//

        $scope.AddContact = function(id) {
          $scope.AddNewContact = true;
          $scope.fContact.id = id;
        }

        $scope.CloseAddContact = function() {
          $scope.AddNewContact = false;
        }

        $scope.CancelUpdateContact = function(aid, id) {
          $scope.updateIndexContact = null;
          $scope.itemU.id = id;
          $scope.itemU.authority_id = aid;

        }

        //************************************************//
        $scope.addTM = function(model) {
            var rid = aCtrl.items[3].teams[0][0].findIndex(x => x.id === model);
            var rid1 = $scope.author.findIndex(x => x.id === model);
            if (rid>=0 && rid1<0) {
              $scope.disabledTM[aCtrl.items[3].teams[0][0][rid].id] = true;
              var valueToPush = {};
              valueToPush.id = aCtrl.items[3].teams[0][0][rid].id;
              valueToPush.name = aCtrl.items[3].teams[0][0][rid].titlet+" "
              + aCtrl.items[3].teams[0][0][rid].name+" "
              + aCtrl.items[3].teams[0][0][rid].surname;
              $scope.author.push(valueToPush);
            }
          }

        $scope.DeleteTM = function(model, pid, crudtype) {
          switch (crudtype) {
            case "add":
            var rid = $scope.author.name.findIndex(x => x.id === model);
            $scope.disabledTM[$scope.author.name[rid].title+$scope.author.name[rid].name+$scope.author.name[rid].surname] = false;
              break;
            case "update":
            var rid = $scope.author.findIndex(x => x.id === model);
            if ($scope.fProjects.authors) {
              var rid1 = $scope.fProjects.authors.findIndex(x => x.id === model);
            } else if ($scope.fPapers.authors) {
              var rid1 = $scope.fPapers.authors.findIndex(x => x.id === model);
            }
            $scope.disabledTM[$scope.author[rid].id] = false;
            $scope.author.splice(rid,1);
                break;
            case "updater":
            $scope.upload = Upload.upload({
                url: 'php/DeleteTeamMemeber.php',
                method: 'POST',
                data: {
                        projectid: pid,
                        teamid: model
                      }
            }).success(function(data, status, headers, config) {
              var rid = $scope.itemU.author.findIndex(x => x.team_id === model);
              $scope.disabledTM[$scope.itemU.author[rid].team_id] = false;
              $scope.itemU.author.splice(rid,1);
            }).error(function(data, status) {
                $scope.message.info[1].message = data;
            });
                break;
            default:
          }
        }


        $scope.addSI = function (itemid, nameofdb) {
          var rid = aCtrl.items[6].slide[0].findIndex(x => x.id === itemid);
          if (rid>=0 || itemid.id === null || !itemid) {
            return;
          }
          $http({
                method  : 'POST',
                url     : 'php/uploadSlideMemeber.php',
                data: {itemid: itemid, nofdb : nameofdb},
                headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                 })
              .then(function(response) {
                aCtrl.items[6].slide[0].push(response.data.info[0].newitem[0]);
                var rid = aCtrl.items[6].slide[0].findIndex(x => x.id === itemid);
                $scope.disabledSI[aCtrl.items[6].slide[0][rid].id+aCtrl.items[6].slide[0][rid].title] = true;
              }, function(response) {
                 $scope.message.info[1].message = response.data;
            });
            }

      $scope.DeleteSI = function(itemid, nameofdb) {
          $http({
              url: 'php/deleteSlideMemeber.php',
              method: 'POST',
              data: {itemid: itemid, nofdb : nameofdb},
              headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
          }).then(function(response) {
            var rid = aCtrl.items[6].slide[0].findIndex(x => x.id === itemid);
            $scope.disabledSI[aCtrl.items[6].slide[0][rid].id+aCtrl.items[6].slide[0][rid].title] = false;
            aCtrl.items[6].slide[0].splice(rid,1);
          }, function(response) {
             $scope.message.info[1].message = response.data;
          });
        }

        $scope.uCanTrust = function(string){
          return $sce.trustAsHtml(string);
        }

    };
    //************************************************//
    function AdminAddDirective () {
      return {
        templateUrl: 'src/template/admin-add.html'
        }
      }
    function AdminUpdateDirective () {
      return {
        templateUrl: 'src/template/admin-update.html'
                }
      }
      function ContactAddDirective () {
        return {
          templateUrl: 'src/template/contact-add.html'
          }
        }
      function ContactUpdateDirective () {
        return {
          templateUrl: 'src/template/contact-update.html'
                  }
        }
      function ProjectAddDirective () {
        return {
          templateUrl: 'src/template/project-add.html'
          }
        }
      function ProjectUpdateDirective () {
        return {
          templateUrl: 'src/template/project-update.html'
          }
        }
        function PaperAddDirective () {
          return {
            templateUrl: 'src/template/paper-add.html'
            }
          }
        function PaperUpdateDirective () {
          return {
            templateUrl: 'src/template/paper-update.html'
                    }
          }
          function TeamAddDirective () {
            return {
              templateUrl: 'src/template/team-add.html'
              }
            }
          function TeamUpdateDirective () {
            return {
              templateUrl: 'src/template/team-update.html'
                      }
            }
            function TeamcontactAddDirective () {
              return {
                templateUrl: 'src/template/teamcontact-add.html'
                }
              }
            function TeamcontactUpdateDirective () {
              return {
                templateUrl: 'src/template/teamcontact-update.html'
                        }
              }
})();

(function () {
  'use strict';
  angular.module('GJApp')
  .component('items', {
    templateUrl: 'src/template/project.template.html',
    bindings: {
      items: '<'
        }
  });
})();

(function () {
  'use strict';
  angular.module('GJApp')
  .controller('ProjectController', ProjectController);
  ProjectController.$inject = ['items', '$stateParams', '$scope', '$http', '$sce', 'Upload'];

  function ProjectController(items, $stateParams, $scope, $http, $sce, Upload) {
    var projectCtrl = this;
    projectCtrl.items = items;
    if (projectCtrl.items[5].isIn === false) {
      $scope.showComment = false;
    } else {
      $scope.showComment = true;
    }
    projectCtrl.newcomment = "";

    if (projectCtrl.items[7].comment[0]) {
      $scope.comments = projectCtrl.items[7].comment[0];
    }

    window.scrollTo(0, 0);

    //************Add Comment  *****************************//
    $scope.addComment = function (db, aid, id, text) {
      $scope.upload = Upload.upload({
          url: 'php/addComment.php',
          method: 'POST',
          data: {comment: text, authority_id: aid, idofdb: id, nameofdb : db}
      }).success(function(data, status, headers, config) {
          $scope.message = data;
          if (projectCtrl.items[7].comment[0]) {
            projectCtrl.items[7].comment[0].push($scope.message.info[0].newitem[0]);
          } else {
            projectCtrl.items[7].comment.push($scope.message.info[0].newitem[0]);
          }
          projectCtrl.newcomment = "";
      }).error(function(data, status) {
          $scope.message = data;
      });
      }

      $scope.updateComment = function (db, aid, id, text) {
        $scope.upload = Upload.upload({
            url: 'php/updateComment.php',
            method: 'POST',
            data: {comment: text, authority_id: aid, idofdb: id, nameofdb : db}
        }).success(function(data, status, headers, config) {
            $scope.message = data;
            projectCtrl.newcomment = "";
        }).error(function(data, status) {
            $scope.message = data;
        });

        }

        $scope.deleteComment = function(db, aid, id) {
          $http({
            url: 'php/deleteComment.php',
            method: 'POST',
            data: {id: id, aid: aid, db : db},
            headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
          }).then(function(response) {
            var rid = projectCtrl.items[7].comment[0].findIndex(x => x.id === id);
            projectCtrl.items[7].comment[0].splice(rid,1);
          }, function(response) {
            $scope.message.info[1].message = response.data;
          });
        }

        $scope.uCanTrust = function(string, uid, id) {
            return $sce.trustAsHtml(string);
        }

        $scope.iseditable = function(uid, id) {
            if (uid==id) {
                $scope.editable = true;
            } else {
              $scope.editable = false;
            }
        }


      }

})();

(function () {
  'use strict';
  angular.module('GJApp')
  .component('items', {
    templateUrl: 'src/template/paper.template.html',
    bindings: {
      items: '<'
        }
  });
})();

(function () {
  'use strict';
  angular.module('GJApp')
  .controller('PaperController', PaperController);
  PaperController.$inject = ['items', '$stateParams', '$scope', '$sce', 'Upload', '$http'];
  function PaperController(items, $stateParams, $scope, $sce, Upload, $http) {
    var paperCtrl = this;
    paperCtrl.items = items;
    if (paperCtrl.items[5].isIn === false) {
      $scope.showComment = false;
    } else {
      $scope.showComment = true;
    }
    paperCtrl.newcomment = "";

    if (paperCtrl.items[7].comment[0]) {
      $scope.comments = paperCtrl.items[7].comment[0];
    }    window.scrollTo(0, 0);
    $scope.uCanTrust = function(string){
      return $sce.trustAsHtml(string);
    }

    //************Add Comment  *****************************//
    $scope.addComment = function (db, aid, id, text) {
      $scope.upload = Upload.upload({
          url: 'php/addComment.php',
          method: 'POST',
          data: {comment: text, authority_id: aid, idofdb: id, nameofdb : db}
      }).success(function(data, status, headers, config) {
          $scope.message = data;
          if (paperCtrl.items[7].comment[0]) {
            paperCtrl.items[7].comment[0].push($scope.message.info[0].newitem[0]);
          } else {
            paperCtrl.items[7].comment.push($scope.message.info[0].newitem[0]);
          }
          paperCtrl.newcomment = "";
      }).error(function(data, status) {
          $scope.message = data;
      });
      }

      $scope.updateComment = function (db, aid, id, text) {
        $scope.upload = Upload.upload({
            url: 'php/updateComment.php',
            method: 'POST',
            data: {comment: text, authority_id: aid, idofdb: id, nameofdb : db}
        }).success(function(data, status, headers, config) {
            $scope.message = data;
            paperCtrl.newcomment = "";
        }).error(function(data, status) {
            $scope.message = data;
        });

        }

        $scope.deleteComment = function(db, aid, id) {
          $http({
            url: 'php/deleteComment.php',
            method: 'POST',
            data: {id: id, aid: aid, db : db},
            headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
          }).then(function(response) {
            var rid = paperCtrl.items[7].comment[0].findIndex(x => x.id === id);
            paperCtrl.items[7].comment[0].splice(rid,1);
          }, function(response) {
            $scope.message.info[1].message = response.data;
          });
        }

        $scope.uCanTrust = function(string, uid, id) {
            return $sce.trustAsHtml(string);
        }

        $scope.iseditable = function(uid, id) {
            if (uid==id) {
                $scope.editable = true;
            } else {
              $scope.editable = false;
            }
        }



    };
})();

(function () {
  'use strict';
  angular.module('GJApp')
  .component('items', {
    templateUrl: 'src/template/team.template.html',
    bindings: {
      items: '<'
        }
  });
})();

(function () {
  'use strict';
  angular.module('GJApp')
  .controller('TeamController', TeamController);
  TeamController.$inject = ['items', '$stateParams', '$scope', 'FData'];
  function TeamController(items, $stateParams, $scope, FData) {
    var teamCtrl = this;
    teamCtrl.items = items;
    $scope.fD = FData;
    window.scrollTo(0, 0);
    };
})();

(function () {
  'use strict';
  angular.module('GJApp')
  .component('items', {
    templateUrl: 'src/template/search.template.html',
    bindings: {
      items: '<'
        }
  });
})();

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

(function () {
'use strict';
angular.module('GJApp')
.config(RoutesConfig);
RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  var home = {
    name: 'home',
    url: '/',
        views: {
          'content@': {
            templateUrl: 'src/template/home.template.html',
            controller: 'HomeController as hCtrl',
              resolve: {
                isloggedin: function (DataService) {
                  return DataService.isLoggedIn('home');
                  }
              }
          },
          'navbar@': {
            templateUrl: 'src/template/navbar.template.html',
            controller: 'NavbarController as nCtrl',
              resolve: {
                isloggedin: function (DataService) {
                  return DataService.isLoggedIn('home');
                  }
              }
          },
        }
    }

    var search = {
      name: 'search',
      url:'search/{item}',
      parent: 'home',
      views: {
          'content@': {
            templateUrl: 'src/template/search.template.html',
            controller: 'SearchController as chCtrl',
            resolve: {
              items: function (DataService, $stateParams) {
                console.log($stateParams);
                return DataService.searchItem($stateParams.item);
              }
      }
     }
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
            items: function (DataService) {
              return DataService.getItems('projects');
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
            items: function (DataService) {
              return DataService.getItems('papers');
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
            items: function (DataService) {
              return DataService.getItems('teams');
            }
      }
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
    parent: 'home',
    url: 'admin',
    views: {
         'content@': {
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

  var project = {
    name: 'project',
    parent: 'home',
    params: { id: null },
    views: {
         'content@': {
          templateUrl: 'src/template/project.template.html',
          controller: 'ProjectController as psCtrl',
        }
      },
      resolve: {
        items: function (DataService, $stateParams) {
          return DataService.getItems('projects', $stateParams.id);
        }
      }
  }

  var paper = {
    name: 'paper',
    parent: 'home',
    params: { id: null },
    views: {
         'content@': {
          templateUrl: 'src/template/paper.template.html',
          controller: 'PaperController as rsCtrl',
        }
      },
      resolve: {
        items: function (DataService, $stateParams) {
          return DataService.getItems('papers', $stateParams.id);
        }
      }
  }

  var team = {
    name: 'team',
    parent: 'home',
    params: { id: null },
    views: {
         'content@': {
          templateUrl: 'src/template/team.template.html',
          controller: 'TeamController as tsCtrl',
        }
      },
      resolve: {
        items: function (DataService, $stateParams) {
          return DataService.getItems('teams', $stateParams.id);
        }
      }
  }
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state(home)
  .state(search)
  .state(projects)
  .state(papers)
  .state(teams)
  .state(emailconfirmed)
  .state(passwordconfirmed)
  .state(admin)
  .state(project)
  .state(paper)
  .state(team)
 }
})();

(function () {
  'use strict';
  angular.module('GJApp')
  .controller('NavbarController', NavbarController)
  .directive('sessionLogin', SessionLoginDirective)
  .directive('sessionRegister', SessionRegisterDirective)
  .directive('forgottenPassword', ForgottenPassordDirective);
  NavbarController.$inject = ['$state', '$http', '$scope', 'isloggedin', '$uibModal', '$log'];
    function NavbarController($state, $http, $scope, isloggedin, $uibModal, $log) {
        var nCtrl = this;
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
          // nCtrl.data = false;
        } else {
          $scope.showLogin = false;
          $scope.showRegister = false;
          // nCtrl.data = true;
        }
        $scope.showLoginForm = false;
        $scope.loginWarning = "";
        $scope.searchstring = "";
        //********** searching ****************//
        nCtrl.searching = function () {
          return $scope.searchstring;

        }
        //****************** MODAL ****************//
          nCtrl.open = function () {
            var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'src/template/myModalContent.html',
              controller: 'ModalInstanceController',
              controllerAs: 'mCtrl',
              resolve: {
                data: function () {
                  return {
                    Role: "Admin"
                  };
                }
              }
            });
            modalInstance.result.then(function (data) {
              if (data) {
                $scope.hasRoleAdmin = true;
                $scope.showLogin = true;
              } else {
                $scope.showLogin = false;
                $scope.hasRoleAdmin = false;
              }
            });
          };
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
                    $state.go('home');
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
            if ($scope.showLoginForm) {
              $scope.loginWarning = "";
              $scope.showLoginForm = false;
              $scope.showPasswordForm = false;
              $scope.showPasswordChange = false;
            }
          };
          $scope.closeregisterForm = function() {
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

(function () {
  'use strict';
  angular.module('GJApp')
  .controller('TinyMceController', TinyMceController);
  TinyMceController.$inject = ['$scope', '$sce'];
  function TinyMceController($scope, $sce) {
    var ctrl = this;
    $scope.tinymceModel = 'Initial content';
    $scope.tinymceOptions = {
      theme: 'modern',
      toolbar_items_size: 'small',
      plugins: ['link', 'image', 'code'],
      menubar: 'insert tools',
      toolbar: 'undo redo | link | bold italic | alignleft aligncenter alignright | code'
  };
  this.updateHtml = function () {
    ctrl.tinymceHtml = $sce.trustAsHtml(ctrl.tinymce);
  }
};
})();
