(function(api){
    "use strict";

    var hydra = require('./core')
      , $h = hydra.context()
      ;

    hydra.BasicCanvas = require('./basic_canvas.coffee');
    hydra.BasicCanvas.fromImage = require('./basic_canvas_from_image');

    hydra.CanvasGrid = require('./canvas_grid.coffee');


    //hydra.context('clearBackground', ['ctx', 'width', 'height', function(ctx, w, h) {
        //ctx.save();
        //ctx.setTransform(1, 0, 0, 1, 0, 0);
        //ctx.clearRect(0, 0, w, h);
        //ctx.restore();
    //}]);

    hydra.factory('clearBackground', function() {
        return function() {
            this.ctx.save();
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.restore();
        };
    });


    hydra.resize = function() {

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

            hydra.emit('resize', pixel_width, pixel_height);
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
