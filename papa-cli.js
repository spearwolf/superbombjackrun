
var papa = require('./app/scripts/papa');
module.exports = papa;

papa.App(function(app){

	app.on('foo', function(){
		console.log('foo!!')
	});

	app.numberOfBeast = 666;

});

