(function(){
    "use strict";

    var held = module.exports = require('./held/core');

    require('./held/canvas');
    require('./held/loop');
    require('./held/assets_manager');
    require('./held/clear_bg');
    require('./held/draw_view');

    held.AsciiTilemap = require('./held/ascii_tilemap');


    var createViewport = require('./held/canvas_grid_viewport').createViewport

    held.AsciiTilemap.createViewport = function(asciiTilemap) {
        return createViewport(asciiTilemap.canvasGrid);
    };


    // shortcuts
    held.init = function() { return held.on('init', arguments[0]); };
    held.resize = function() { return held.on('resize', arguments[0]); };
    held.idle = function() { return held.on('idle', arguments[0]); };

})();
