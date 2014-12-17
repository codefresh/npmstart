var app = angular.module('labsDirectives');
app.directive('codeit', ['$http', function ($http) {
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

    function controller($scope) {
        var codeButton = {};
        $scope.codeButton = codeButton;
        codeButton.title = "Code It!";
        codeButton.status = "init";

        codeButton.bstyle = $scope.bstyle ? $scope.bstyle : "";
        codeButton.bsize = $scope.bsize ? $scope.bsize : "";


        $scope.codeit = function () {
            
            if (codeButton.status === "inprogress") {
                alert("In progress...");
                return;
            }
            
            if (codeButton.status === "ready") {
                window.open(codeButton.url, "_blank");
                return;
            }
            
            //cfpLoadingBar.start();
            console.log("start animation");
            codeButton.bstyle = "loading";        
            
            codeButton.title = "Setting environment";
            codeButton.status = "inprogress";

            $http.post('/env').success(function (data) {
                codeButton.status = "ready";
                $scope.deploy = data;
                $scope.deploy.title = "workspace is ready";
                //cfpLoadingBar.complete();
                console.log("animation ends!");
                codeButton.bstyle = "btn-success";
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