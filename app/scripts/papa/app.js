(function(){

	var papa = require('./papa');

	papa.Module('App', function() {

		var apps = {};
		var nextAppId = 0;

		function generateAppName() {
			return 'app' + nextAppId++;
		}

		function createAppSkeleton(name) {
			return Object.create({ name: name });
		}

		var api = function(name, callback) {

			if (arguments.length === 1) {
				callback = name;
				name = generateAppName();
			}

			var app = createAppSkeleton(name);
			apps[name] = app;

			callback(app);
		};

		api.Get = function(name) {
			return apps[name];
		};

		return api;
	});

})();
