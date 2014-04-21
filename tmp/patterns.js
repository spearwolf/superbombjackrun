
// import library
var held = require('./held');

// create module: "held.foo"
held.module('foo', function() {
    return {
        bar: 23
    };
});
// => held.foo.bar

// global event hooks
var eventId = held.on('init', function() { /* .. */ });
held.off(eventId);

// create app
held.app(function(app) {

    // app API
    app.on('event', function(){ /* .. */})

    //app.ctx
    //app.ctx.width
    //app.ctx.height
});

// create factory: object-type extensions
held.factory('canvas', function(o) {
    return {
        foo: function() {
        }
    };
});

// extend object
obj = held.extendObject('canvas', obj);



var api = {};
function _extendObject(obj) {
    
}


