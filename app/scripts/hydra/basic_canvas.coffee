
module.exports = class BasicCanvas

    constructor: (@options = {}) ->
        @canvas = document.createElement 'canvas'
        @ctx = @canvas.getContext "2d"

        if @options.width? and @options.height?
            @setSize @options.width, @options.height

        @appendTo(@options.appendTo) if @options.appendTo?
        @fromImage(@options.fromImage) if typeof @options.fromImage is 'string'

    setSize: (@width, @height) ->
        @canvas.width = @width
        @canvas.height = @height
        if @width > 2048 and @height > 2048
            console.warn "canvas size of #{@width}x#{@height} might be too big for mobile devices!"

    appendTo: (@parent) ->
        @parent = document.getElementById(@parent) if typeof @parent is 'string'
        @parent.appendChild @canvas
        unless @width? and @height?
            [@width, @height] = [@canvas.width, @canvas.height]

    fromImage: (@imageUrl) ->
        @image = new Image
        @image.onload = =>
            @setSize @image.width, @image.height
            @ctx.drawImage @image, 0, 0, @width, @height
            if typeof @options.onLoad is 'function'
                @options.onLoad.call this
        @image.src = @imageUrl

    fillRect: -> @ctx.fillRect 0, 0, @width, @height


