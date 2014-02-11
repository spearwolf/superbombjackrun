(function(api){
    "use strict";

    var callbacks = { _id: 0 }
      , context = {}
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

        //console.log(eventName, eventListener);

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
                //cb.fn.apply(context, args);
                api.apply(cb.fn, args);
            });
        }
    }

    api.context = function(name, value) {
        if (arguments.length === 2) {
            context[name] = value;
        } else if (arguments.length === 1) {
            return context[name];
        } else {
            return context;
        }
    };

    api.apply = function(callback, args) {

        if (args && args.length === 0) {
            args = undefined;
        }

        if (typeof callback === 'function') {
            callback.apply(context, args);

        } else if (callback.length) {
            var args0 = [], _arg;
            for (var i= 0; i < callback.length; i++) {
                if (i < callback.length - 1) {
                    if (callback[i] === '$h') {
                        _arg = context;
                    } else {
                        _arg = context[callback[i]];
                    }
                    args0.push(_arg);
                } else {
                    callback[i].apply(context, args ? args0.concat(args) : args0);
                }
            }
        }
    };

    api.call = function(callback) {
        api.apply(callback, Array.prototype.slice.call(arguments, 1));
    };


})(module.exports);
