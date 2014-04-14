(function(api){
    "use strict";

    var held = require('./core');

    held.factory('clearBg', function() {
        return function() {
            this.ctx.save();
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.restore();
        };
    });

})(module.exports);
