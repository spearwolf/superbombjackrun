
held.factory('foo', function(){
    return {
        foo: ['width', 'height', function(w, h) {

        }]
    };
});


held.on('idle', function(){

    held.saveContext();

    held.ctx = ctx;
    held.width = 320;
    held.height = 240;
    held.pixelRatio = 4;

    drawView(mapView);

    held.restoreContext();


    held.changeContext({
        ctx: ctx2,
        width: 230,
        height: 240,
        pixelRatio: 4
    }, ["drawView", function(drawView) {
        drawView(mapView);
    }]);

});



held.app('foo', function(app){

    app.on('init', /* ... */);

    var myCtx = app('ctx');

    return { /* API */ };
});


held.start('foo');

