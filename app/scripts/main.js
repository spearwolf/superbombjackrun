(function(){
    "use strict";

    var hydra = window.hydra = require('./hydra');

    hydra.on('resize', function(w, h){
        console.log('canvas size => ['+w+'x'+h+']');
    });

    hydra.on('resize', ['clearBackground', 'ctx', function(clearBg, ctx, width, height){
        clearBg();

        //var hW = width>>1
          //, hH = height>>1
          //;

        //ctx.fillStyle = "rgb(255,0,128)";
        //ctx.fillRect(0, 0, hW, hH);

        //ctx.fillStyle = "rgb(128,0,255)";
        //ctx.fillRect(hW, hH, hW, hH);
    }]);


    hydra.BasicCanvas.fromImage('images/tileset1.png', 6).then(function(tileset){

        hydra.on('idle', ['ctx', function(ctx) {
            ctx.drawImage(tileset.canvas, 200, 100, tileset.width, tileset.height);
        }]);

        hydra.run2d();
    });

})();
