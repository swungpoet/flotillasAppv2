appServices.factory('loginRepository', function ($http, configurationFactory) {

    var loginRepositoryGlobal = configurationFactory.globalAPI + 'usuarioapi/';

    return {
        login: function (usuario, password) {
            return $http({
                url: loginRepositoryGlobal,
                method: "POST",
                params: {
                    id: '3|' + usuario + '|' + password
                }
            });
        }
    };
});