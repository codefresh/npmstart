'use strict';

/**
 * @ngdoc function
 * @name npmStartApp.controller:codeSampleCtrl
 * @description
 * # codeSampleCtrl
 * Controller of the npmStartApp
 */

var app = angular.module('npmStartApp');

app.controller('codeSampleCtrl', function ($scope, $location, $state, $http, CodeSampleService, $activityIndicator) {
    $activityIndicator.startAnimating();

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

});
