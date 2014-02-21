(function(){
    "use strict";

    var hydra = window.hydra = require('./hydra');

    hydra.resize(function(w, h) {
        console.log('canvas size => ['+w+'x'+h+']');
    });

    hydra.init(['assetsManager', function(assets) {
        assets.addImage('assets/gfx/tileset10.png', 6, 'tileset1');
        assets.addImage('images/tileset1.png', 6);
    }]);

    hydra.idle(['ctx', 'width', 'height', 'clearBackground', 'assetsManager',
                function(ctx, w, h, clearBg, assets) {

        var img = assets.getImage('tileset1');

        clearBg();
        img.draw(ctx, (w - img.width)>>1, (h - img.height)>>1);
    }]);

    hydra.start();
})();
