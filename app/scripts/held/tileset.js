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
        }
    };
})();
