appControllers.controller('busquedaController', function ($scope, $rootScope, $state, $ionicLoading, $ionicHistory, busquedaRepository, alertFactory, sessionFactory) {
    $scope.datosUnidad = {
        factura: '',
        vin: '',
        placa: ''
    };
    //Buscar unidad por factura o vin 
    $scope.buscaUnidad = function () {
            if ($scope.datosUnidad.factura == '' && $scope.datosUnidad.vin == '' && $scope.datosUnidad.placa == '') {
                alertFactory.message('Advertencia', 'Seleccione al menos un criterio de busqueda');
            } else if ($scope.datosUnidad.factura != '' || $scope.datosUnidad.vin != '' || $scope.datosUnidad.placa != '') {
                $ionicLoading.show({
                    template: '<ion-spinner icon="bubbles" class="spinner-positive"></ion-spinner>'
                })
                busquedaRepository.buscaUnidad($scope.datosUnidad.factura, $scope.datosUnidad.vin, $scope.datosUnidad.placa)
                    .then(
                        function successCallback(response) {
                            if (response.data.length != 0) {
                                $scope.infoUnidad = response.data;
                                $ionicLoading.hide()
                                $scope.datosUnidad = {
                                    factura: '',
                                    vin: '',
                                    placa: ''
                                };
                            } else {
                                $ionicLoading.hide()
                                alertFactory.message('Advertencia', 'No fue encontrada ninguna unidad con el vin o factura ingresada');
                                $scope.datosUnidad = {
                                    factura: '',
                                    vin: ''
                                };
                            }
                        },
                        function errorCallback(response) {
                            $ionicLoading.hide()
                            alertFactory.message('Error', 'No hay conexión ');
                        }
                    );
            }

        }
        //Ir con los datos de la unidad dependiendo del vin elegido 
    $scope.irCargarDocumentos = function (unidad) {
        sessionFactory.vinUnidad = unidad;
        //window.location = "cargardocumentos.html";
        $state.go('cargardocumentos');
        //$state.reload();
        //location.href = '#/cargardocumentos';
    }

});