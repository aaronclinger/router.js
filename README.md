# Router

`Router` is a simple-to-use JavaScript router and `window.history` manager. Routes can be defined as simple strings or complex regular expressions.

There are a lot of great open-source routers but they are often large, complex, or tied to a framework. `Router` is designed to be small, readable, and adaptable to your project.


## Example Usage

```html
<ul>
	<li><a href="/" data-route="href">Home</a></li>
	<li><a href="#" data-route="/shop">Shop</a></li>
	<li><a href="/product/123" data-route="href">Product 123</a></li>
</ul>

<script src="Router.js"></script>
<script>
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
		route: '.*', // Catch all RegExp
		callback: onRouteChange
	});
	
	// Triggers the initial landing route
	router.requestRoute();
</script>
```
## Creating an Instance

### new Router(*[options]*)

Creates a new instance of `Router`.

* **[options]** `Object` - Defines optional settings:
    * **[options.useHash]** `Boolean` - Specifies if `Router` should use `#` hash / [fragment identifiers](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event) instead of the `History` API; defaults to `false`. If the browser does not support the `History` API, `Router` will automatically fallback to using fragment indentifiers.
    * **[options.disableListeners]** `Boolean` - Specifies if `Router` shouldn’t add events to listen for [route data attributes](#data-route); defaults to `false`.

## Methods

### addRoute(*settings*)

Adds a new route. Only the first matched route will be triggered; routes are compared in the order in which they are added to `Router`. This method returns the instance of `Router` to allow for method chaining.

* **settings** `Object` - An object that defines the routes settings and callback function.
    * **[settings.id]** `String` - An optional identifier that is passed to the `settings.callback` function. If undefined, the string provided for `settings.route` will be used as the identifier.
    * **settings.route** `String` - The route pattern to match.
    * **settings.callback** `Function` - A function that should be called when the route has been triggered. The callback function is passed an object with two properties:
        * **object.id** `String` - The route identifier.
        * **object.matches** `Array` - If the route included RegExp capture groups, the groups will be provided as an array. If the route does not contain any capture groups, an empty array will be provided.


### requestRoute(*[route]*)

Requests a `pushState` and route change.

* **[route]** `String` - If no route is provided, `Router` requests the current route. Requesting the current route may be helpful if you wish to trigger the initial landing route.

### <a id="data-route"></a>data-route="*route*"

`Router` can detect HTML elements with the data attribute `data-route` and automatically send the value to `requestRoute` when the element is clicked.

* **route** `String` - The route to send to `requestRoute`.

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
