(function(api){
    "use strict";

    var held = require('./core');

    held.factory('http', function(){

        var http = {};

        http.getJson = function(url) {

            var deferred = Q.defer()
              , request = new XMLHttpRequest
              ;

            request.open('GET', url, true);

            request.onload = function() {
                if (request.status >= 200 && request.status < 400){
                    // Success!
                    deferred.resolve(JSON.parse(request.responseText));
                } else {
                    // We reached our target server, but it returned an error
                }
            };

            request.onerror = function() {
                // There was a connection error of some sort
            };

            request.send();

            return deferred.promise;
        }

        return http;
    });

})(module.exports);
