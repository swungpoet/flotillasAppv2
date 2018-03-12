// Ionic Starter App

//BASE DE DATOS
var db = null;
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives', 'app.services', 'ngCordova'])

.run(function ($ionicPlatform, $cordovaSQLite, $ionicPopup) {
    $ionicPlatform.ready(function () {
        //Sin Internet activado en el dispositivo
        if (window.Connection) {
            if (navigator.connection.type == Connection.NONE) {
                $ionicPopup.confirm({
                        title: "Internet Desconectado",
                        content: "El internet no esta activado en tu dispositivo."
                    })
                    .then(function (result) {
                        if (!result) {
                            ionic.Platform.exitApp();
                        }
                    });
            }
        }
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        if (window.cordova) {
            // App syntax
            db = $cordovaSQLite.openDB({
                name: "flotillas.db",
                iosDatabaseLocation: 'default'
            });

        } else {
            // Ionic serve syntax
            db = window.openDatabase("flotillas.db", "1.0", "flotillas mobile", -1);
        }
        //Wait for open DB
        setTimeout(function () {
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS fotos(id integer primary key, imagen text ,nomFoto text, idDocumento integer, vin text)")
                .then(function (res) {
                    console.log('tabla fotos creada.');
                }, function (err) {
                    console.log(err);
                });
        }, 500);
    });
})