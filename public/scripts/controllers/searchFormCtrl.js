'use strict';

/**
 * @ngdoc function
 * @name npmStartApp.controller:codeSampleCtrl
 * @description
 * # codeSampleCtrl
 * Controller of the npmStartApp
 */

var app = angular.module('npmStartApp');

app.controller('searchFormCtrl', ['$scope', '$location', '$http', 'CodeSampleService', '$activityIndicator', function ($scope, $location, $http, CodeSampleService, $activityIndicator) {
    $activityIndicator.startAnimating();

    $scope.searchValue = '';

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

    $scope.clear = function () {
        $scope.searchValue = '';
    }

    $scope.search = function () {
        console.log ("search = " + $scope.searchValue);
    }

}]);
