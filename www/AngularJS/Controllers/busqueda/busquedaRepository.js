appServices.factory('busquedaRepository', function ($http, configurationFactory) {

    var loginRepositoryGlobal = configurationFactory.globalAPI + 'flotillaApi/';

    return {
        buscaUnidad: function (factura, vin, placa) {
            return $http.get(loginRepositoryGlobal + '1|' + factura + '|' + vin + '|' + placa);
        }
    };
});