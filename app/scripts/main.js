(function(){
    "use strict";

    var held = window.held = require('./held');

    held.resize(function(w, h) {
        console.log('canvas size => ['+w+'x'+h+']');
    });

    held.init(['assetsManager', function(assets) {
        //assets.addImage('assets/gfx/tileset10.png', 6, 'tileset1');
        assets.addImage('images/tileset1.png', 6, 'tileset1');
        assets.addTileset('assets/gfx/tileset10.json', 'tileset10');
    }]);

    held.on('init:after', ['assetsManager', function(assets) {

        var img = assets.getImage('tileset1');
        var tileset = assets.getTileset('tileset10');

        console.log('tileset10 ground', tileset.frame('ground'));


        held.idle(['ctx', 'width', 'height', 'clearBg', function(ctx, w, h, clearBg) {

            clearBg();

            img.draw(ctx, (w - img.width)>>1, (h - img.height)>>1);

            tileset.drawTile('stonewall', ctx, 100, 100, 200, 200);
        }]);
    }]);

    held.start();
})();
