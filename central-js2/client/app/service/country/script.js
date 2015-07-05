angular.module('app').config(function($stateProvider) {
  $stateProvider
    .state('index.service.general.country', {
      url: '/country',
      views: {
        '@service': {
          templateUrl: 'app/service/country/index.html',
          controller: 'ServiceCountryController',
          controllerUrl: 'state/service/country/controller'
        }
      }
    }).state('index.service.general.country.error', {
      url: '/absent',
      views: {
        'content@service.general.country': {
          templateUrl: 'app/service/country/absent.html',
          controller: 'ServiceCountryAbsentController',
          controllerUrl: 'state/service/country/absent/controller'
        }
      }
    });
});