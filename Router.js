/**
 * @author Aaron Clinger - https://github.com/aaronclinger/router.js
 */
(function($) {
	'use strict';
	
	function Router() {
		var pub      = {},
		    routes   = [],
		    history  = window.history,
		    useHash  = !(history && 'pushState' in history),
		    location = window.location,
		    path     = location.pathname,
		    currentRoute;
		
		
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
					currentRoute = route;
					
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
		
		$(document.body).on('click', '*[data-route]', function(e) {
			var $el   = $(this),
			    route = $el.attr('data-route');
			
			if (route === 'href') {
				route = $el.attr('href');
			}
			
			if (route !== currentRoute) {
				pub.requestRoute(route);
			}
			
			e.preventDefault();
		});
		
		return pub;
	}
	
	window.Router = Router;
}(jQuery));
