(function(api){
    "use strict";

    var held = require('./core');

    held.loop = function() {
        var ctx = held.context();

        held.loop.run();

        if (ctx.shouldResize) {
            held.resizeCanvas();
            ctx.shouldResize = false;
        }

        ctx.try('stats', 'begin');
        held.emit('idle');
        ctx.try('stats', 'end');
    }

    held.loop.run = function() {
        window.requestAnimationFrame(held.loop);
    };

    held.start = function() {

        held.createMainCanvas('2d');
        held.createStatsWidget();

        held.emit('init');

        held.get('assetsManager').waitForAll().then(function(){
            held.loop.run();
        });
    };

})(module.exports);
