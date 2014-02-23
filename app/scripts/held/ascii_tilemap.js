(function(root){
    "use strict";

    var CanvasGrid = require('./canvas_grid.coffee').CanvasGrid;

    root.create = function() {

        var api = {
            tileWidth: 0,
            tileHeight: 0,
            pixelWidth: 0,
            pixelHeight: 0,
            tileSize: 0,
            tileset: null,
            tilemap: [],
            canvasGrid: null,
            charTileMap: {
                ' ': 'ground',
                '.': 'nowhere',
                ',': 'marble',
                '_': 'stone',
                '#': 'stonewall',
                'A': 'stonewall-door'
            }
        };

        api.setMapData = function(mapData) {
            api.tilemap = mapData;
            api.tileWidth = mapData[0].length;
            api.tileHeight = mapData.length;
            return api;
        };

        api.setTileset = function(tileset) {
            api.tileset = tileset;
            api.tileSize = tileset.getFirstFrame().w;
            return api;
        };

        api.createCanvasGrid = function() {
            if (api.canvasGrid) return api;

            api.pixelWidth = api.tileWidth * api.tileSize;
            api.pixelHeight = api.tileHeight * api.tileSize;

            api.canvasGrid = new CanvasGrid(api.tileWidth, api.tileHeight, api.tileSize);
            api.drawAll();

            return api;
        };

        api.drawAll = function() {
            var x, y, c, tile;
            for (y = 0; y < api.tilemap.length; y++) {
                for (x = 0; x < api.tilemap[y].length; x++) {
                    c = api.tilemap[y][x];
                    tile = api.tileset.frame(api.charTileMap[c]);
                    api.canvasGrid.renderTile(x, y, api.tileset.image.canvas, tile.x, tile.y);
                }
            }
        };

        return api;
    };

})(module.exports);
