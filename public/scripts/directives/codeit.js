var app = angular.module('npmStartApp');
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
    function controller($scope) {
        var codeButton = {};
        $scope.codeButton = codeButton;
        codeButton.title = "Code It";
        codeButton.status = "init";


        $scope.codeit = function () {
            if (codeButton.status === "ready") {
                window.open(codeButton.url, "_blank");
            }
            cfpLoadingBar.start();
            codeButton.title = "Setting environment ...";
            codeButton.status = "inprogress";


            $http.post('/env').success(function (data) {
                codeButton.status = "ready";
                $scope.deploy = data;
                $scope.deploy.title = "workspace is ready";
                cfpLoadingBar.complete();
                $scope.codeButton.title = "Ready to code!"
                codeButton.url = data.url;

            }).error(function (data) {
                alert("error: " + data);
            });
        }
    }

    function link(scope, element, attr) {
        var spinner = new Spinner(opts);
        var spinnerTarget = element.children();
        var textElement = spinnerTarget.children();


        element.on('click', handler);

        scope.$on('$destroy', function () {
            element.off('click', handler);
        });
    }

}]);
