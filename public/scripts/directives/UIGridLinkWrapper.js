/**
 * Created by Vladimir G. Mechkauskas <elartix@gmail.com>
 */

(function(window, angular, undefined) {
    'use strict';

    var linkWrapper = angular.module('uiGridLinkWrapper', []);

    linkWrapper.run(['$templateCache', function ($templateCache) {
        $templateCache.put('templates/linkwarpper.html', [
            //'<div class="list-group-item">',
                '<a class="list-group-item" href="{{captionLink}}" target="_blank">',
                    '<img ng-src="assets/images/portfolio/logo/{{captionImage}}" class="img-responsive pull-left" alt="{{captionName}}"/>',
                    '<h4 class="list-group-item-heading">{{captionName}}</h4>',
                    '<p class="list-group-item-text">{{captionDescription}}</p>',
                '</a>',
            //'</div>'
        ].join(''));
    }]);

    linkWrapper.directive('linkwrapper', function () {
        return {
            scope: {
                model: '=',
            },
            link: function (scope, element, attrs) {
                var model = scope.model;
                //var model = JSON.parse(attrs.linkwrapper);
                scope.captionLink = model["caption-links"].link ? model["caption-links"].link : '';
                scope.captionName = model.name;
                scope.captionImage = model["caption-image"];
                scope.captionDescription = model["caption-text"];
            },
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: 'templates/linkwarpper.html'
        };
    })

})(window, window.angular);
