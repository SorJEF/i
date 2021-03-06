define('service.city.link', ['angularAMD'], function (angularAMD) {
    var app = angular.module('service.city.link', []);

    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('service.city.link', {
                url: '/link',
                views: {
                    '': angularAMD.route({
                        templateProvider: ['$templateCache', function($templateCache) {
							return $templateCache.get('html/service/city/link/index.html');
						}],
						controller: 'ServiceLinkController',
                        controllerUrl: 'service/link/controller'
                    })
                }
            })
    }]);
    return app;
});

