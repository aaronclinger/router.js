# Router

`Router` is a JavaScript router and `window.history` manager that falls back to using hashtags for browsers that don’t support the history object. Routes can be defined as simple strings or complex regular expressions.

There are a lot of great open-source routers but they are often large, complex, or tied to a framework. `Router` is designed to be small, readable, and adaptable to your project.


## Dependencies

`Router` requires the presence of [jQuery](http://jquery.com). If you do not wish to include jQuery in your project, it should be fairly trivial to change the few dependences.


## Example Usage

```js
function onRouteChange(data) {
	switch (data.id) {
		case 'home' :
			console.log('Catch all route.');
			break;
		case 'shop' :
			console.log('Shop route.');
			break;
		case 'product-page' :
			console.log('Product route id: ' + data.matches[0]);
			break;
	}
}

var router = new Router();

router.addRoute({
	id: 'shop',
	route: '/shop',
	callback: onRouteChange
}).addRoute({
	id: 'product-page',
	route: '/product/([0-9]+)',
	callback: onRouteChange
}).addRoute({
	id: 'home',
	route: '.+', // Catch all RegExp
	callback: onRouteChange
});

// Triggers the initial landing route
router.requestRoute();
```

## API

### addRoute(*settings*)

Adds a new route. Only the first matched route will be triggered; routes are compared in the order in which they are added to `Router`. This method returns the instance of `Router` to allow for method chaining.

* **settings** (object) - An object that defines the routes settings and callback function.
    * **[settings.id]** (string) - An optional identifier that is passed to the `settings.callback` function. If undefined, the string provided for `settings.route` will be used as the identifier.
    * **settings.route** (string) - The route pattern to match.
    * **settings.callback** (function) - A function that should be called when the route has been triggered. The callback function is passed an object with two properties:
        * **object.id** (string) - The route identifier.
        * **object.matches** (array) - If the route included RegExp capture groups, the groups will be provided as an array. If the route does not contain any capture groups, an empty array will be provided.


### requestRoute(*[route]*)

Requests a `pushState` and route change.

* **[route]** (string) - If no route is provided, `Router` requests the current route. Requesting the current route may be helpful if you wish to trigger the initial landing route.

### data-route="*route*"

`Router` will detect HTML elements with the data attribute `data-route` and automatically send the value to `requestRoute` when the element is clicked.

* **route** (string) - The route to send to `requestRoute`.

Example:

```html
<a href="#" data-route="/shop">Link</a>
```  

Defining `data-route="href"` will pass the value of the `href` attribute to the router when the element is clicked:

```html
<a href="/shop" data-route="href">Link</a>
```

## License

`Router` can be used freely for any open source or commercial works and is released under a [MIT license](http://en.wikipedia.org/wiki/MIT_License).


## Author

[Aaron Clinger](http://aaronclinger.com)