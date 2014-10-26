# Router

`Router` is a basic JavaScript router and `window.history` manager that falls back to using hashtags for browsers that don’t support the history object. Routes can be defined as simple strings or complex regular expressions.

There are a lot of great open-source routers but they are often large, complex, or tied to a framework. `Router` is designed to be small, readable, and adaptable to your project.


## Dependencies

`Router` assumes the presence of the [jQuery](http://jquery.com)’s event object. If you do not wish to include jQuery in your project, it should be fairly trivial to change the few dependences to a different event dispatcher.


## Example Usage

```js
function onRouteChange(data) {
	switch (data.id) {
		case 'home' :
			console.log('Catch all route.');
			break;
		case 'product-list' :
			console.log('Product list route.');
			break;
		case 'product-page' :
			console.log('Specific product route. Product id: ' + data.matches[0]);
			break;
	}
}

var router = new Router();

router.addRoute({
	id: 'product-list',
	route: '/products',
	callback: onRouteChange
}).addRoute({
	id: 'product-page',
	route: '/products/([0-9]+)',
	callback: onRouteChange
}).addRoute({
	id: 'home',
	route: '.+', // Catch all RegEx
	callback: onRouteChange
});

// Triggers the initial landing route
router.requestRoute();
```

## API

### addRoute(*settings*)

Adds a new route to the router. Only the first matched route will be triggered; routes are compared in the order in which they are added to `Router`.

This method returns the instance of `Router` to allow for method chaining.

* **settings** (object) - An object that defines the routes settings and callback function.
    * **[settings.id]** (string) - An optional unique identifier that is passed to the `settings.callback` function. If left undefined, the string provided for `settings.route` will be used as the identifier.
    * **settings.route** (string) - 
    * **settings.callback** (function) - 

### requestRoute(*[route]*)

Requests a `pushState` and route change. Note that `Router` will ignore subsequent requests of the same route.

* **[route]** (string) - If no route is provided, `Router` requests the current route. Requesting the current route may be helpful if you wish to trigger the initial landing route.

### data-route="*value*" 

`Router` will automatically 

## License

`Router` can be used freely for any open source or commercial works and is released under a [MIT license](http://en.wikipedia.org/wiki/MIT_License).


## Author

[Aaron Clinger](http://aaronclinger.com)