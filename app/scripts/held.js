(function(){
    "use strict";

    module.exports = require('./held/core');

    require('./held/canvas');
    require('./held/loop');
    require('./held/assets_manager');

    // shortcuts
    module.exports.init = function() { return module.exports.on('init', arguments[0]); };
    module.exports.resize = function() { return module.exports.on('resize', arguments[0]); };
    module.exports.idle = function() { return module.exports.on('idle', arguments[0]); };

})();
