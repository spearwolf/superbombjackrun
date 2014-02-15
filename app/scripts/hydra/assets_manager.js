(function(api){
    "use strict";

    var hydra = require('./core')
      , BasicCanvas = require('./basic_canvas.coffee')
      ;

    function AssetManagerException(message) {
        this.message = message;
        this.name = 'AssetManagerException';
    }

    hydra.factory('assetsManager', ['$h', function($h){

        var api = {
            $image: {}
        };

        api.addImage = function(path, pixelZoom, name) {
            var _name = name || path;
            if (api.$image[_name]) {
                throw new AssetManagerException('image already exists! name=' + _name);
            }
            api.$image[_name] = {
                promise: BasicCanvas.fromImage(path, pixelZoom)
            };
            api.$image[_name].promise.then(function(basicCanvas) {
                api.$image[_name] = basicCanvas;
                console.log('AssetManager', 'image loaded, name=', _name, 'path=', path, 'data=', basicCanvas);
            });
        };

        api.waitForAll = function(){
            var all = Object.keys(api.$image).map(function(name){
                return api.$image[name].promise;
            }).filter(function(p){
                return !!p;
            });
            return Q.all(all);
        };

        api.get = function(name) {
            return api.$image[name];
        };

        return api;
    }]);

})(module.exports);
