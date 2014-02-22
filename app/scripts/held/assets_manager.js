(function(api){
    "use strict";

    var held = require('./core')
      , BasicCanvas = require('./basic_canvas.coffee')
      , canvasUtils = require('./canvas_utils.js')
      , tileset = require('./tileset.js')
      ;

    function AssetManagerException(message) {
        this.message = message;
        this.name = 'AssetManagerException';
    }

    held.factory('assetsManager', function(){

        var assets = {
            promise: {},
            image: {},
            tileset: {}
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

        function dirname(path) {
            var m = path.match(/(.*\/)[^\/]*$/);
            if (m) {
                return m[1];
            }
            return '';
        }

        assets.addTileset = function(path, name) {
            var _name = name || path;
            if (assets.tileset[_name]) {
                throw new AssetManagerException('tileset already exists! name=' + _name);
            }
            var fetchJson = held.get('http').getJson(path);
            assets.promise['tileset:'+_name] = fetchJson;
            var fetchImage = Q.defer();
            assets.promise['image:'+_name] = fetchImage.promise;
            //console.log('AssetManager', 'loading tileset', path);
            fetchJson.then(function(json){
                console.log('AssetManager', 'tileset json', json);
                var imagePath = dirname(path) + json.meta.image;
                console.log('AssetManager', 'tileset image', imagePath);
                BasicCanvas.fromImage(imagePath).then(function(basicCanvas) {
                    assets.image[json.meta.image] = canvasUtils.extend(basicCanvas);
                    assets.tileset[_name] = tileset.extend({
                        config: json,
                        image: basicCanvas
                    });
                    console.log('AssetManager', 'tileset loaded', assets.tileset[_name]);
                    fetchImage.resolve();
                });
            });
        };

        assets.waitForAll = function(){
            var all = Object.keys(assets.image).map(function(name){
                return assets.image[name].promise;
            }).concat(Object.keys(assets.promise).map(function(key){
                return assets.promise[key];
            })).filter(function(p){
                return !!p;
            });
            return Q.all(all);
        };

        assets.getImage = function(name) { return assets.image[name]; };
        assets.getTileset = function(name) { return assets.tileset[name]; };

        return assets;
    });

})(module.exports);
