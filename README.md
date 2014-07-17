# Class extender

## Motivation

As you know there is a lot of different class extenders. 
Maybe you ask yourself why another class extender. Answer is simple.
This is not a new class extender :) It is based on [Simple Javascript inheritance](http://ejohn.org/blog/simple-javascript-inheritance/).
You can use this library as AMD, CommonJS or root library in your [Webpack](http://webpack.github.io/) or [RequireJS](http://requirejs.org/) module bundler.
Works in the browser, in [NodeJS](http://nodejs.org/), [Bower](http://bower.io/) and with [Browserify](http://browserify.org/).

A couple things to note about this implementation:
 * Creating a constructor had to be simple (in this case simply providing an init method does the trick).
 * In order to create a new ‘class’ you must extend (sub-class) an existing class.
 * All of the ‘classes’ inherit from a single ancestor: Class. Therefore if you want to create a brand new class it must be a sub-class of Class.
 * And the most challenging one: Access to overridden methods had to be provided (with their context properly set). You can see this with the use of this._super(), above, calling the original init() and dance() methods of the Person super-class.

## Install

NodeJS:

	$ npm install class-extender

Bower:

	$ bower install class-extender

## Event emitter

If your are looking for simple event emitter library you can use [class-evented](https://github.com/seeden/class-evented) library

## Examples

Use as CommonJS module:

	var Class = require('class-extender');

	var Person = Class.extend({
		init: function(department) {
			this._department = department;
		},

		getDepartment: function() {
			return this.department;
		}
	});

	var Admin = Person.extend({
		init: function() {
			this._super('IT');
		},

		getDepartment: function() {
			return this._super() + ':)';
		}
	});

	var person = new Person('secretary');
	person.getDepartment(); // => 'secretary'

	var admin = new Admin();
	admin.getDepartment(); // => 'IT'

	admin instanceof Admin; // => true
	admin instanceof Person; // => true
	admin instanceof Class; // => true


Use as AMD module:
person.js:

	define(['class-extender'], function(Class) {
		return Class.extend({
			init: function(department) {
				this._department = department;
			},

			getDepartment: function() {
				return this.department;
			}
		});
	});

admin.js:

	define(['./person'], function(Person) {
		return Person.extend({
			init: function() {
				this._super('IT');
			},

			getDepartment: function() {
				return this._super() + ':)';
			}
		});
	});

test.js

	define(['class-extender', './person', './admin'], function(Class, Person, Admin) {

		var person = new Person('secretary');
		person.getDepartment(); // => 'secretary'

		var admin = new Admin();
		admin.getDepartment(); // => 'IT:)'

		admin instanceof Admin; // => true
		admin instanceof Person; // => true
		admin instanceof Class; // => true
	});

## Multiple inheritance

Basically this functionality is not supported. But there is one option.
You can copy own properties from existing classes. There is second parameter of function extend.

	Class.extend({
		init: function(name) {
			this._name = name;
		}
	}, [Person, AnotherClass]);

## Credits

[Zlatko Fedor](http://github.com/seeden)

## License

The MIT License (MIT)

Copyright (c) 2014 Zlatko Fedor zlatkofedor@cherrysro.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.