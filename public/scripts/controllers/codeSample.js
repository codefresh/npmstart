
'use strict';

/**
 * @ngdoc function
 * @name npmStartApp.controller:codeSampleCtrl
 * @description
 * # codeSampleCtrl
 * Controller of the npmStartApp
 */

var app = angular.module('npmStartApp');

app.controller('codeSampleCtrl', ['$scope', '$location', '$http', 'CodeSampleService', '$activityIndicator', 'localStorageService', '$filter', function ($scope, $location, $http, CodeSampleService, $activityIndicator, localStorageService, $filter) {
    $activityIndicator.startAnimating();

    $scope.searchString = '';
    $scope.codeSampleCollectionResult = [];

    $scope.viewModeModel = '';
    $scope.gridOptions = {enableHorizontalScrollbar: false, data: 'codeSampleCollectionResult'};

    $scope.gridOptions
        .columnDefs = [
        { name:'Logo', field: 'caption-image', cellTemplate:'<img ng-src="assets/images/portfolio/logo/{{COL_FIELD}}" class="img-responsive" style="height: 30px;" alt="">' },
        { name:'Name', field: 'name' },
        { name:'Description', field: 'caption-text' },
        { name: 'Ready', field: 'ready', cellTemplate:'<codeit style="z-index:1001" ng-show="{{COL_FIELD}}"/> <div class="ui-grid-cell-contents" ng-show="{{!COL_FIELD}}">Comming Soon!</div>'}
        ];

    /**/
    var viewModeModelName = "portfolioViewMode";
    var viewMode = localStorageService.get(viewModeModelName);

    if (!viewMode) {
        viewMode = 'listView';
    }

    $scope.viewModeModel = viewMode;
    $scope.$watch("viewModeModel", function( newValue, oldValue ) {
        // Ignore initial setup.
        if ( newValue === oldValue ) {
            return;
        }

        localStorageService.set(viewModeModelName, newValue);
    });

    $scope.setViewMode = function(viewMode) {
        if(viewMode && viewMode.length > 0) {
            $scope.viewModeModel = viewMode;
        }
    };

    /**/

    $scope.providers = CodeSampleService.getAllSampleProviders();
    $scope.currentProvider = {};
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
    });

    $scope.$on('filterSearchExampleEvent', function(event, searchString){
        $scope.searchString = searchString;
        $scope.codeSampleCollectionResult = $scope.searchString ? $filter('filter')($scope.codeSampleCollection, $scope.searchString) : $scope.codeSampleCollection;
    });

    CodeSampleService.getSampleCollection().success(function(data, status, headers, config) {
        $scope.codeSampleCollection = data;

        $scope.codeSampleCollectionResult = data;
        /*  $scope.code = function() {
         $http.post('/env').success(function(data) {
             this.deploy = data;
             this.deploy.title = "code it" + $scope.$id;
             }).error(function(data) {
                alert(data);
             });
         }*/
        $activityIndicator.stopAnimating();

    });

    /**/

    $scope.$watch( "codeSampleCollection", function( newValue, oldValue ) {
            // Ignore initial setup.
            /*if ( newValue === oldValue ) {
                return;
            }
            if ( $scope.codeSampleCollection === newValue ) {
                return;
            }*/
            //$scope.gridOptions.data = $scope.codeSampleCollection;
            console.log($scope.codeSampleCollection);
        }
    );

    /**/

}]);

