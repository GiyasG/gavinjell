(function () {
  'use strict';

  angular.module('ShopApp')
  .controller('AdminController', AdminController)
  .directive('adminAdd', AdminAddDirective)
  .directive('adminUpdate', AdminUpdateDirective)
  .directive('projectAdd', ProjectAddDirective)
  .directive('projectUpdate', ProjectUpdateDirective)
  .directive('paperAdd', PaperAddDirective)
  .directive('paperUpdate', PaperUpdateDirective);


  AdminController.$inject = ['$scope', '$http', 'Upload', 'items'];

    function AdminController($scope, $http, Upload, items) {

        var aCtrl = this;
        aCtrl.items = items;
        $scope.updateIndexItem = null;
        $scope.updateIndexProject = null;
        $scope.updateIndexPaper = null;
        $scope.AddNewRecord = false;
        $scope.AddNewProject = false;
        $scope.AddNewPaper = false;
        $scope.hasRoleAdmin = aCtrl.items[3].AdminIsIn;
        console.log($scope.hasRoleAdmin);

        //**************** Data for Dbase Upload ********************//
          $scope.itemU = {};
          $scope.fElements = {};
          $scope.fElements.genders = {
            model: null,
            sex: ["male","female"]
         };
         $scope.fProjects = {};

          // console.log(aCtrl.items[0].all.length);
          // console.log(aCtrl.items[0].all);
          // console.log($scope.fElements.genders.sex);
        //**********************************************************//
        //**************** Authoriyu Add new record *********************//
        $scope.onFileSelect = function(file) {
          // console.log(file);
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
                      newitem.filename = $scope.message.info[0].newitem[0].filename;

                      aCtrl.items[0].all.push(newitem);

                      console.log($scope.message.info[0].newitem[0].id);
                      $scope.AddNewRecord = false;
                      $scope.fElements = {};
                    }
                }).error(function(data, status) {
                    $scope.message = data;
                });
        };

        //************************************************//
        $scope.DeleteItem = function(id) {
            console.log("id is: "+id);
          $http({
                method  : 'POST',
                url     : 'php/DeleteItem.php',
                data    : {id: id},
                headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                 })
              .then(function(response) {
                  console.log(response.data.info);
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
                  $scope.itemU = response.data.item[0];
                  console.log($scope.itemU);
                  return response.data.item;
              });
            }


          //**************** File Update *********************//
          $scope.onFileUpdate = function(file) {

            // console.log(file);
              $scope.message = "";
                  $scope.upload = Upload.upload({
                      url: 'php/update.php',
                      method: 'POST',
                      file: file,
                      data: {
                                'item': $scope.itemU
                            }
                  }).success(function(data, status, headers, config) {
                      $scope.message = data;
                      $scope.updateIndex = null;
                      console.log($scope.message);

                      var uitem = {};
                      uitem.name = $scope.message.info[0].updateitem[0].name;
                      uitem.description = $scope.message.info[0].updateitem[0].description;
                      uitem.price = $scope.message.info[0].updateitem[0].price;
                      uitem.image = $scope.message.info[0].updateitem[0].image;
                      uitem.id = $scope.message.info[0].updateitem[0].id;

                      // console.log(newitem);
                      var rid = aCtrl.items[0].all.findIndex(x => x.id === $scope.itemU.id);
                      aCtrl.items[0].all[rid] = uitem;
                      console.log(aCtrl.items[0].all);
                      console.log(rid);

                      // aCtrl.items[0].all.push(updateitem);
                      // $scope.itemU = uitem;
                      // console.log($scope.itemU);


                  }).error(function(data, status) {
                      $scope.message = data;
                  });
          };

          //**************** Project Add new record *********************//
          $scope.onProjectSelect = function(file) {
            // console.log(file);
              $scope.message = "";
                  $scope.upload = Upload.upload({
                      url: 'php/uploadProject.php',
                      method: 'POST',
                      file: file,
                      data: {
                                'item': $scope.fProjects
                            }
                  }).success(function(data, status, headers, config) {
                      $scope.message = data;


                      if ($scope.message.info[0].newitem[0].id) {

                        var newitem = {};
                        newitem.id = $scope.message.info[0].newitem[0].id;
                        newitem.title = $scope.message.info[0].newitem[0].title;
                        newitem.name = $scope.message.info[0].newitem[0].description;
                        newitem.surname = $scope.message.info[0].newitem[0].url;
                        newitem.about = $scope.message.info[0].newitem[0].started;
                        newitem.position = $scope.message.info[0].newitem[0].finished;
                        newitem.dob = $scope.message.info[0].newitem[0].authority_id;

                        aCtrl.items[0].all.push(newitem);

                        console.log($scope.message.info[0].newitem[0].id);
                        $scope.AddNewProject = false;
                        $scope.fElements = {};
                      }
                  }).error(function(data, status) {
                      $scope.message = data;
                  });
          };

          //************************************************//
          $scope.DeleteProject = function(id) {
              console.log("id is: "+id);
            $http({
                  method  : 'POST',
                  url     : 'php/DeleteProject.php',
                  data    : {id: id},
                  headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                   })
                .then(function(response) {
                    console.log(response.data.info);
                    var rid = aCtrl.items[0].all.findIndex(x => x.id === id);
                    aCtrl.items[0].all.splice(rid, 1);
                    return response.data.info;
                });
          };

          $scope.UpdateProject = function (id, sid) {
            $scope.message = "";
            $scope.updateIndexProject = sid;
            $http({
                  method  : 'POST',
                  url     : 'php/getUpdateProject.php',
                  data    : {id: id},
                  headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                   })
                .then(function(response) {
                    $scope.itemU = response.data.item[0];
                    console.log($scope.itemU);
                    return response.data.item;
                });
              }

              //**************** Project Add new record *********************//
              $scope.onPaperSelect = function(file) {
                // console.log(file);
                  $scope.message = "";
                      $scope.upload = Upload.upload({
                          url: 'php/uploadPaper.php',
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
                            newitem.filename = $scope.message.info[0].newitem[0].filename;

                            aCtrl.items[0].all.push(newitem);

                            console.log($scope.message.info[0].newitem[0].id);
                            $scope.AddNewRecord = false;
                            $scope.fElements = {};
                          }
                      }).error(function(data, status) {
                          $scope.message = data;
                      });
              };

              //************************************************//
              $scope.DeletePaper = function(id) {
                  console.log("id is: "+id);
                $http({
                      method  : 'POST',
                      url     : 'php/DeletePaper.php',
                      data    : {id: id},
                      headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                       })
                    .then(function(response) {
                        console.log(response.data.info);
                        var rid = aCtrl.items[0].all.findIndex(x => x.id === id);
                        aCtrl.items[0].all.splice(rid, 1);
                        return response.data.info;
                    });
              };

              $scope.UpdatePaper = function (id, sid) {
                $scope.message = "";
                $scope.updateIndexPaper = sid;
                $http({
                      method  : 'POST',
                      url     : 'php/getUpdatePaper.php',
                      data    : {id: id},
                      headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                       })
                    .then(function(response) {
                        $scope.itemU = response.data.item[0];
                        console.log($scope.itemU);
                        return response.data.item;
                    });
                  }

          //************************************************//

        $scope.AddItem = function() {
          $scope.AddNewRecord = true;
        }

        $scope.CloseAdd = function() {
          $scope.AddNewRecord = false;
        }

        $scope.CancelUpdate = function() {
          $scope.updateIndexItem = null;
        }

        //************************************************//

        $scope.AddProject = function() {
          $scope.AddNewProject = true;
        }

        $scope.CloseAddProject = function() {
          $scope.AddNewProject = false;
        }

        $scope.CancelUpdateProject = function() {
          $scope.updateIndexProject = null;
        }

        //************************************************//

        $scope.AddPaper = function() {
          $scope.AddNewPaper = true;
        }

        $scope.CloseAddPaper = function() {
          $scope.AddNewPaper = false;
        }

        $scope.CancelUpdatePaper = function() {
          $scope.updateIndexPaper = null;
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
})();
