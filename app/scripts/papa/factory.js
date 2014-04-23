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

		function _extend(objectTypeName, apiInstance) {
			var api;
			var instance = apiInstance;
			if (apiInstance.papa && apiInstance.papa.instance) {
				instance = apiInstance.papa.instance;
			}

			var _factories = factories[objectTypeName];
			if (Array.isArray(_factories) && _factories.length > 0) {

				if (!apiInstance.papa) {
					apiInstance.papa = {};
				}
				if (!apiInstance.papa.mixins) {
					apiInstance.papa.mixins = [objectTypeName];
				} else {
					if (apiInstance.papa.mixins.indexOf(objectTypeName) > -1) {
						return;
					}
					apiInstance.papa.mixins.push(objectTypeName);
				}

				_factories.forEach(function(factory) {
					if (typeof factory === 'function') {
						factory(apiInstance, instance);
					} else if (typeof factory === 'object') {
						if (typeof factory.extend === 'function') {
							if (typeof factory.namespace === 'string') {
								api = papa.Module.CreateObjPath(factory.namespace, apiInstance);
								factory.extend(api, instance);
							} else {
								factory.extend(apiInstance, instance);
							}
						}
					}
				});
			}
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
