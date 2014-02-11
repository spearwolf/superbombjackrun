
module.exports = class BasicCanvas

    constructor: (@options = {}) ->
        @canvas = document.createElement 'canvas'
        @ctx = @canvas.getContext "2d"

        if @options.width? and @options.height?
            @setSize @options.width, @options.height

        @appendTo(@options.appendTo) if @options.appendTo?

    setSize: (@width, @height) ->
        @canvas.width = @width
        @canvas.height = @height
        mp = @width * @height
        if mp > 5000000
            mp = Math.round(mp * 10) / 10.0
            console.log "WARN canvas size of #{@width}x#{@height} ~#{mp}MP might be too big for mobile devices!"

    appendTo: (@parent) ->
        @parent = document.getElementById(@parent) if typeof @parent is 'string'
        @parent.appendChild @canvas
        unless @width? and @height?
            [@width, @height] = [@canvas.width, @canvas.height]

    fillRect: -> @ctx.fillRect 0, 0, @width, @height

    imageData: (pixelData) ->
        if pixelData
            @ctx.putImageData pixelData, 0, 0
        else
            @ctx.getImageData 0, 0, @width, @height

