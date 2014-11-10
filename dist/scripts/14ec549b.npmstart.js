'use strict';
/**
 * @ngdoc overview
 * @name npmStartApp
 * @description
 * # npmStartApp
 *
 * Main module of the application.
 */
angular.module('npmStartApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.router',
  'ngActivityIndicator',
  'chieffancypants.loadingBar',
  'ngDropdowns'
]).config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $stateProvider.state('base', {
      url: '/',
      views: {
        'codesample': {
          abstract: true,
          templateUrl: '../views/code-sample.html',
          controller: 'codeSampleCtrl'
        },
        'searchform': {
          abstract: true,
          templateUrl: '../views/search-form.html',
          controller: 'searchFormCtrl'
        }
      }
    });
    $urlRouterProvider.otherwise('/');
  }
]);
;
'use strict';
/**
 * @ngdoc function
 * @name npmStartApp.controller:codeSampleCtrl
 * @description
 * # codeSampleCtrl
 * Controller of the npmStartApp
 */
var app = angular.module('npmStartApp');
app.controller('codeSampleCtrl', [
  '$scope',
  '$location',
  '$http',
  'CodeSampleService',
  '$activityIndicator',
  function ($scope, $location, $http, CodeSampleService, $activityIndicator) {
    $activityIndicator.startAnimating();
    $scope.providers = CodeSampleService.getAllSampleProviders();
    $scope.currentProvider = {};
    angular.copy($scope.providers[0], $scope.currentProvider);
    $scope.$watch('currentProvider.name', function (newValue, oldValue) {
      // Ignore initial setup.
      if (newValue === oldValue) {
        return;
      }
      console.log('$watch: currentProvider changed to < ' + newValue + ' >');
      // Ignore if form already mirrors new value.
      if ($scope.currentProvider.name === newValue) {
        return;
      }
    });
    CodeSampleService.getSampleCollection().success(function (data, status, headers, config) {
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
    });
  }
]);
;
'use strict';
/**
 * @ngdoc function
 * @name npmStartApp.controller:codeSampleCtrl
 * @description
 * # codeSampleCtrl
 * Controller of the npmStartApp
 */
var app = angular.module('npmStartApp');
app.controller('searchFormCtrl', [
  '$scope',
  '$location',
  '$http',
  'CodeSampleService',
  '$activityIndicator',
  function ($scope, $location, $http, CodeSampleService, $activityIndicator) {
    $activityIndicator.startAnimating();
    $scope.searchValue = '';
    $scope.providers = CodeSampleService.getAllSampleProviders();
    $scope.currentProvider = {};
    angular.copy($scope.providers[0], $scope.currentProvider);
    $scope.$watch('currentProvider.name', function (newValue, oldValue) {
      // Ignore initial setup.
      if (newValue === oldValue) {
        return;
      }
      console.log('$watch: currentProvider changed to < ' + newValue + ' >');
      // Ignore if form already mirrors new value.
      if ($scope.currentProvider.name === newValue) {
        return;
      }
    });
    $scope.clear = function () {
      $scope.searchValue = '';
    };
    $scope.search = function () {
      console.log('search = ' + $scope.searchValue);
    };
  }
]);
;
app.directive('clickSpinner', [
  '$q',
  function ($q) {
    var spinnerId = 1;
    var directive = {
        restrict: 'A',
        link: link,
        transclude: true,
        scope: { clickHandler: '&clickSpinner' },
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
        p['finally'](function () {
          attr.$set('disabled', false);
          textElement.css('visibility', 'visible');
          spinner.stop();
        });
      }
      element.on('click', handler);
      scope.$on('$destroy', function () {
        element.off('click', handler);
      });
    }
  }
]);
;
var app = angular.module('npmStartApp');
app.directive('codeit', [
  '$http',
  'cfpLoadingBar',
  function ($http, cfpLoadingBar) {
    var spinnerId = 1;
    var directive = {
        restrict: 'AE',
        controller: controller,
        template: '<button type="button" class="btn btn-primary" ng-click="codeit()">{{codeButton.title}}</button>'
      };
    //<p><a href="{{deploy.url}}" style="z-index:1001;background-color: blue;" target="_blank">{{deploy.title}}</a></p>
    //  <button type="button" class="btn btn-default" data-dismiss="modal">
    return directive;
    function controller($scope) {
      var codeButton = {};
      $scope.codeButton = codeButton;
      codeButton.title = 'Code It';
      codeButton.status = 'init';
      $scope.codeit = function () {
        if (codeButton.status === 'ready') {
          window.open(codeButton.url, '_blank');
        }
        cfpLoadingBar.start();
        codeButton.title = 'Setting environment ...';
        codeButton.status = 'inprogress';
        $http.post('/env').success(function (data) {
          codeButton.status = 'ready';
          $scope.deploy = data;
          $scope.deploy.title = 'workspace is ready';
          cfpLoadingBar.complete();
          $scope.codeButton.title = 'Ready to code!';
          codeButton.url = data.url;
        }).error(function (data) {
          alert('error: ' + data);
        });
      };
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
  }
]);
;
app.constant('keyCodes', {
  esc: 27,
  space: 32,
  enter: 13,
  tab: 9,
  backspace: 8,
  shift: 16,
  ctrl: 17,
  alt: 18,
  capslock: 20,
  numlock: 144
}).directive('enterKeypress', [
  'keyCodes',
  function (keyCodes) {
    function map(obj) {
      var mapped = {};
      for (var key in obj) {
        var action = obj[key];
        if (keyCodes.hasOwnProperty(key)) {
          mapped[keyCodes[key]] = action;
        }
      }
      return mapped;
    }
    return function (scope, element, attrs) {
      var bindings = map(scope.$eval(attrs.enterKeypress));
      element.bind('keydown keypress', function (event) {
        if (bindings.hasOwnProperty(event.which)) {
          scope.$apply(function () {
            scope.$eval(bindings[event.which]);
          });
          event.preventDefault();
        }
      });
    };
  }
]);
;
/**
 * Created by Vladimir G. Mechkauskas <elartix@gmail.com>
 */
(function (window, angular, undefined) {
  'use strict';
  var dropdown = angular.module('ngDropdowns', []);
  dropdown.run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('ngDropdowns/templates/dropdownSelect.html', [
        '<div class="dropDown input-group-btn">',
        '<button type="button" class="btn btn-default2 dropdown-toggle" data-toggle="dropdown"><i class="fa fa-{{dropdownModel[iconField]}}"></i>{{dropdownModel[labelField]}}<span class="caret"></span></button>',
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
        '<li ng-class="{divider: dropdownSelectItem.divider}">',
        '<a href="#" class="dropdown-item"',
        ' ng-if="!dropdownSelectItem.divider"',
        ' ng-href="{{dropdownSelectItem.href}}"',
        ' ng-click="selectItem()">',
        ' <i class="fa fa-{{dropdownSelectItem[dropdownItemIcon]}}"></i>',
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
    }
  ]);
  dropdown.directive('dropdownSelect', [
    'DropdownService',
    function (DropdownService) {
      return {
        restrict: 'A',
        replace: true,
        scope: {
          dropdownSelect: '=',
          dropdownModel: '=',
          dropdownOnchange: '&'
        },
        controller: [
          '$scope',
          '$element',
          '$attrs',
          function ($scope, $element, $attrs) {
            $scope.labelField = $attrs.dropdownItemLabel || 'text';
            $scope.iconField = $attrs.dropdownItemIcon || 'icon';
            DropdownService.register($element);
            this.select = function (selected) {
              console.log('select');
              if (selected !== $scope.dropdownModel) {
                angular.copy(selected, $scope.dropdownModel);
              }
              $scope.dropdownOnchange({ selected: selected });
            };
            $element.bind('click', function (event) {
              event.stopPropagation();
              DropdownService.toggleActive($element);
            });
            $scope.$on('$destroy', function () {
              DropdownService.unregister($element);
            });
          }
        ],
        templateUrl: 'ngDropdowns/templates/dropdownSelect.html'
      };
    }
  ]);
  dropdown.directive('dropdownSelectItem', [function () {
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
            console.log('dropdownSelectItem call');
            if (scope.dropdownSelectItem.href) {
              return;
            }
            dropdownSelectCtrl.select(scope.dropdownSelectItem);
          };
        },
        templateUrl: 'ngDropdowns/templates/dropdownSelectItem.html'
      };
    }]);
  dropdown.directive('dropdownMenu', [
    '$parse',
    '$compile',
    'DropdownService',
    '$templateCache',
    function ($parse, $compile, DropdownService, $templateCache) {
      return {
        restrict: 'A',
        replace: false,
        scope: {
          dropdownMenu: '=',
          dropdownModel: '=',
          dropdownOnchange: '&'
        },
        controller: [
          '$scope',
          '$element',
          '$attrs',
          function ($scope, $element, $attrs) {
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
              $scope.dropdownOnchange({ selected: selected });
            };
            $element.bind('click', function (event) {
              event.stopPropagation();
              DropdownService.toggleActive(tpl);
            });
            $scope.$on('$destroy', function () {
              DropdownService.unregister(tpl);
            });
          }
        ]
      };
    }
  ]);
  dropdown.directive('dropdownMenuItem', [function () {
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
    }]);
  dropdown.factory('DropdownService', [
    '$document',
    function ($document) {
      var body = $document.find('body'), service = {}, _dropdowns = [];
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
}(window, window.angular));
;
'use strict';
var app = angular.module('npmStartApp');
app.service('CodeSampleService', [
  '$http',
  '$resource',
  function ($http, $resource) {
    var getSampleCollection = function () {
      return $http.get('/data/codesamplecollection.json').success(function (data, status, headers, config) {
        console.log('getSampleCollection success');
      }).error(function (data, status, headers, config) {
        console.log('getSampleCollection error');
      });
    };
    var getSampleProviders = function () {
      var result = [
          {
            name: 'GitHub',
            type: 'github',
            icon: 'github',
            apiUrl: '213'
          },
          {
            name: 'Sourcegraph',
            type: 'sourcegraph',
            icon: 'sourcegraph',
            apiUrl: '376'
          }
        ];
      return result;
    };
    var getSampleProviderById = function (id) {
    };
    return {
      getAllSampleProviders: getSampleProviders,
      getSampleProviderById: getSampleProviderById,
      getSampleCollection: getSampleCollection
    };
  }
]);