appControllers.controller('loginController', function ($scope, $rootScope, $state, $ionicLoading, loginRepository, alertFactory, sessionFactory) {
    $scope.usuario = this;

    //Iniciar Sesión
    $scope.login = function () {
        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles" class="spinner-positive"></ion-spinner>'
        })
        loginRepository.login($scope.usuario.correo, $scope.usuario.password)
            .then(
                function successCallback(response) {
                    $scope.datoUsuario = response.data;
                    sessionFactory.datosUsuario = $scope.datoUsuario;

                    if ($scope.datoUsuario == null) {
                        $ionicLoading.hide()
                        alertFactory.message('Advertencia', 'Usuario y/o contraseña incorrecto');
                        $scope.usuario.correo = '';
                        $scope.usuario.password = '';
                    } else if ($scope.datoUsuario != null) {
                        $ionicLoading.hide()
                        $state.go('busqueda');
                    }
                },
                function errorCallback(response) {
                    $ionicLoading.hide()
                    alertFactory.message('Error', 'No hay conexión ');
                }
            );
    };
});