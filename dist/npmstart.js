'use strict';

/**
 * @ngdoc function
 * @name npmStartApp.controller:codeSampleCtrl
 * @description
 * # codeSampleCtrl
 * Controller of the npmStartApp
 */

var app = angular.module('npmStartApp');

app.controller('codeSampleCtrl', function ($scope, $location, $state, $http, CodeSampleService, $activityIndicator) {
    $activityIndicator.startAnimating();

    CodeSampleService.getSampleCollection().success(function(data, status, headers, config) {
        $scope.codeSampleCollection = data;
      /*  $scope.code = function()
        {
          $http.post('/env').success(function(data)
          {

              this.deploy = data;
              this.deploy.title = "code it" + $scope.$id;

          }).error(function(data)
          {
            alert(data);
          });
        }*/
        $activityIndicator.stopAnimating();
    })

});
;app.directive('clickSpinner', ['$q', function ($q) {
	var spinnerId = 1;

	var directive = {
		restrict: 'A',
		link: link,
		transclude: true,
		scope: {
			clickHandler: '&clickSpinner'
		},
		template: '<span style="position: relative"><span ng-transclude></span></span>'
	};

	var opts = {
		width: 3,
		length: 3,
		lines: 9,
		radius: 4,
		color: '#C9D1FF'
	};

	return directive;

	function link(scope, element, attr) {
		var spinner = new Spinner(opts);
		var spinnerTarget = element.children();
		var textElement = spinnerTarget.children();

		function handler() {
			var p = $q.when(scope.clickHandler());

			attr.$set('disabled', true);
			textElement.css('visibility', 'hidden');
			spinner.spin(spinnerTarget[0]);

			p['finally'](function() {
				attr.$set('disabled', false);
				textElement.css('visibility', 'visible');
				spinner.stop();
			});
		}

		element.on('click', handler);

		scope.$on('$destroy', function() {
			element.off('click', handler);
		});
	}

}]);;var app = angular.module('npmStartApp');
app.directive('codeit', ['$http', 'cfpLoadingBar', function ($http, cfpLoadingBar) {
  var spinnerId = 1;

  var directive = {
    restrict: 'AE',
    controller: controller,
    template: '<button type="button" class="btn btn-default" ng-click="codeit()">{{codeButton.title}}</button>'

  };
  //<p><a href="{{deploy.url}}" style="z-index:1001;background-color: blue;" target="_blank">{{deploy.title}}</a></p>
//  <button type="button" class="btn btn-default" data-dismiss="modal">

  return directive;
  function controller($scope)
  {
      var codeButton  = {};
      $scope.codeButton = codeButton;
      codeButton.title = "Code It";
      codeButton.status = "init";


      $scope.codeit = function()
      {
        if (codeButton.status === "ready")
          {
            window.open(codeButton.url, "_blank");
          }
        cfpLoadingBar.start();
        codeButton.title = "Setting environment ...";
        codeButton.status = "inprogress";


        $http.post('/env').success(function(data)
        {
            codeButton.status = "ready";
            $scope.deploy = data;
            $scope.deploy.title = "workspace is ready";
            cfpLoadingBar.complete();
            $scope.codeButton.title = "Ready to code!"
            codeButton.url = data.url;

        }).error(function(data)
        {
          alert("error: " + data);
        });
      }
  }
  function link(scope, element, attr) {
    var spinner = new Spinner(opts);
    var spinnerTarget = element.children();
    var textElement = spinnerTarget.children();



    element.on('click', handler);

    scope.$on('$destroy', function() {
      element.off('click', handler);
    });
  }

}]);
;'use strict';

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

