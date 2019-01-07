(function () {
  'use strict';

  angular.module('ShopApp')
  .controller('AdminController', AdminController)
  .directive('adminAdd', AdminAddDirective)
  .directive('adminUpdate', AdminUpdateDirective);


  AdminController.$inject = ['$scope', '$http', 'Upload', 'items'];

    function AdminController($scope, $http, Upload, items) {

        var aCtrl = this;
        aCtrl.items = items;
        $scope.updateIndex = null;
        $scope.AddNewRecord = false;
        $scope.hasRoleAdmin = aCtrl.items[2].AdminIsIn;
        console.log($scope.hasRoleAdmin);

        //**************** Data for Dbase Upload ********************//
          $scope.itemU = {};
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
          console.log(aCtrl.items[0].all.length);
          console.log(aCtrl.items[0].all);
        //**********************************************************//
        //**************** File Upload *********************//
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
                      newitem.name = $scope.message.info[0].newitem[0].sname;
                      newitem.description = $scope.message.info[0].newitem[0].sdescription;
                      newitem.price = $scope.message.info[0].newitem[0].sprice;
                      newitem.image = $scope.message.info[0].newitem[0].simage;
                      newitem.id = $scope.message.info[0].newitem[0].id;

                      aCtrl.items[0].all.push(newitem);

                      console.log($scope.message.info[0].newitem[0].id);
                      $scope.AddNewRecord = false;
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
          $scope.updateIndex = sid;
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

          //************************************************//

        $scope.AddItem = function() {
          $scope.AddNewRecord = true;
        }

        $scope.CloseAdd = function() {
          $scope.AddNewRecord = false;
        }

        $scope.CancelUpdate = function() {
          $scope.updateIndex = null;
        }
    };

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


})();
