(function(root){
    "use strict";

    function _range(x, xMin, xMax) {
        return x < xMin ? xMin : (x > xMax ? xMax : x);
    }

    root.createViewport = function(canvasGrid) {

        var api = {
            canvasGrid: canvasGrid,
            x: 0,
            y: 0
        };

        api.setTarget = function(canvas, x, y, w, h) {
            api.target = {
                canvas: canvas,
                x: x,
                y: y,
                w: w,
                h: h
            };
            return api;
        }

        api.setViewportSize = function(w, h) {
            api.width = w;
            api.height = h;
            //api.zoom = 1;
        };

        //api.setPosition = function(x, y) {
            //var w = api.width - ;
            //api.x = _range1(x, w, 0, w);
        //};

        return api;
    };

})(module.exports);
