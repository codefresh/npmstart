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

    $scope.searchString = '';

    $scope.providers = CodeSampleService.getAllSampleProviders();
    $scope.currentProvider = {}
    angular.copy($scope.providers[0], $scope.currentProvider);

    $scope.$watch( "currentProvider.name", function( newValue, oldValue ) {
            // Ignore initial setup.
            if ( newValue === oldValue ) {
                return;
            }

            console.log( "$watch: currentProvider changed to < " + newValue + " >");

            // Ignore if form already mirrors new value.
            if ( $scope.currentProvider.name === newValue ) {
                return;
            }
        }
    );

    $scope.$on('filterSearchExampleEvent', function(event, searchString){
        $scope.searchString = searchString;
    });

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
