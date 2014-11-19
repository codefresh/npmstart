/**
 * Created by Vladimir G. Mechkauskas <elartix@gmail.com>
 */

(function(window, angular, undefined) {
    'use strict';

    var dropdown = angular.module('ngDropdowns', []);

    dropdown.run(['$templateCache', function ($templateCache) {
        $templateCache.put('ngDropdowns/templates/dropdownSelect.html', [
            '<div class="dropDown input-group-btn">',
            '<button type="button" class="btn btn-default2 dropdown-toggle" data-toggle="dropdown"><i class="fa cfs {{dropdownModel[iconField]}}"></i>{{dropdownModel[labelField]}}<span class="caret"></span></button>',
            '<ul class="dropdown-menu" role="menu">',
            '<li ng-repeat="item in dropdownSelect"',
            ' class="dropdown-item"',
            ' dropdown-item-label="labelField"',
            ' dropdown-item-icon="iconField"',
            ' dropdown-select-item="item">',
            '</li>',
            '</ul>',
            '</div>'
        ].join(''));

        $templateCache.put('ngDropdowns/templates/dropdownSelectItem.html', [
            '<li ng-class="{divider: dropdownSelectItem.divider, disabled: !dropdownSelectItem.enabled}">',
            '<a href="#" class="dropdown-item"',
            ' ng-if="!dropdownSelectItem.divider"',
            ' ng-href="{{dropdownSelectItem.href}}"',
            ' ng-click="selectItem();">',
            ' <i class="fa cfs {{dropdownSelectItem[dropdownItemIcon]}}"></i>',
            '{{dropdownSelectItem[dropdownItemLabel]}}',
            '</a>',
            '</li>'
        ].join(''));

        $templateCache.put('ngDropdowns/templates/dropdownMenu.html', [
            '<ul class="dropdown">',
            '<li ng-repeat="item in dropdownMenu"',
            ' class="dropdown-item"',
            ' dropdown-item-label="labelField"',
            ' dropdown-item-icon="iconField"',
            ' dropdown-menu-item="item">',
            '</li>',
            '</ul>'
        ].join(''));

        $templateCache.put('ngDropdowns/templates/dropdownMenuItem.html', [
            '<li ng-class="{divider: dropdownMenuItem.divider}">',
            '<a href="#" class="dropdown-item"',
            ' ng-if="!dropdownMenuItem.divider"',
            ' ng-href="{{dropdownMenuItem.href}}"',
            ' ng-click="selectItem()">',
            '{{dropdownMenuItem[dropdownItemLabel]}}',
            '</a>',
            '</li>'
        ].join(''));

    }]);

    dropdown.directive('dropdownSelect', ['DropdownService',
        function (DropdownService) {
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    dropdownSelect: '=',
                    dropdownModel: '=',
                    dropdownOnchange: '&'
                },

                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    $scope.labelField = $attrs.dropdownItemLabel || 'text';
                    $scope.iconField = $attrs.dropdownItemIcon || 'icon';

                    DropdownService.register($element);

                    this.select = function (selected) {
                        console.log("select");
                        if (selected !== $scope.dropdownModel) {
                            angular.copy(selected, $scope.dropdownModel);
                        }
                        $scope.dropdownOnchange({
                            selected: selected
                        });
                    };

                    $element.bind('click', function (event) {
                        event.stopPropagation();
                        DropdownService.toggleActive($element);
                    });

                    $scope.$on('$destroy', function () {
                        DropdownService.unregister($element);
                    });
                }],
                templateUrl: 'ngDropdowns/templates/dropdownSelect.html'
            };
        }
    ]);

    dropdown.directive('dropdownSelectItem', [
        function () {
            return {
                require: '^dropdownSelect',
                replace: true,
                scope: {
                    dropdownItemLabel: '=',
                    dropdownItemIcon: '=',
                    dropdownSelectItem: '='
                },

                link: function (scope, element, attrs, dropdownSelectCtrl) {
                    scope.selectItem = function () {
                        console.log('dropdownSelectItem call enabled = ',scope.dropdownSelectItem.enabled);
                        if(scope.dropdownSelectItem.enabled) {
                            console.log('dropdownSelectItem call');
                            if (scope.dropdownSelectItem.href) {
                                return;
                            }
                            dropdownSelectCtrl.select(scope.dropdownSelectItem);
                        }
                    };
                },

                templateUrl: 'ngDropdowns/templates/dropdownSelectItem.html'
            };
        }
    ]);

    dropdown.directive('dropdownMenu', ['$parse', '$compile', 'DropdownService', '$templateCache',
        function ($parse, $compile, DropdownService, $templateCache) {
            return {
                restrict: 'A',
                replace: false,
                scope: {
                    dropdownMenu: '=',
                    dropdownModel: '=',
                    dropdownOnchange: '&'
                },

                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    $scope.labelField = $attrs.dropdownItemLabel || 'text';
                    $scope.iconField = $attrs.dropdownItemIcon || 'icon';

                    var $template = angular.element($templateCache.get('ngDropdowns/templates/dropdownMenu.html'));
                    // Attach this controller to the element's data
                    $template.data('$dropdownMenuController', this);

                    var tpl = $compile($template)($scope);
                    var $wrap = angular.element('<div class="wrap-dd-menu"></div>');

                    $element.replaceWith($wrap);
                    $wrap.append($element);
                    $wrap.append(tpl);

                    DropdownService.register(tpl);

                    this.select = function (selected) {
                        console.log('dropdownMenu call');
                        if (selected !== $scope.dropdownModel) {
                            angular.copy(selected, $scope.dropdownModel);
                        }
                        $scope.dropdownOnchange({
                            selected: selected
                        });
                    };

                    $element.bind('click', function (event) {
                        event.stopPropagation();
                        DropdownService.toggleActive(tpl);
                    });

                    $scope.$on('$destroy', function () {
                        DropdownService.unregister(tpl);
                    });
                }]
            };
        }
    ]);

    dropdown.directive('dropdownMenuItem', [
        function () {
            return {
                require: '^dropdownMenu',
                replace: true,
                scope: {
                    dropdownMenuItem: '=',
                    dropdownItemLabel: '='
                },

                link: function (scope, element, attrs, dropdownMenuCtrl) {
                    scope.selectItem = function () {
                        console.log('dropdownMenuItem call');
                        if (scope.dropdownMenuItem.href) {
                            return;
                        }
                        dropdownMenuCtrl.select(scope.dropdownMenuItem);
                    };
                },

                templateUrl: 'ngDropdowns/templates/dropdownMenuItem.html'
            };
        }
    ]);

    dropdown.factory('DropdownService', ['$document',
        function ($document) {
            var body = $document.find('body'),
                service = {},
                _dropdowns = [];

            body.bind('click', function () {
                angular.forEach(_dropdowns, function (el) {
                    el.removeClass('open');
                });
            });

            service.register = function (ddEl) {
                _dropdowns.push(ddEl);
            };

            service.unregister = function (ddEl) {
                var index;
                index = _dropdowns.indexOf(ddEl);
                if (index > -1) {
                    _dropdowns.splice(index, 1);
                }
            };

            service.toggleActive = function (ddEl) {
                angular.forEach(_dropdowns, function (el) {
                    if (el !== ddEl) {
                        el.removeClass('open');
                    }
                });

                ddEl.toggleClass('open');
            };

            return service;
        }
    ]);
})(window, window.angular);
