(function(){
    "use strict";

    module.exports = {
        extend: function(ctx) {

            var instance = Object.create(ctx);

            instance.draw = function(targetCanvasCtx, x, y) {
                targetCanvasCtx.drawImage(this.canvas, x, y, this.width, this.height);
            };

            return instance;
        }
    };
})();
