'use strict';

/**
 * @ngdoc overview
 * @name npmStartApp
 * @description
 * # npmStartApp
 *
 * Main module of the application.
 */

angular.module('npmStartApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.router',
    'ui.bootstrap',
    'ngActivityIndicator',
    'chieffancypants.loadingBar',
    'ngDropdowns',
    'duScroll'
])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        //delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $stateProvider
            .state('base', {
                url: "/",
                /*templateUrl: '../views/code-sample.html',
                controller: 'codeSampleCtrl'*/
                views: {
                    'codesample': {
                        abstract: true,
                        templateUrl: '../views/code-sample.html',
                        controller: 'codeSampleCtrl'
                        /*,resolve: {
                            sampleCollection: function (CodeSampleService) {
                                return CodeSampleService.getSampleCollection();
                            }
                        }*/
                    },
                    'searchform': {
                        abstract: true,
                        templateUrl: '../views/search-form.html',
                        controller: 'searchFormCtrl'
                    }
                }
            })

        $urlRouterProvider.otherwise('/');
    })
