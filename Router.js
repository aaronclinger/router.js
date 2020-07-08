/**
 * @author Aaron Clinger - https://github.com/aaronclinger/router.js
 */
(function(window, document) {
	'use strict';
	
	function Router(options) {
		var pub      = {};
		var routes   = [];
		var history  = window.history;
		var location = window.location;
		var path     = location.pathname;
		var currentRoute;
		var useHash;
		
		
		pub.addRoute = function(settings) {
			var route = settings.route;
			
			route.replace(/(?:([^\\])\/)|^\//g, '$1\\\/');
			
			routes.push({
				id: settings.id || settings.route,
				route: '^' + route + '$',
				callback: settings.callback
			});
			
			return pub;
		};
		
		pub.requestRoute = function(route) {
			if (route) {
				if (useHash) {
					location.hash = route;
				} else {
					path = route;
					
					matchRoute(path);
					
					history.pushState({}, '', path);
				}
			} else {
				if (useHash) {
					matchHash();
				} else {
					matchRoute(location.pathname);
				}
			}
		};
		
		var matchRoute = function(route) {
			var i = -1;
			var l = routes.length;
			var matches;
			var regex;
			var item;
			
			while (++i < l) {
				item    = routes[i];
				regex   = new RegExp(item.route, 'i');
				matches = route.match(regex);
				
				if (matches !== null) {
					currentRoute = route;
					
					item.callback.apply(null, [{id: item.id, matches: matches.slice(1)}]);
					break;
				}
			}
		};
		
		var matchHash = function() {
			var hash = location.hash;
			
			if ( ! hash) {
				hash = '#';
			}
			
			matchRoute(hash.slice(1));
		};
		
		var addDataRouteListeners = function() {
			document.addEventListener('click', function(e) {
				var element = e.target;
				var route   = element.getAttribute('data-route');
				
				if (route) {
					if (e.which === 2 || e.metaKey || e.ctrlKey) {
						return;
					}
					
					if (route === 'href') {
						route = element.getAttribute('href');
					}
					
					if (route !== currentRoute) {
						pub.requestRoute(route);
					}
					
					e.preventDefault();
				}
			});
		};
		
		var init = function(options) {
			options = options || {};
			useHash = options.useHash || ! (history && 'pushState' in history);
			
			if (useHash) {
				window.addEventListener('hashchange', matchHash);
			} else {
				window.addEventListener('popstate', function() {
					var newPath = location.pathname;
					
					if (path === newPath) {
						return;
					}
					
					path = newPath;
					
					matchRoute(path);
				});
			}
			
			if ( ! options.disableListeners) {
				if (document.readyState === 'interactive' || document.readyState === 'complete') {
					addDataRouteListeners();
				} else {
					document.addEventListener('DOMContentLoaded', addDataRouteListeners);
				}
			}
		};
		
		init(options);
		
		return pub;
	}
	
	window.Router = Router;
}(window, document));
