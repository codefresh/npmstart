'use strict';

/**
 * @ngdoc function
 * @name npmStartApp.controller:codeSampleCtrl
 * @description
 * # codeSampleCtrl
 * Controller of the npmStartApp
 */

var app = angular.module('npmStartApp');

app.controller('codeSampleCtrl', ['$scope', '$location', '$http', 'CodeSampleService', '$activityIndicator', function ($scope, $location, $http, CodeSampleService, $activityIndicator) {
    $activityIndicator.startAnimating();

    $scope.providers = CodeSampleService.getAllSampleProviders();
    $scope.currentProvider = {}

    CodeSampleService.getSampleCollection().success(function(data, status, headers, config) {

        $scope.codeSampleCollection = data;
      /*  $scope.code = function()
        {
          $http.post('/env').success(function(data)
          {

              this.deploy = data;
              this.deploy.title = "code it" + $scope.$id;

          }).error(function(data)
          {
            alert(data);
          });
        }*/
        $activityIndicator.stopAnimating();
    })

}]);
