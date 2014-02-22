(function(api){
    "use strict";

    var held = require('./core')
      , $h = held.context()
      ;

    held.BasicCanvas = require('./basic_canvas.coffee');
    held.BasicCanvas.fromImage = require('./basic_canvas_from_image');

    held.CanvasGrid = require('./canvas_grid.coffee');


    held.factory('clearBg', function() {
        return function() {
            this.ctx.save();
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.restore();
        };
    });


    held.resizeCanvas = function() {

        var win_width = window.innerWidth
          , win_height = window.innerHeight
          , pixel_ratio = window.devicePixelRatio || 1
          , pixel_width = win_width * pixel_ratio
          , pixel_height = win_height * pixel_ratio
          ;

        $h.devicePixelRatio = pixel_ratio;

        if ($h.canvas.width !== pixel_width || $h.canvas.height !== pixel_height) {

            $h.width = $h.canvas.width = pixel_width;
            $h.height = $h.canvas.height = pixel_height;

            $h.canvas.style.width = win_width + 'px';
            $h.canvas.style.height = win_height + 'px';

            held.emit('resize', pixel_width, pixel_height);
        }
    };

    held.createMainCanvas = function(canvasContext) {

        var canvas = $h.canvas = document.createElement('canvas');
        if (navigator.isCocoonJS && canvasContext === '2d') {
            canvas.screencanvas = true;  // => CocoonJS
        }

        var ctx = $h.ctx = canvas.getContext(canvasContext);

        held.resizeCanvas();
        document.body.appendChild(canvas);

        window.addEventListener('resize', function(){
            $h.shouldResize = true;
        });
    };

    held.createStatsWidget = function() {
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
