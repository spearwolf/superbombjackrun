(function(api){
    "use strict";

    var callbacks = { _id: 0 }
      , context = {}
      , serviceInstances = {}
      ;


    context.try = function(key, name) {
        if (context[key]) {
            if (typeof context[key][name] === 'function') {
                return context[key][name]();
            }
            return context[key][name];
        }
        return;
    };


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
    };

    api.context = function(name, value) {
        if (arguments.length === 2) {

            if (value instanceof Array && typeof value[value.length - 1] === 'function') {
                context[name] = function() {
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

    api.get = function(key, ctx) {
        var service;

        if (key === '$h') {
            return context;

        } else if (!!(service = serviceInstances[key])) {
            return service.api;

        } else {
            return (ctx || context)[key];
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
            var args0 = []
              , service
              ;
            for (var i= 0; i < callback.length; i++) {
                if (i < callback.length - 1) {
                    args0.push(api.get(callback[i], ctx));
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

        var instance = {
            name: name,
            context: ctx,
            api: api.run(callback)
        }

        instance.isFunction = typeof instance.api === 'function';
        if (instance.isFunction) {
            instance.api = instance.api.bind(instance.context);
        }

        return serviceInstances[name] = instance;
    };

})(module.exports);
