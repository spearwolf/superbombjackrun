(function(){
    "use strict";

    module.exports = {
        extend: function(ctx) {

            var tileset = Object.create(ctx);

            tileset.frame = function(key) {
                return this.config.frames[key].frame;
            };

            tileset.drawTile = function(key, ctxTarget, x, y, w, h) {
                var frame = tileset.frame(key);
                ctxTarget.drawImage(this.image.canvas, frame.x, frame.y, frame.w, frame.h, x, y, w||frame.w, h||frame.h);
            };

            return tileset;
        },

        setPixelZoom: function(conf, pixelZoom) {
            pixelZoom = pixelZoom || 1;
            if (pixelZoom === 1) return;

            var key, frame;
            for (key in conf.frames) {
                if (conf.frames.hasOwnProperty(key)) {
                    frame = conf.frames[key].frame;
                    frame.x = (frame.x * pixelZoom)|0;
                    frame.y = (frame.y * pixelZoom)|0;
                    frame.w = (frame.w * pixelZoom)|0;
                    frame.h = (frame.h * pixelZoom)|0;
                }
            }
        }
    };
})();
