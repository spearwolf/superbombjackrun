(function(){

	var papa = require('./papa');

	papa.Module('App', function() {

		var apps = {};
		var nextAppId = 0;

		function generateAppName() {
			return 'app' + nextAppId++;
		}

		function createAppSkeleton(name) {
			return Object.create(papa.Factory.Include([
						"events"
					],
					{
						papa: {
							name: name,
							GetInstance: function() { return papa.App.Get(name); }
						}
					}));
		}

		var api = function(name, callback) {

			if (arguments.length === 1) {
				callback = name;
				name = generateAppName();
			}

			var app = createAppSkeleton(name);
			apps[name] = app;

			callback(app);

			return app;
		};

		api.Get = function(name) {
			return apps[name];
		};

		return api;
	});

})();
