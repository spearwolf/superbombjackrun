(function(){
    "use strict";

    var canvas, ctx, shouldResize, stats;

    function resize() {
        var win_width = window.innerWidth
          , win_height = window.innerHeight
          , dips = window.devicePixelRatio
          ;
        canvas.width = win_width * dips;
        canvas.height = win_height * dips;
        canvas.style.width = win_width + 'px';
        canvas.style.height = win_height + 'px';

        console.log('canvas size is', canvas.width, 'x', canvas.height, 'px');
    }

    function init() {
        canvas = document.createElement('canvas');
        canvas.screencanvas = true;  // => CocoonJS
        ctx = canvas.getContext('2d');

        resize();
        document.body.appendChild(canvas);

        window.addEventListener('resize', function(){
            shouldResize = true;
        });

        if (!navigator.isCocoonJS) {  // => CocoonJS
            stats = new Stats();
            stats.setMode(0);
            stats.domElement.style.position = "absolute";
            stats.domElement.style.top = "0";
            stats.domElement.style.left = "0";
            document.body.appendChild(stats.domElement);
        }
    }

    function loop() {
        loop.run();
        if (shouldResize) {
            resize();
            shouldResize = false;
        }
        if (stats) {
            stats.begin();
        }
        idle();
        if (stats) {
            stats.end();
        }
    }

    loop.run = function() {
        window.requestAnimationFrame(loop);
    };

    function clear() {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }

    function idle() {
        clear();

        ctx.fillStyle = "rgb(255,0,128)";
        ctx.fillRect(0, 0, canvas.width>>1, canvas.height>>1);
    }

    init();
    loop.run();

})();
