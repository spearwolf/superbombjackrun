(function(api){
    "use strict";

    var hydra = require('./core')
      , $h = hydra.context()
      ;

    hydra.BasicCanvas = require('./basic_canvas.coffee');
    hydra.CanvasGrid = require('./canvas_grid.coffee');

    hydra.context('clearBackground', function() {
        $h.ctx.save();
        $h.ctx.setTransform(1, 0, 0, 1, 0, 0);
        $h.ctx.clearRect(0, 0, $h.canvas.width, $h.canvas.height);
        $h.ctx.restore();
    });

    hydra.resize = function() {

        var win_width = window.innerWidth
          , win_height = window.innerHeight
          , pixel_ratio = window.devicePixelRatio || 1
          ;

        $h.devicePixelRatio = pixel_ratio;

        if ($h.canvas.width !== (win_width * pixel_ratio) ||
                $h.canvas.height !== (win_height * pixel_ratio)) {

            $h.width = win_width * pixel_ratio;
            $h.height = win_height * pixel_ratio;

            $h.canvas.width = $h.width;
            $h.canvas.height = $h.height;
            $h.canvas.style.width = win_width + 'px';
            $h.canvas.style.height = win_height + 'px';

            hydra.emit('resize', $h.width, $h.height);
        }
    };

    hydra.createMainCanvas = function(canvasContext) {

        var canvas = $h.canvas = document.createElement('canvas');
        if (navigator.isCocoonJS && canvasContext === '2d') {
            canvas.screencanvas = true;  // => CocoonJS
        }

        var ctx = $h.ctx = canvas.getContext(canvasContext);

        hydra.resize();
        document.body.appendChild(canvas);

        window.addEventListener('resize', function(){
            $h.shouldResize = true;
        });
    };

    hydra.createStatsWidget = function() {
        if (!navigator.isCocoonJS) {  // => CocoonJS
            var stats = $h.stats = new Stats();
            stats.setMode(0);
            stats.domElement.style.position = "absolute";
            stats.domElement.style.top = "0";
            stats.domElement.style.left = "0";
            document.body.appendChild(stats.domElement);
        }
    };

})(module.exports);
