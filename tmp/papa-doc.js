var papa = require('./papa');                           // import library

/* ===============
 * Module API
 * ===============
 */

papa.Module("foo.bar", function() {                     // create new module
    return {                                            //
        hello: function() { return "hello"; }           // => papa.foo.bar.hello
    };
});

papa.Module("foo", function(api) {                      // create new or append to existing module
                                                        //
    api.plah = function() {                             // => papa.foo.plah
        return "kaplha!";
    };
});


/* ===============
 * Mixin API
 * ===============
 */

// Step 1) Create Factory

papa.Factory('a.person', function() {                               // factory as function
    return function(instance) {                                     //
        instance.getPersonType = function() { return "personA"; };  // => <instance>.getPersonType()
    };
});

papa.Factory('b.person', function() {                           // factory as object
    return {                                                    //
        namespace: "pers.on",                                   // => namespace is optional
                                                                //
        extend: function(api, instance) {                       // if no namespace specified:
                                                                //          use function(instance)
            api.getType = function() { return "personB"; };     // => <instance>.pers.on.getType()
        }
    };
});

// Step 2) Use Factories to extend (or create) an object

var obj = papa.Factory.Include("a.person", { name: 'fufu' });
obj.name                                                        // => "fufu"
obj.getPersonType()                                             // => "personA"

obj.Factory.Include("b.person", obj);                           // include another mixin
obj.pers.on.getType()                                           // => "personB"

var obj2 = papa.Factory.Create(["a.person", "b.person"])        // different way to create a
obj2.name = "fufu";                                             //   object like above

papa.Factory.Include(["foo", "bar", "plah.foo"], {})            // Include() and Create() both support
                                                                //   arrays


/* ===============
 * App API
 * ===============
 */

papa.App(function(app) {                    // create an anonymous app
                                            // => app is your app instance
    console.log('hello from', app.name);    // every app has a name!
});

papa.App("foo.bar.app", function(app) {     // create app with name
    console.log('hello from', app.name);    // => "hello from foo.bar.app"
});

var myApp = papa.App.Get('foo.bar.app')     // => return app object for our "foo.bar.app" app


// App Events Example
// ------------------

var myApp = papa.App("my.app", function(app) {

    app.on('setup', function() {
        console.log('setup from', app.name);
    });

});

myApp.emit('setup');                        // => "setup from my.app"


