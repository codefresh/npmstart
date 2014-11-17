'use strict';

var app = angular.module('npmStartApp')

app.service('CodeSampleService', ['$http', '$resource', function($http, $resource) {

	var getSampleCollection = function( ) {

		return $http.get('/data/codesamplecollection.json')
			.success(function(data, status, headers, config) {
				console.log("getSampleCollection success");
			})
			.error(function(data, status, headers, config) {
				console.log("getSampleCollection error");
			});
	};

	var getSampleProviders = function( ) {
		var result = [
			{name:'NPMStart', type: 'npmstart', icon: 'cfs-npmstart', apiUrl:'212', enabled: true},
			{name:'GitHub', type: 'github', icon: 'fa-github', apiUrl:'213', enabled: false},
			{name:'Sourcegraph', type: 'sourcegraph', icon: 'sourcegraph', apiUrl:'376', enabled: false},
		];
		return result;
	}

	var getSampleProviderById = function(id) {

	}

	return {
		getAllSampleProviders: getSampleProviders,
		getSampleProviderById: getSampleProviderById,
		getSampleCollection: getSampleCollection
	};

}]);

