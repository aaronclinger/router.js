/* jshint strict: true, browser: true, nonbsp: true, bitwise: true, immed: true, latedef: true, eqeqeq: true, undef: true, curly: true, unused: true */
/* global jQuery */

;(function($, window) {
	'use strict';
	
	function Router() {
		var pub      = {},
		    routes   = [],
		    history  = window.history,
		    useHash  = !(history && 'pushState' in history),
		    location = window.location,
		    path     = location.pathname;
		
		
		pub.addRoute = function(options) {
			var route = options.route;
			
			if (route === '*') {
				route = '.+';
			} else {
				route.replace(/(?:([^\\])\/)|^\//g, '$1\\\/');
			}
			
			routes.push({
				id: options.id || options.route,
				route: route,
				callback: options.callback
			});
			
			return pub;
		};
		
		pub.requestRoute = function(route) {
			if (useHash) {
				location.hash = route;
			} else {
				path = route;
				
				matchRoute(path);
				
				history.pushState({}, '', path);
			}
		};
		
		pub.triggerRoute = function() {
			if (useHash) {
				matchHash();
			} else {
				matchRoute(location.pathname);
			}
		};
		
		var matchRoute = function(route) {
			var i = -1,
			    l = routes.length,
			    matches,
			    regex,
			    item;
			
			while (++i < l) {
				item    = routes[i];
				regex   = new RegExp(item.route, 'i');
				matches = route.match(regex);
				
				if (matches !== null) {
					item.callback.apply(null, [{id: item.id, matches: matches.slice(1)}]);
					break;
				}
			}
		};
		
		var matchHash = function() {
			var hash = location.hash;
			
			if ( ! hash) {
				hash = '#' + location.pathname;
			}
			
			matchRoute(hash.slice(1));
		};
		
		if (useHash) {
			$(window).on('hashchange', matchHash);
		} else {
			$(window).on('popstate', function() {
				var newPath = location.pathname;
				
				if (path === newPath) {
					return;
				}
				
				path = newPath;
				
				matchRoute(path);
			});
		}
		
		$(document.body).on('click', '*[data-route]', function() {
			var $el   = $(this),
			    route = $el.attr('data-route');
			
			if (route === 'href') {
				route = $el.attr('href');
			}
			
			pub.requestRoute(route);
			
			return false;
		});
		
		return pub;
	}
	
	window.Router = Router;
}(jQuery, window));