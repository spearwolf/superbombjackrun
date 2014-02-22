(function(){
    "use strict";

    var held = window.held = require('./held');

    held.resize(function(w, h) {
        console.log('canvas size => ['+w+'x'+h+']');
    });

    held.init(['assetsManager', function(assets) {
        assets.addImage('assets/gfx/tileset10.png', 6, 'tileset1');
        assets.addImage('images/tileset1.png', 6);
    }]);

    held.idle(['ctx', 'width', 'height', 'clearBg', 'assetsManager',
                function(ctx, w, h, clearBg, assets) {

        var img = assets.getImage('tileset1');

        clearBg();
        img.draw(ctx, (w - img.width)>>1, (h - img.height)>>1);
    }]);

    held.start();
})();
