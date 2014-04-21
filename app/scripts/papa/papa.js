(function(papa){
	"use strict";

	papa.CreateModulePath = function(name, root) {
		var path = name.split('.');
		var cur = root;
		var i, next;
		for (i = 0; i < path.length - 1; i++) {
			next = path[i];
			if (typeof cur[next] === 'undefined') {
				cur[next] = {};
			}
			cur = cur[next];
		}
		next = path[path.length-1];
		if (typeof cur[next] === 'undefined') {
			cur[next] = {};
		}
		return cur[next];
	};

	papa.Module = function(name, createModFn) {
		var path = name.split('.');
		var cur = papa;
		var i, next;
		for (i = 0; i < path.length - 1; i++) {
			next = path[i];
			if (typeof cur[next] === 'undefined') {
				cur[next] = {};
			}
			cur = cur[next];
		}
		next = path[path.length-1];
		if (typeof createModFn === 'function') {
			if (typeof cur[next] === 'undefined') {
				cur[next] = {};
			}
			var res = createModFn(cur[next]);
			if (typeof res !== 'undefined') {
				cur[next] = res;
			}
		} else {
			if (typeof cur[next] === 'undefined') {
				cur[next] = createModFn;
			} else {
				throw new Error("could not override existing module \"papa." + name + "\"");
			}
		}
	};

})(module.exports);
