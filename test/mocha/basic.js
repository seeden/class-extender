var should = require('should'),
	Class = require('../../index');

var User = null;

describe('Inheritance', function() {

	it('should be able to extend class', function(done) {
		User = Class.extend({
			init: function(name){
				this.name = name;
			},

			getName: function() {
				return this.name;
			},

			super: function() {
				return 'super';
			},

			super2: function() {
				return 'super2';
			}
		});

		var user = new User('Adam');
		user.should.have.property('name');

		user.getName().should.equal('Adam');

		(user instanceof Class).should.equal(true);
		(user instanceof User).should.equal(true);

		done();
	});

	it('should be able to extend extended class', function(done) {
		var Admin = User.extend({
			init: function(name, key) {
				this._super(name+' Admin');

				this.key = key;
			}
		});

		var user = new Admin('Peter', 123456);
		user.should.have.property('name');
		user.should.have.property('key');

		user.getName().should.equal('Peter Admin');

		(user instanceof Class).should.equal(true);
		(user instanceof User).should.equal(true);
		(user instanceof Admin).should.equal(true);

		done();
	});	

	it('should be able to extend extended class', function(done) {
		var emit = function(){

		};

		emit.prototype.init=function(){
			throw new Error('This function should not be called');
		};

		emit.prototype.on=function(name) {
			return name;
		};

		emit.prototype.test=function() {
			return this.getName();
		};

		emit.prototype.number=function() {
			return 77777;
		};


		emit.prototype.super2=function() {
			return this._super();
		};

		var Admin = User.extend({
			init: function(name, key) {
				this._super(name+' Admin');

				this.key = key;
			},

			number: function(){
				return 8888;
			},

			super: function(){
				return this._super();
			}
		}, [emit]);



		var user = new Admin('Peter', 123456);
		user.should.have.property('name');
		user.should.have.property('key');

		user.getName().should.equal('Peter Admin');

		(user instanceof Class).should.equal(true);
		(user instanceof User).should.equal(true);
		(user instanceof Admin).should.equal(true);


		user.on(123456).should.equal(123456);
		user.test().should.equal('Peter Admin');

		user.number().should.equal(8888);

		user.super().should.equal('super');

		user.super2().should.equal('super2');

		done();
	});	
});