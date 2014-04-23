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
			var objInstance = instance;
			if (instance.papa && instance.papa.instance) {
				objInstance = instance.papa.instance;
			}
			var api;
			var _factories = factories[objectTypeName];
			if (Array.isArray(_factories) && _factories.length > 0) {
				_factories.forEach(function(factory) {
					if (typeof factory === 'function') {
						factory(instance, objInstance);
					} else if (typeof factory === 'object') {
						if (typeof factory.extend === 'function') {
							if (typeof factory.namespace === 'string') {
								api = papa.Module.CreateObjPath(factory.namespace, instance);
								factory.extend(api, objInstance);
							} else {
								factory.extend(instance, objInstance);
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

		api.Create = function(objectTypeName, newScopeInheritance) {
			if (newScopeInheritance) {
				var apiInstance = { papa: {} };
				var instance = Object.create(apiInstance);
				apiInstance.papa.instance = instance;
				apiInstance.papa.apiInstance = apiInstance;
				api.Include(objectTypeName, apiInstance);
				return instance;
			} else {
				return api.Include(objectTypeName, {});
			}
		};

		return api;
	});

})();
