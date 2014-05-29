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
});