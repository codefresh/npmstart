;(function(){
'use strict';
angular
  .module('codeFreshSiteApp')
  .config(Configuration);

  /* @ngInject */
  function Configuration($stateProvider) {
    $stateProvider
      .state('labs', {
        url: '/',
        templateUrl: 'app/labs/labs.html',
        controller: 'LabsCtrl'
      });
  }

}).call(this);
