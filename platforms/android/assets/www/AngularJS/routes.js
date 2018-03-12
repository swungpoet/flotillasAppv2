angular.module('app.routes', [])

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

        .state('busqueda', {
        url: '/busqueda',
        templateUrl: 'templates/busqueda.html',
        controller: 'busquedaController'
    })


    .state('cargardocumentos', {
        url: '/cargardocumentos',
        templateUrl: 'templates/cargardocumentos.html',
        controller: 'cargardocumentosController',
        cache: false

    })

    //  .state('menu', {
    //    url: '/side-menu21',
    //    templateUrl: 'templates/menu.html',
    //    abstract:true
    //  })

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginController'
    })

    //    .state('page', {
    //        url: '/page5',
    //        templateUrl: 'templates/page.html',
    //        controller: 'pageCtrl'
    //    })

    $urlRouterProvider.otherwise('/login')



});