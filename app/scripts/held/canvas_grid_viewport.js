(function(root){
    "use strict";

    function range(x, xMin, xMax) {
        return x < xMin ? xMin : (x > xMax ? xMax : x);
    }

    root.createViewport = function(canvasGrid) {

        var api = {
            canvasGrid: canvasGrid,
            x: 0,
            y: 0
        };

        api.setTargetCanvas = function(canvas, ctx, x, y, w, h) {
            if (!api.target) {
                api.target = {};
            }

            api.target.canvas = canvas;
            api.target.ctx = ctx;
            api.target.x = x;
            api.target.y = y;
            api.target.w = w;
            api.target.h = h;

            return api;
        }

        api.setViewportSize = function(w, h) {
            api.w = w;
            api.h = h;
            return api;
        };

        api.setViewPosition = function(x, y) {
            var hw = api.target.w >> 1;
            var hh = api.target.h >> 1;
            api.x = range(x, hw, api.w - hw) - hw;
            api.y = range(y, hh, api.h - hh) - hh;
            return api;
        };

        api.draw = function() {
            api.canvasGrid.renderTo(api.target.canvas, api.x, api.y, api.w, api.h);
        };

        return api;
    };

})(module.exports);
