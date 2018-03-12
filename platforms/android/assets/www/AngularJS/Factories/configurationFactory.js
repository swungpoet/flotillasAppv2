appServices.factory('configurationFactory', [function() {

    var interfaz = {};

    interfaz.globalAPI = 'http://189.204.141.193/FlotillaCartaFacturaApi/api/';
    interfaz.downloadPath = 'http://189.204.141.193/FlotillaCartaFacturaApi/Documentos/';

    
    //interfaz.globalAPI = 'http://192.168.20.9/FlotillaApi/api/';
    //interfaz.downloadPath = 'C:/Produccion/Flotillas/Documentos/';
    //interfaz.downloadPath = 'http://189.204.141.193/FlotillaCartaFacturaApi/Documentos/'
    //http://192.168.50.136:8100

    return interfaz;

}]);
