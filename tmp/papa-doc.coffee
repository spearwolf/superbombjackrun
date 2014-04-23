papa = require './papa'


papa.Module "foo.bar", ->
    hello: -> "hello"

papa.Module "foo", (exports) ->
    exports.plah = -> "kaplha!"


papa.Factory 'a.person', ->
    (api) ->
        api.getPersonType = -> "personA"


papa.Factory 'b.person', ->

    namespace: "pers.on"

    extend: (api, self) ->
        api.getName = -> self.name



obj = papa.Factory.Include "a.person", name: 'fufu'
obj.name                                                        # => "fufu"
obj.getPersonType()                                             # => "personA"

obj.Factory.Include "b.person", obj                             # include another mixin
obj.pers.on.getName()                                           # => "fufu"

obj2 = papa.Factory.Create ["a.person", "b.person"]             # different way to create a
obj2.name = "fufu"                                              #   object like above

papa.Factory.Include ["foo", "bar", "plah.foo"], {}             # Include() and Create() both support
                                                                #   arrays

# ### TODO
# - explain papa.Factor.Create(.., true)
# - Factory Alias
papa.Factory 'my.alias', ["foo", "bar", "plah"]
# ### DONE
# - store which mixins included
obj.papa.mixins  # => ["foo", "bar"]



papa.App (app) ->
    console.log 'hello from', app.papa.name


papa.App "foo.bar.app", (app) ->
    console.log 'hello from', app.papa.name


myApp = papa.App 'foo.bar.app'


papa.App "my.app", (app) ->

    app.on 'setup', ->
        console.log 'setup from', app.papa.name
        console.log 'setup from', @papa.name


papa.App('my.app').emit 'setup'


