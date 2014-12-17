;(function(){
'use strict';
angular
  .module('codeFreshSiteApp')
  .controller('FooterCtrl', FooterCtrl);

  /* @ngInject */
  function FooterCtrl($scope, $subscribe, $location) {
    // subscribe functionality
    $scope.subscribe = $subscribe;
  }

}).call(this);
