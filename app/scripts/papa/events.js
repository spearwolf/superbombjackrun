(function(){
	var papa = require('./papa');

	papa.Factory('events', function() {

		var callbacks = { _id: 0 };

		return function(api) {

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
				var instance = api;
				if (api.papa && typeof api.papa.GetInstance === 'function') {
					instance = api.papa.GetInstance();
				}
				var args = Array.prototype.slice.call(arguments, 1);
				if (eventName in callbacks) {
					callbacks[eventName].forEach(function(cb){
						cb.fn.apply(instance, args);
					});
				}
			};

		};
	});
})();
