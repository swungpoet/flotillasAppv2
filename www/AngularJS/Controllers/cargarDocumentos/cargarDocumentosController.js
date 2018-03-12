appControllers.controller('cargardocumentosController', function($scope, $rootScope, $state, $ionicLoading, $cordovaCamera, $ionicModal, $cordovaFile, $cordovaFileTransfer, $stateParams, $ionicHistory, cargardocumentosRepository, alertFactory, sessionFactory, configurationFactory, fotosDBO, verificaRedRepository) {
    $scope.mostrarImagen = 0;
    $scope.nombreArchivo = this;

    //    $scope.model = this;
    //    $scope.model.recargar = $stateParams.recargar;
    //    $scope.$state = $state;
    //    $scope.$watch('$state.$current.locals.globals.recargar', function (recargar) {
    //        if (recargar != null) {
    //            alertFactory.message('Error', 'No hay conexión ');
    //        } else {
    //            $scope.model.recargar = 'hola';
    //        }
    //    });



    var arrayDocumentos = {};
    $scope.usuario = sessionFactory.datosUsuario;

    $scope.init = function() {
            getEncabezado();
        }
        //Carga la informacion para la información de la unidad
    var getEncabezado = function() {
            cargardocumentosRepository.getEncabezado(sessionFactory.vinUnidad.vin)
                .then(
                    function successCallback(response) {
                        $scope.encabezado = response.data;
                    },
                    function errorCallback(response) {
                        alertFactory.message('Error', 'No hay conexión ');
                    }
                );
        }
        //Carga el nombre de los archivos subidos para el tipo de documento 
    $scope.getListaDocumentos = function(iddocumento) {
            cargardocumentosRepository.getListaDocumentos(sessionFactory.vinUnidad.vin, iddocumento)
                .then(
                    function successCallback(response) {
                        $scope.listaDocumentos = response.data;
                        //arrayDocumentos[iddocumento] = $scope.listaDocumentos;
                        //console.log(arrayDocumentos);
                        $scope.mostrarBoton = iddocumento;
                    },
                    function errorCallback(response) {
                        alertFactory.message('Error', 'No hay conexión ');
                    }
                );
        }
        //Captura de foto con camara del celular
    $scope.tomaImagen = function() {
            var options = {
                //quality: 70,
                destinationType: Camera.DestinationType.FILE_URI,
                //destinationType: Camera.DestinationType.DATA_URL
                //destinationType: Camera.DestinationType.FILE_URI
                sourceType: Camera.PictureSourceType.CAMERA,
                //allowEdit: false,
                //encodingType: Camera.EncodingType.JPEG,
                targetWidth: 320,
                targetHeight: 320,
                //popoverOptions: CameraPopoverOptions,
                correctOrientation: true
                    //saveToPhotoAlbum: true
            };
            //imageData
            //$scope.srcImage = "datos: image / jpeg; base64," + imageData;
            //imageURI
            //$scope.srcImage = imageURI;
            $cordovaCamera.getPicture(options).then(function(imageURI) {
                $scope.mostrarImagen = 1;
                $scope.srcImage = imageURI;
            }, function(err) {
                alertFactory.message('Error', 'Error al capturar foto : ' + response.data);
            });
        }
        //Modal para la toma de foto 
    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    //Guardar Imagen en SQlite
    $scope.guardarURL = function(imagen, nombre, idDocumento) {
            $scope.guardarLiga = imagen;
            fotosDBO.add(imagen, nombre, idDocumento, sessionFactory.vinUnidad.vin)
                .then(function successCallback(response) {
                    //OnSuccess
                    $scope.mostrarImagen = 0;
                    $scope.nombreArchivo.nombre = '';
                    $scope.modal.hide()
                    alertFactory.message('Éxito', 'Foto preguardada');
                }, function errorCallback(response) {
                    //OnError
                    alertFactory.message('Error', 'Error al guardar url');
                });
        }
        //Eliminar almacenamiento temporal de la camara
    var eliminarMemoria = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="bubbles" class="spinner-positive"></ion-spinner>'
            })
            fotosDBO.removeAll()
                .then(function successCallback(response) {
                    //OnSuccess
                    $ionicLoading.hide()
                }, function errorCallback(response) {
                    //OnError
                    alertFactory.message('Error', 'Error al borrar tabla');
                });
        }
        //Subir las fotos tomadas con el celular al servidor 
    $scope.sincronizar = function() {
        var j = 0;
        fotosDBO.all()
            .then(function successCallback(response) {
                //OnSuccess
                $scope.datosFotoSubir = response;
                angular.forEach($scope.datosFotoSubir, function(value, key) {
                    verificaRedRepository.verficaRed();
                    if ($rootScope.network == true) {
                        CargaFotos($scope.datosFotoSubir[j].imagen, $scope.datosFotoSubir[j].nomFoto, $scope.datosFotoSubir[j].idDocumento, $scope.datosFotoSubir[j].vin);
                        j++;
                    } else {
                        alertFactory.message('Error', 'Verifica la red y vuelve a presionar Sincronizar');

                    }
                });
                if (response.length == j) {
                    eliminarMemoria();
                }
                //$ionicHistory.clearCache();
                $state.go('busqueda');
            }, function errorCallback(response) {
                //OnError                
            });

    }


    //            $ionicLoading.show({
    //                template: 'Sincronizando ' + sessionFactory.vinUnidad.vin
    //            });
    //            setTimeout(function () {
    //                $ionicLoading.hide();
    //                $state.go('busqueda');
    //            }, 15000);



    //Mostrar las imagenes para pruebas
    $scope.mostrarFotos = function() {
            fotosDBO.all()
                .then(function successCallback(response) {
                    //OnSuccess
                    $scope.probandoFotos = response;

                }, function errorCallback(response) {
                    //OnError
                    alertFactory.message('Error', 'Error al conseguir las fotos');
                });
        }
        //Funcion para subir las fotos 
    var CargaFotos = function(imagen, nomFoto, idDocumento, vin) {
            if (nomFoto != '') {
                $scope.nomFoto = nomFoto;
            } else {
                $scope.nomFoto = idDocumento;
            }
            var options = {
                fileKey: idDocumento + "|" + vin + "|" + $scope.usuario.idUsuario,
                fileName: $scope.nomFoto + ".jpg",
                chunkedMode: false,
                mimeType: "image/jpeg",
                targetWidth: 100,
                targetHeight: 100
            };
            var nuevaUrl = imagen.split('///');
            //http://192.168.20.18:3500/api/documentos/uploadfile/
            //http://192.168.20.9:3500/api/documentos/uploadfile/
            //http://189.204.141.193/
            $cordovaFileTransfer.upload("http://189.204.141.193:3500/api/documentos/uploadfile/", nuevaUrl[1], options).then(function(result) {
                console.log("SUCCESS: " + JSON.stringify(result.response));
                $ionicLoading.hide()
            }, function(err) {
                console.log("ERROR: " + JSON.stringify(err));
                $ionicLoading.hide()
            }, function(progress) {
                // constant progress updates
            });
        }
        //Mostrar los documentos 
    $scope.mostrarDocumento = function(iddocumento, valor, vin, consecutivo) {
        var ext = valor.substring(valor.length - 4, valor.length)
        if (ext == '.jpg') {
            $scope.type = "image/jpg";
        } else if (ext == '.png') {
            $scope.type = "image/png";
        } else {
            $scope.type = "application/pdf";
        }

        if (consecutivo == null || consecutivo == '') {
            $scope.ruta = configurationFactory.downloadPath + sessionFactory.vinUnidad.vin + '/' + iddocumento + ext;
        } else {
            $scope.ruta = configurationFactory.downloadPath + sessionFactory.vinUnidad.vin + '/' + iddocumento + '_' + consecutivo + ext;
        }
        $ionicModal.fromTemplateUrl('mostrarArchivos.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.miModal = modal;
            $scope.miModal.show();
        });

    }

});
