(function(api){
    "use strict";

    var held = require('./core')
      , BasicCanvas = require('./basic_canvas.coffee')
      , canvasUtils = require('./canvas_utils.js')
      ;

    function AssetManagerException(message) {
        this.message = message;
        this.name = 'AssetManagerException';
    }

    held.factory('assetsManager', function(){

        var assets = {
            image: {}
        };

        assets.addImage = function(path, pixelZoom, name) {
            var _name = name || path;
            if (assets.image[_name]) {
                throw new AssetManagerException('image already exists! name=' + _name);
            }
            assets.image[_name] = {
                promise: BasicCanvas.fromImage(path, pixelZoom)
            };
            assets.image[_name].promise.then(function(basicCanvas) {
                assets.image[_name] = canvasUtils.extend(basicCanvas);
                console.log('AssetManager', 'image loaded, name=', _name, 'path=', path, 'data=', basicCanvas);
            });
        };

        assets.waitForAll = function(){
            var all = Object.keys(assets.image).map(function(name){
                return assets.image[name].promise;
            }).filter(function(p){
                return !!p;
            });
            return Q.all(all);
        };

        assets.getImage = function(name) {
            return assets.image[name];
        };

        return assets;
    });

})(module.exports);
