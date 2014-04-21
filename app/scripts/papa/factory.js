(function(){

	var papa = require('./papa');

	papa.Module('Factory', function() {

		var factories = {};

		var api = function(objectTypeName, callback) {
			if (!Array.isArray(factories[objectTypeName])) {
				factories[objectTypeName] = [];
			}
			factories[objectTypeName].push(callback());
		};

		function _extend(objectTypeName, instance) {
			var api;
			var _factories = factories[objectTypeName];
			if (Array.isArray(_factories) && _factories.length > 0) {
				_factories.forEach(function(factory) {
					if (typeof factory === 'function') {
						factory(instance);
					} else if (typeof factory === 'object') {
						if (typeof factory.extend === 'function') {
							if (typeof factory.namespace === 'string') {
								api = papa.CreateModulePath(factory.namespace, instance);
								factory.extend(api, instance);
							} else {
								factory.extend(instance);
							}
						}
					}
				});
			}
			return instance;
		}

		api.Include = function(objectTypeName, instance) {
			if (Array.isArray(objectTypeName)) {
				objectTypeName.forEach(function(typeName) {
					_extend(typeName, instance);
				});
			} else {
				_extend(objectTypeName, instance);
			}
			return instance;
		};

		api.Create = function(objectTypeName) {
			return api.Extend(objectTypeName, {});
		};

		return api;
	});

})();
