(function () {
	'use strict';
	angular
		.module('codeFreshSiteApp', [
			'ngCookies',
			'ngResource',
			'ngSanitize',
			'ngAnimate',
			'ui.router',
			'ui.bootstrap',
                        'labsDirectives'
		])
		.config(Configuration)
		.run(function ($state, $rootScope, $stateParams) {
			// used for content styles
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
		});;

	/* @ngInject */
	function Configuration($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/');

		$locationProvider.html5Mode(true);
	}

}).call(this);
