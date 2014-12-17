;
(function () {
	'use strict';
	angular
		.module('codeFreshSiteApp')
		.controller('LabsCtrl', LabsCtrl);

	/* @ngInject */
	function LabsCtrl($scope, $http, $location, CodeSampleService) {
		$scope.breadcrumbs = [];
		
		$scope.resetView = function() {
			$scope.codeSamplesCollection = false;
			loadCat();
		};
		
		var genBreadcrumbs = function(arr) {
			var c = 0;
			$scope.breadcrumbs[c] = {
				text: "home",
				func: $scope.resetView
			};
			c++;
			
			for(var i in arr) {
				$scope.breadcrumbs[c] = {
					text: arr[i].text,
					func: arr[i].func
				};
				c++;
			}			
		}
		
		genBreadcrumbs([]);
		
		$scope.codeCategoriesCollection = [];
		$scope.codeSamplesCollection = false;
	     
		$scope.searchCode = function(query) {
		    var query_obj = {};
		    var sp = query.split("&");
		    var sp2;
		    for(var i in sp) {
			    if (sp[i]!="") {
				    sp2 = sp[i].split("=");
				    
				    query_obj[sp2[0]] = sp2[1];
				    
				    $location.search(sp2[0],sp2[1])
			    }
		    }
		    
		    applySearch(query_obj);
		    
		};
	    
		var applySearch = function(query_obj) {
		    CodeSampleService.search(query_obj).success(function(data, status, headers, config) {
			    $scope.codeSamplesCollection = data;
			    var search_text = "";
			    var c=0;
			    for(var x in query_obj) {
				if (c>0) {
					search_text += ", ";
				}
				search_text += x + ": " + query_obj[x];
				c++;
			    }
			    genBreadcrumbs([{text:search_text,func:""}]);
		    });
		};
	    
		var loadCategories = true;
		var query = $location.search();
		for(var x in query) {
			if (query[x]) {
				applySearch(query);
				var loadCategories = false;
				break;
			}
		}
	    
		if (loadCategories) {
			loadCat();			
		}
		
		
		var loadCat = function() {
			CodeSampleService.getCategoriesCollection().success(function(data, status, headers, config) {
				$scope.codeCategoriesCollection = data;
			});
		}
		
	    
	    

	}

}).call(this);
