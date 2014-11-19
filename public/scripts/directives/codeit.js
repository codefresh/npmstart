var app = angular.module('npmStartApp');
app.directive('codeit', ['$http', 'cfpLoadingBar', function ($http, cfpLoadingBar) {
    var spinnerId = 1;

    var directive = {
        restrict: 'AE',
        controller: controller,
        template: '<button type="button" class="btn {{codeButton.bstyle}} {{codeButton.bsize}}" ng-click="codeit()">{{codeButton.title}}</button>',
        scope: {
            bstyle: '@',
            bsize: '@'
        }
    };
    //<p><a href="{{deploy.url}}" style="z-index:1001;background-color: blue;" target="_blank">{{deploy.title}}</a></p>
//  <button type="button" class="btn btn-default" data-dismiss="modal">

    function controller($scope) {
        var codeButton = {};
        $scope.codeButton = codeButton;
        codeButton.title = "Code It";
        codeButton.status = "init";

        codeButton.bstyle = $scope.bstyle ? 'btn-' + $scope.bstyle : "primary";
        codeButton.bsize = $scope.bsize ? 'btn-' + $scope.bsize : "";


        $scope.codeit = function () {
            console.log('clicked');
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

    return directive;

}]);
