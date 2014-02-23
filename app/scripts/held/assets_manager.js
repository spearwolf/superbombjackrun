(function(api){
    "use strict";

    var held = require('./core')
      , BasicCanvas = require('./basic_canvas.coffee')
      , canvasUtils = require('./canvas_utils.js')
      , tilesetUtils = require('./tileset_utils.js')
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

        function readArguments(path, name, pixelZoom) {
            var args = { path: path };
            if (typeof arguments[1] === 'number') {
                args.name = path;
                args.pixelZoom = name;
            } else if (typeof arguments[1] === 'string') {
                args.name = name;
                args.pixelZoom = pixelZoom || 1;
            }
            return args;
        }

        assets.addImage = function(path, name, pixelZoom) {
            var args = readArguments(path, name, pixelZoom);

            if (assets.image[args.name]) {
                throw new AssetManagerException('image already exists! name=' + args.name);
            }

            var fetchImage = BasicCanvas.fromImage(args.path, args.pixelZoom)
              , promiseName = 'image:' + args.name
              ;
            assets.promise[promiseName] = fetchImage;

            fetchImage.then(function(basicCanvas) {
                assets.image[args.name] = canvasUtils.extend(basicCanvas);
                console.log('AssetManager', 'image loaded, name=', args.name, 'path=', args.path, 'data=', basicCanvas);
                delete assets.promise[promiseName];
            });
        };

        function dirname(path) {
            var m = path.match(/(.*\/)[^\/]*$/);
            if (m) {
                return m[1];
            }
            return '';
        }

        assets.addTileset = function(path, name, pixelZoom) {
            var args = readArguments(path, name, pixelZoom);

            if (assets.tileset[args.name]) {
                throw new AssetManagerException('tileset already exists! name=' + args.name);
            }

            var fetchTilesetJson = held.get('http').getJson(args.path)
              , promiseTilesetName = 'tileset:' + args.name
              , promiseImageName = 'image:' + args.name
              , fetchImage = Q.defer()
              ;

            assets.promise[promiseTilesetName] = fetchTilesetJson;
            assets.promise[promiseImageName] = fetchImage.promise;

            fetchTilesetJson.then(function(json){
                console.log('AssetManager', 'tileset json', json);
                var imagePath = dirname(args.path) + json.meta.image;
                console.log('AssetManager', 'tileset image', imagePath);
                BasicCanvas.fromImage(imagePath, args.pixelZoom).then(function(basicCanvas) {
                    assets.image[json.meta.image] = canvasUtils.extend(basicCanvas);
                    assets.tileset[args.name] = tilesetUtils.extend({
                        config: json,
                        image: basicCanvas
                    });
                    tilesetUtils.setPixelZoom(json, args.pixelZoom);
                    console.log('AssetManager', 'tileset loaded', assets.tileset[args.name]);
                    fetchImage.resolve();
                    delete assets.promise[promiseImageName];
                });
                delete assets.promise[promiseTilesetName];
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
