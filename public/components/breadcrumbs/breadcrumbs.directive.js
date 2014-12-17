var app = angular.module('labsDirectives');
app.directive('breadcrumbs', ['$http', function ($http) {
    var spinnerId = 1;

    var directive = {
        restrict: 'AE',
        controller: controller,
        template: '<div ng-repeat="l in breadcrumbs"><a ng-class="{link:l.func}" ng-click="l.func()">{{l.text}}</a><span ng-show="!$last">&nbsp;</span></div>'
    };

    function controller($scope) {

    }

    function link(scope, element, attr) {

    }

    return directive;

}]);