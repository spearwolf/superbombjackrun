(function(){
    "use strict";

    var hydra = window.hydra = require('./hydra');

    hydra.on('resize', function(w, h){
        console.log('canvas size => ['+w+'x'+h+']');
    });


    hydra.on('init', ['assetsManager', function(assets){

        assets.addImage('assets/gfx/tileset10.png', 6, 'tileset1');
        assets.addImage('images/tileset1.png', 6);

    }]);

    hydra.on('idle', ['ctx', 'width', 'height', 'clearBackground', 'assetsManager', function(ctx, w, h, clearBg, assets) {

        clearBg();

        var t1 = assets.get('tileset1');

        t1.draw(ctx, (w - t1.width)>>1, (h - t1.height)>>1);

    }]);

    hydra.start();

})();
