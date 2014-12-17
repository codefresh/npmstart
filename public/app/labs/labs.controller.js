;
(function () {
	'use strict';
	angular
		.module('codeFreshSiteApp')
		.controller('LabsCtrl', LabsCtrl);

	/* @ngInject */
	function LabsCtrl($scope, $http, $location, CodeSampleService) {
		$scope.breadcrumbs = [];
		$scope.mini_view = false;
		$scope.searchKey = "";
		
		$scope.resetView = function() {
			$location.url($location.path());
			$scope.codeSamplesCollection = false;
			loadCat();
			$scope.mini_view = false;
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
		
		
		$scope.freeSearch = function() {
			if (this.searchKey === "") {
				$scope.resetView();
				return;
			}
			delete $location.$$search.category;
			$scope.searchCode("free="+this.searchKey);
			
		};
		
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
				search_text += query_obj[x];
				c++;
			    }
			    genBreadcrumbs([{text:search_text,func:""}]);
			    $scope.mini_view = true;
			    window.scrollTo(0, 0);
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
		
		var loadCat = function() {
			CodeSampleService.getCategoriesCollection().success(function(data, status, headers, config) {
				$scope.codeCategoriesCollection = data;
			});
		}
	    
		if (loadCategories) {
			loadCat();			
		}
		
		
		
		
	    
	    

	}

}).call(this);
