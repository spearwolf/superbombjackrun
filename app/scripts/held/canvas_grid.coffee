
BasicCanvas = require './basic_canvas.coffee'

MAX_GRID_CANVAS_SIZE = 1024

module.exports.CanvasGrid = class CanvasGrid

    constructor: (@width, @height, @tileSize, @maxGridCanvasSize = MAX_GRID_CANVAS_SIZE) ->

        maxCanvasTileSize = (@maxGridCanvasSize / @tileSize)|0
        @gridWidth = Math.ceil(@width / maxCanvasTileSize)|0
        @gridHeight = Math.ceil(@height / maxCanvasTileSize)|0
        @gridPixelSize = maxCanvasTileSize * @tileSize
        gridTileSizeLastX = @width - ((@gridWidth - 1) * maxCanvasTileSize)
        gridTileSizeLastY = @height - ((@gridHeight - 1) * maxCanvasTileSize)
        @pixelWidth = @width * @tileSize
        @pixelHeight = @height * @tileSize


        # Build canvas grid
        # =================================================================

        @grid = []
        y0 = 0
        for y in [0..@gridHeight-1]
            x0 = 0
            for x in [0..@gridWidth-1]
                w = if x is @gridWidth - 1
                        gridTileSizeLastX * @tileSize
                    else
                        @gridPixelSize
                h = if y is @gridHeight - 1
                        gridTileSizeLastY * @tileSize
                    else @gridPixelSize
                i = x + y * @gridWidth

                @grid[i] =
                    canvas: new BasicCanvas(width: w, height: h)  #, appendTo: "canvas-container")
                    x0: x0
                    y0: y0
                    x1: (x0 + w - 1)
                    y1: (y0 + h - 1)
                    gx: x
                    gy: y

                x0 += w
                #console.debug "CanvasGrid.grid[#{i}]: (#{x}, #{y}) ->", @grid[i]
            y0 += h


        # Generate properties for all tiles
        # =================================================================

        @tileProps = []
        gridY = 0

        for y in [0..@height-1]
            @tileProps[y] = []
            gridX = 0
            gridY += 1 if y * @tileSize > @_grid(gridX, gridY).y1
            for x in [0..@width-1]
                gridX += 1 if x * @tileSize > @_grid(gridX, gridY).x1
                @tileProps[y][x] =
                    grid: @_grid gridX, gridY
                    x: x * @tileSize
                    y: y * @tileSize


    # Helper
    # =================================================================

    _grid: (gx, gy) -> @grid[(gy * @gridWidth) + gx]

    getCanvas: (tx, ty) -> @tileProps[ty][tx].grid.canvas  # => canvasGrid.tileProps[y][x].grid.canvas.ctx

    getGrid: (x, y) -> @_grid((x/@gridPixelSize)|0, (y/@gridPixelSize)|0)


    # Render
    # =================================================================

    renderTile: (tx, ty, tileCanvas, tileX, tileY) ->
        grid = @tileProps[ty][tx].grid
        grid.canvas.ctx.drawImage tileCanvas, tileX, tileY, @tileSize, @tileSize,
                                    (tx * @tileSize) - grid.x0, (ty * @tileSize) - grid.y0,
                                        @tileSize, @tileSize

    renderTo: (canvas, x, y, width, height) ->
        upperLeftGrid = @getGrid(x,  y)
        bottomRightGrid = @getGrid(x + width - 1, y + height - 1)
        if upperLeftGrid.gx is bottomRightGrid.gx and upperLeftGrid.gy is bottomRightGrid.gy
            x_ = x - upperLeftGrid.x0
            y_ = y - upperLeftGrid.y0
            canvas.ctx.drawImage upperLeftGrid.canvas.canvas,
                x_, y_, width, height,
                0, 0, width, height
        else
            #canvas.ctx.fillStyle = "rgba(0,255,0,0.5)"
            grid = null
            for gy in [upperLeftGrid.gy .. bottomRightGrid.gy]
                for gx in [upperLeftGrid.gx .. bottomRightGrid.gx]
                    grid = @_grid(gx, gy)

                    if gx is upperLeftGrid.gx
                        x_ = x - upperLeftGrid.x0
                        viewX = 0
                    else
                        x_ = 0
                        viewX = grid.x0 - x

                    if gy is upperLeftGrid.gy
                        y_ = y - upperLeftGrid.y0
                        viewY = 0
                    else
                        y_ = 0
                        viewY = grid.y0 - y

                    w_ = if gx is bottomRightGrid.gx
                            x + width - bottomRightGrid.x0 - x_
                        else
                            grid.canvas.width - x_
                    h_ = if gy is bottomRightGrid.gy
                            y + height - bottomRightGrid.y0 - y_
                        else
                            grid.canvas.height - y_

                    canvas.ctx.drawImage grid.canvas.canvas,
                        x_, y_, w_, h_,
                        viewX, viewY, w_, h_

                    #if not ((gx - upperLeftGrid.gx) % 2 is 1) isnt not ((gy - upperLeftGrid.gy) % 2 is 1)
                        #canvas.ctx.fillRect viewX, viewY, w_, h_

