appServices.factory('alertFactory', ['$ionicPopup', function ($ionicPopup) {

    var interfaz = {};

    interfaz.message = function (title, text) {
        $ionicPopup.alert({
            title: title,
            template: text
        });
    };

    return interfaz;

}]);