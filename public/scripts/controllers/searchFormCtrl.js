'use strict';

/**
 * @ngdoc function
 * @name npmStartApp.controller:codeSampleCtrl
 * @description
 * # codeSampleCtrl
 * Controller of the npmStartApp
 */

var app = angular.module('npmStartApp');

app.controller('searchFormCtrl', ['$scope', '$rootScope', '$location', '$http', 'CodeSampleService', '$activityIndicator', '$document', '$timeout', function ($scope, $rootScope, $location, $http, CodeSampleService, $activityIndicator, $document, $timeout) {
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

    $scope.$watch( "searchValue", function( newValue, oldValue ) {
            // Ignore initial setup.
            if ( newValue === oldValue ) {
                return;
            }

            // Ignore if form already mirrors new value.
            /*if ( $scope.searchValue === newValue ) {
                return;
            }*/
            $scope.search();
        }
    );

    $scope.clear = function () {
        $scope.searchValue = '';
        $rootScope.$broadcast('filterSearchExampleEvent', $scope.searchValue);
    }

    $scope.toExampleSection = function() {
        var elem = angular.element(document.getElementById('portfolio'));
        $document.scrollTo(elem, 0, 500);
    }

    $scope.search = function () {
        //console.log ("search = " + $scope.searchValue);
        $rootScope.$broadcast('filterSearchExampleEvent', $scope.searchValue);
        console.log( $scope.toExampleSection() );
        //workaround, use after keydown event
        $timeout(function() {$scope.toExampleSection();}, 5);
    }

    $document.on('scroll', function() {
        //console.log('Document scrolled to ', $document.scrollLeft(), $document.scrollTop());
    });

}]);
