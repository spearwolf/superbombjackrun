(function(api){
    "use strict";

    var hydra = require('./core')
      , $h = hydra.context()
      ;

    hydra.loop = function() {
        hydra.loop.run();

        if ($h.shouldResize) {
            hydra.resize();
            $h.shouldResize = false;
        }

        if ($h.stats) $h.stats.begin();

        hydra.emit('idle');

        if ($h.stats) $h.stats.end();
    }

    hydra.loop.run = function() {
        window.requestAnimationFrame(hydra.loop);
    };

    hydra.run2d = function() {

        hydra.createMainCanvas('2d');
        hydra.createStatsWidget();

        hydra.emit('init');

        hydra.loop.run();
    };

})(module.exports);
