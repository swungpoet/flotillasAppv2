appServices.factory('cargardocumentosRepository', function ($http, configurationFactory) {

    var loginRepositoryGlobal = configurationFactory.globalAPI + 'unidadapi/';

    return {
        getEncabezado: function (vin) {
            return $http.get(loginRepositoryGlobal + '4|' + vin);
        },
        getListaDocumentos: function (vin, idDocumento) {
            return $http.get(loginRepositoryGlobal + '6|' + vin + '|' + idDocumento);
        }
    }

});