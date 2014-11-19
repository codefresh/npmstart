/**
 * @ngdoc function
 * @name npmStartApp.controller:codeSampleCtrl
 * @description
 * # codeSampleCtrl
 * Controller of the npmStartApp
 */

'use strict';

var app = angular.module('npmStartApp');

app.controller('codeSampleCtrl', ['$scope', '$location', '$http', 'CodeSampleService', '$activityIndicator', 'localStorageService', '$filter', function ($scope, $location, $http, CodeSampleService, $activityIndicator, localStorageService, $filter) {
    $activityIndicator.startAnimating();

    $scope.searchString = '';
    $scope.codeSampleCollectionResult = [];

    $scope.viewModeModel = '';
    $scope.gridOptions = {
        enableHorizontalScrollbar: false,
        data: 'codeSampleCollectionResult',
        enableRowSelection: true,
        enableSelectAll: true,
        selectionRowHeaderWidth: 35
    };

    $scope.gridOptions
        .columnDefs = [
        { name:'Name', field: 'caption-image',
            cellTemplate:'' +
                '<div class="name-field list-group">' +
                    '<a href="#" class="list-group-item">' +
                        '<img ng-src="assets/images/portfolio/logo/{{COL_FIELD}}" class="img-responsive pull-left" alt="{{row.entity.name}}" />' +
                        '<h4 class="list-group-item-heading">{{row.entity.name}}</h4>' +
                        '<p class="list-group-item-text">{{row.entity["caption-text"]}}</p>' +
                    '</a>' +
                '</div>'
        },
        { name: 'Ready', width: 250, field: 'ready',
            cellTemplate:'' +
                '<div class="list-group">' +
                    '<div class="list-group-item action-field">'+
                        '<codeit style="z-index:1001" ng-if="row.entity.ready === true" bstyle="primary" bsize="sm"/> ' +
                        '<p class="list-group-item-text" ng-if="row.entity.ready === false">Comming Soon!</p>'+
                    '</div>'+
                '</div>'
        }
    ];

    $scope.gridOptions.multiSelect = false;
    $scope.gridOptions.modifierKeysToMultiSelect = false;
    $scope.gridOptions.noUnselect = true;

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


    /**/

}]);



