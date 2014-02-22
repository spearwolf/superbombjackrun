
var BasicCanvas = require('./basic_canvas.coffee');


function pixelCopy(source, target) {

    var sourcePixel = source.imageData()
      , pixel = target.imageData()
      , w = target.width
      , h = target.height
      , sw = source.width
      , swFactor = sw / w
      , shFactor = source.height / h
      , x, y, sx, sy
      , si, pi
      ;

    for (y = 0; y < h; y++)
        for (x = 0; x < w; x++) {
            sx = (swFactor * x)|0;
            sy = (shFactor * y)|0;
            si = ((sy * sw) + sx) << 2;
            pi = ((y * w) + x) << 2;

            pixel.data[pi] = sourcePixel.data[si];
            pixel.data[pi+1] = sourcePixel.data[si+1];
            pixel.data[pi+2] = sourcePixel.data[si+2];
            pixel.data[pi+3] = sourcePixel.data[si+3];
        }

    target.imageData(pixel);
}


module.exports = function(imageUrl, pixelZoom) {

    var deferred = Q.defer()
      , image = new Image
      ;

    image.onload = function() {
        var bc = new BasicCanvas;
        bc.setSize(image.width, image.height);
        bc.ctx.drawImage(image, 0, 0, image.width, image.height);
        if (typeof pixelZoom === 'number' && pixelZoom !== 1) {
            var tmp = new BasicCanvas;
            tmp.setSize(image.width*pixelZoom|0, image.height*pixelZoom|0);
            pixelCopy(bc, tmp);
            bc = tmp;
        }
        deferred.resolve(bc);
    };

    image.src = imageUrl;

    return deferred.promise;
}

