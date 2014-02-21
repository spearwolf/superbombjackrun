(function(){
    "use strict";

    module.exports = require('./hydra/core');

    require('./hydra/canvas');
    require('./hydra/loop');
    require('./hydra/assets_manager');

    // shortcuts
    module.exports.init = function() { return module.exports.on('init', arguments[0]); };
    module.exports.resize = function() { return module.exports.on('resize', arguments[0]); };
    module.exports.idle = function() { return module.exports.on('idle', arguments[0]); };

})();
