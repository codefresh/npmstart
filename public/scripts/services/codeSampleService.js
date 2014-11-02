'use strict';

angular.module('npmStartApp')

	.service('CodeSampleService', function($http, $resource) {

		var getSampleCollection = function( ) {

			return $http.get('/data/codesamplecollection.json')
				.success(function(data, status, headers, config) {
					console.log("getSampleCollection success");
				})
				.error(function(data, status, headers, config) {
					console.log("getSampleCollection error");
				});
		};

		return {
			getSampleCollection: getSampleCollection
		};

	});

