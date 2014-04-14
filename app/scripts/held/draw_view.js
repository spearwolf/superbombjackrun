(function(api){
    "use strict";

    var held = require('./core');

    held.factory('drawView', function() {
        return function(viewport) {
            viewport.setTarget(this).setViewportSize(this.width, this.height).draw();
        };
    });

})(module.exports);
