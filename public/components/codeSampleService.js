'use strict';

var app = angular.module('codeFreshSiteApp')

app.service('CodeSampleService', ['$http', '$resource', function($http, $resource) {
	
	var search = function(query) {
			return $http.post('/codesamples/search',query)
			.success(function(data, status, headers, config) {
				
			})
			.error(function(data, status, headers, config) {
				
			});
	};
	
	var getCategoriesCollection = function() {
			return $http.get('/codesamples/categories')
			.success(function(data, status, headers, config) {
				console.log("getTagsCollection success");
			})
			.error(function(data, status, headers, config) {
				console.log("getCategoriesCollection error");
			});
	};
	
	var getTagsCollection = function(query) {
			return $http.get('/codesamples/tags?q=' + query)
			.success(function(data, status, headers, config) {
				//console.log("getTagsCollection success");
			})
			.error(function(data, status, headers, config) {
				console.log("getTagsCollection error");
			});
	};

	var getSampleCollection = function( ) {

		return $http.get('/codesamples/codesamplecollection')
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
		search: search,
		getCategoriesCollection: getCategoriesCollection,
		getAllSampleProviders: getSampleProviders,
		getSampleProviderById: getSampleProviderById,
		getSampleCollection: getSampleCollection,
		getTagsCollection: getTagsCollection
	};

}]);

