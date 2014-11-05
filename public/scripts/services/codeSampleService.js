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
			{name:'GitHub', type: 'github', icon: 'github', apiUrl:'213'},
			{name:'Sourcegraph', type: 'sourcegraph', icon: 'sourcegraph', apiUrl:'376'},
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

