(function(){
    "use strict";

    var papa = require('./papa');


    papa.App(function(app) {

        var mapView;

        //app.assets.tileset('assets/gfx/tileset10.json', 'tileset10', 6);

        app.assets({
			tileset10: {
				type: 'tileset',
				path: 'assets/gfx/tileset10.json',
				pixelZoom: 6
			}
        });

        app.assets({
			tileset: {
				tileset10: {
					type: 'tileset',
					path: 'assets/gfx/tileset10.json',
					pixelZoom: 6
				}
			}
        });

        //app.on('setup', function() {
            //app.assets.addTileset('assets/gfx/tileset10.json', 'tileset10', 6);
        //});

        app.on('assetsLoaded', function() {

            var tileset = app.assets.getTileset('tileset10');
            var tilemap = held.AsciiTilemap.create()
                            .setTileset(tileset)
                            .setMapData([
                                    ". .. .   .   .   ...    ",
                                    " ,. #####        ... . .",
                                    "....#___#    .  .....   ",
                                    "....###A#     ........  ",
                                    ". ..  ...  . .. .. ..  .",
                                    "  ....... ... . .. .. .."
                                ])
                            .createCanvasGrid();

            mapView = held.AsciiTilemap.createViewport(tilemap);
        });

    }).start();

})();
