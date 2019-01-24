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


  AdminController.$inject = ['$scope', '$http', '$sce', 'Upload', 'items'];

    function AdminController($scope, $http, $sce, Upload, items) {

        var aCtrl = this;
        aCtrl.items = items;
        // aCtrl.items[0].all[0].about = $sce.trustAsHtml(aCtrl.items[0].all[0].about);
        $scope.updateIndexItem = null;
        $scope.updateIndexProject = null;
        $scope.updateIndexPaper = null;
        $scope.updateIndexTeam = null;
        $scope.AddNewRecord = false;
        $scope.AddNewProject = false;
        $scope.AddNewPaper = false;
        $scope.AddNewTeam = false;
        $scope.hasRoleAdmin = aCtrl.items[4].AdminIsIn;
        $scope.tinymceModel = "";
        // console.log($scope.tinymceModel);
        console.log($scope.hasRoleAdmin);

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

          // console.log(aCtrl.items[0].all.length);
          // console.log(aCtrl.items[0].all);
          // console.log($scope.fElements.genders.sex);
        //**********************************************************//
        //**************** Authority Add new record *********************//
        $scope.onFileSelect = function(file, abauth) {
          console.log(abauth);
          $scope.fElements.about = abauth;
          console.log($scope.fElements.about);
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
                console.log(response.data);
                  $scope.itemU = response.data[0];
                  $scope.fElements.genders.model = $scope.itemU.sex;
                  console.log($scope.itemU);
                  console.log($scope.fElements);
                  // $scope.tinymceData.about = response.data.item[0].about;

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
                      $scope.updateIndex = null;

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

                      console.log("aCtrl = "+aCtrl.items[0].all[0]);
                      var rid = aCtrl.items[0].all[0].findIndex(x => x.authority_id === uitem.authority_id);
                      console.log(rid);
                      aCtrl.items[0].all[0][rid] = uitem;
                      console.log(aCtrl.items[0].all[0]);
                      console.log($scope.itemU);

                  }).error(function(data, status) {
                      $scope.message.info[1].message = data;
                  });
          };

          //**************** Project Add new record *********************//
          $scope.onProjectSelect = function(file, id) {
            // console.log(file);
            console.log("Before:");
            console.log(aCtrl.items[1].projects);
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

                        aCtrl.items[1].projects.push(newitem);
                        console.log(aCtrl.items[1].projects);
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
                  $scope.upload = Upload.upload({
                      url: 'php/updateProject.php',
                      method: 'POST',
                      file: file,
                      data: {
                                'item': $scope.itemU
                            }
                  }).success(function(data, status, headers, config) {
                      $scope.message = data;
                      console.log($scope.message);

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

                      // console.log(newitem);
                      var rid = aCtrl.items[1].projects[0].findIndex(x => x.id === $scope.itemU.id);
                      aCtrl.items[1].projects[0][rid] = uitem;
                      console.log(aCtrl.items[1].projects[0]);
                      console.log(rid);
                      $scope.updateIndexProject = null

                  }).error(function(data, status) {
                      $scope.message = data;
                  });
          };
          //************************************************//
          $scope.DeleteProject = function(aid, id) {
              console.log("id is: "+id);
            $http({
                  method  : 'POST',
                  url     : 'php/DeleteProject.php',
                  data    : {aid: aid, id: id},
                  headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                   })
                .then(function(response) {
                    // console.log(response.data.info);
                    // console.log(aCtrl.items[1].projects);
                    var rid = aCtrl.items[1].projects[0][0].findIndex(x => x.id === id);
                    console.log(rid);
                    aCtrl.items[1].projects[0][0].splice(rid, 1);
                    return response.data.info;
                });
          };

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
                    console.log($scope.itemU);
                    return response.data;
                });
              }

              //**************** Project Add new record *********************//
              $scope.onPaperSelect = function(file, id) {
                // console.log(file);
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

                            aCtrl.items[2].papers.push(newitem);
                            console.log(aCtrl.items[2].papers);
                            $scope.AddNewPaper = false;
                            $scope.fPapers = {};
                          }
                      }).error(function(data, status) {
                          $scope.message = data;
                      });
              };

              //**************** Project Update *********************//
              $scope.onPaperUpdate = function(file) {

                // console.log(file);
                  $scope.message = "";
                      $scope.upload = Upload.upload({
                          url: 'php/updatePaper.php',
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
                          uitem.title = $scope.message.info[0].updateitem[0].title;
                          uitem.description = $scope.message.info[0].updateitem[0].description;
                          uitem.url = $scope.message.info[0].updateitem[0].url;
                          if (file) {
                            $scope.itemU.image = $scope.message.info[0].updateitem[0].image;
                          }
                          uitem.image = $scope.message.info[0].updateitem[0].image;
                          uitem.id = $scope.message.info[0].updateitem[0].id;
                          uitem.authority_id = $scope.message.info[0].updateitem[0].authority_id;

                          // console.log(newitem);
                          var rid = aCtrl.items[2].papers.findIndex(x => x.id === $scope.itemU.id);
                          aCtrl.items[2].papers[rid] = uitem;
                          console.log(aCtrl.items[2].papers);
                          console.log(rid);

                      }).error(function(data, status) {
                          $scope.message = data;
                      });
              };

              //************************************************//
              $scope.DeletePaper = function(aid, id) {
                  console.log("id is: "+id+" "+aid);
                $http({
                      method  : 'POST',
                      url     : 'php/DeletePaper.php',
                      data    : {aid: aid, id: id},
                      headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                       })
                    .then(function(response) {
                      // console.log(response.data.info);
                      // console.log(aCtrl.items[1].projects);
                      var rid = aCtrl.items[2].papers.findIndex(x => x.id === id);
                      // console.log(rid);
                      aCtrl.items[2].papers.splice(rid, 1);
                      return response.data.info;
                    });
              };

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
                        console.log($scope.itemU);
                        return response.data;
                    });
                  }

                  //**************** Team Add new record *********************//
                  $scope.onTeamSelect = function(file) {
                    console.log($scope.fElements.about);
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
                                newitem.title = $scope.message.info[0].newitem[0].title;
                                newitem.name = $scope.message.info[0].newitem[0].name;
                                newitem.surname = $scope.message.info[0].newitem[0].surname;
                                newitem.about = $scope.message.info[0].newitem[0].about;
                                newitem.position = $scope.message.info[0].newitem[0].position;
                                newitem.dob = $scope.message.info[0].newitem[0].dob;
                                newitem.sex = $scope.message.info[0].newitem[0].genders.model;
                                newitem.image = $scope.message.info[0].newitem[0].filename;

                                aCtrl.items[0].all.push(newitem);

                                console.log($scope.message.info[0].newitem[0].id);
                                $scope.AddNewTeam = false;
                                $scope.fTeams = {};
                              }
                          }).error(function(data, status) {
                              $scope.message = data;
                          });
                  };

                  //************************************************//
                  $scope.DeleteTeam = function(id) {
                      console.log("id is: "+id);
                    $http({
                          method  : 'POST',
                          url     : 'php/DeleteTeam.php',
                          data    : {id: id},
                          headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                           })
                        .then(function(response) {
                            console.log(response.data.info);
                            var rid = aCtrl.items[0].teams.findIndex(x => x.id === id);
                            aCtrl.items[0].all.splice(rid, 1);
                            return response.data.info;
                        });
                  };

                  $scope.UpdateTeam = function (id, sid) {
                    $scope.message = "";
                    $scope.updateIndexTeam = sid;
                    $http({
                          method  : 'POST',
                          url     : 'php/getUpdateTeam.php',
                          data    : {id: id},
                          headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                           })
                        .then(function(response) {
                          console.log(response.data);
                            $scope.itemU = response.data[0];
                            $scope.fElements.genders.model = $scope.itemU.sex;
                            console.log($scope.itemU);
                            console.log($scope.fElements);
                            // $scope.tinymceData.about = response.data.item[0].about;

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
                                $scope.updateIndex = null;

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

                                console.log("aCtrl = "+aCtrl.items[0].all[0]);
                                var rid = aCtrl.items[0].all[0].findIndex(x => x.authority_id === uitem.authority_id);
                                console.log(rid);
                                aCtrl.items[0].all[0][rid] = uitem;
                                console.log(aCtrl.items[0].all[0]);
                                console.log($scope.itemU);

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
          console.log($scope.fProjects);
        }

        $scope.CloseAddProject = function() {
          $scope.AddNewProject = false;
        }

        $scope.CancelUpdateProject = function(aid, id) {
          $scope.updateIndexProject = null;
          $scope.itemU.id = id;
          $scope.itemU.authority_id = aid;
        }

        //************************************************//

        $scope.AddPaper = function(id) {
          $scope.AddNewPaper = true;
          $scope.fPapers.id = id;
        }

        $scope.CloseAddPaper = function() {
          $scope.AddNewPaper = false;
        }

        $scope.CancelUpdatePaper = function(aid, id) {
          $scope.updateIndexPaper = null;
          $scope.itemU.id = id;
          $scope.itemU.authority_id = aid;

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
