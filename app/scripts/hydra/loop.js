(function(api){
    "use strict";

    var hydra = require('./core');

    hydra.loop = function() {
        var ctx = hydra.context();

        hydra.loop.run();

        if (ctx.shouldResize) {
            hydra.resizeCanvas();
            ctx.shouldResize = false;
        }

        ctx.try('stats', 'begin');
        hydra.emit('idle');
        ctx.try('stats', 'end');
    }

    hydra.loop.run = function() {
        window.requestAnimationFrame(hydra.loop);
    };

    hydra.start = function() {

        hydra.createMainCanvas('2d');
        hydra.createStatsWidget();

        hydra.emit('init');

        hydra.get('assetsManager').waitForAll().then(function(){
            hydra.loop.run();
        });
    };

})(module.exports);
