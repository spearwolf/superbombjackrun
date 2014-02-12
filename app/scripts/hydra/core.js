(function(api){
    "use strict";

    var callbacks = { _id: 0 }
      , context = {}
      , services = {}
      ;

    api.on = function(eventName, prio, fn) {

        if (arguments.length === 2) {
            fn = prio;
            prio = 0;
        }

        var eventListener = callbacks[eventName] || (callbacks[eventName] = [])
          , fnId = ++callbacks._id
          ;

        eventListener.push({ id: fnId, fn: fn, prio: (prio||0) });
        eventListener.sort(function(a,b){
            return b.prio - a.prio;
        });

        return fnId;
    };

    api.off = function(id) {
        var k, i, cb;
        for (k in callbacks) {
            if (callbacks.hasOwnProperty(k)) {
                for (i = 0; i < callbacks[k].length; i++) {
                    cb = callbacks[k][i];
                    if (cb.id === id) {
                        callbacks[k].splice(i, 1);
                        return;
                    }
                }
            }
        }
    };

    api.emit = function(eventName /* arguments.. */) {
        var args = Array.prototype.slice.call(arguments, 1);
        if (eventName in callbacks) {
            callbacks[eventName].forEach(function(cb){
                api.apply(cb.fn, args);
            });
        }
    }

    api.context = function(name, value) {
        if (arguments.length === 2) {

            if (value instanceof Array && typeof value[value.length - 1] === 'function') {
                context[name] = function() {
                    return api.apply(value, arguments);
                };
            } else {
                context[name] = value;
            }

        } else if (arguments.length === 1) {
            return context[name];
        } else {
            return context;
        }
    };

    api.apply = function(callback, args) {
        var ctx = callback.$h || context;

        if (args && args.length === 0) {
            args = undefined;
        }

        if (typeof callback === 'function') {
            return callback.apply(ctx, args);

        } else if (callback.length) {
            var args0 = [], _arg, service;
            for (var i= 0; i < callback.length; i++) {
                if (i < callback.length - 1) {

                    if (callback[i] === '$h') {
                        _arg = context;
                    } else if (!!(service = services[callback[i]])) {
                        _arg = service;
                    } else {
                        _arg = ctx[callback[i]];
                    }

                    args0.push(_arg);

                } else {
                    return callback[i].apply(ctx, args ? args0.concat(args) : args0);
                }
            }
        }
    };

    api.run = function(callback) {
        return api.apply(callback, Array.prototype.slice.call(arguments, 1));
    };

    api.factory = function(name, callback) {
        var ctx = Object.create(context);
        callback.$h = ctx;

        var service = {
            name: name,
            context: ctx,
            api: api.run(callback)
        }
        return services[name] = service;
    };


})(module.exports);
