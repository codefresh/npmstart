;(function(){
'use strict';
angular
  .module('codeFreshSiteApp')
  .controller('NavbarCtrl', NavbarCtrl);

  /* @ngInject */
  function NavbarCtrl($scope, $location) {
    $scope.menu = [
    {
      'title': 'Product',
      'link': '/product'
    },
    {
      'title': 'Labs',
      'link': '/'
    },
    {
      'title': 'Contact us',
      'link': '/contact'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  }

}).call(this);
