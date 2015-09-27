const util = require('../../../../../src/db/queries/queryBuilderUtil');
const isTableNameValid = util.isTableNameValid;
const isTypeMatch = util.isTypeMatch;
const getFormattedValue = util.getFormattedValue;
require('chai').should();

describe('queryBuilderUtil', () => {
	describe('#isTableNameValid()', () => {
		describe('when given a nill value', () => {
			it('should return false', () => {
				isTableNameValid().should.be.false;
			});
		});

		describe('when given a schema without a name', () => {
			it('should return false', () => {
				isTableNameValid({}).should.be.false;
			});
		});

		describe('when given a schema with a non-string name', () => {
			it('should return false', () => {
				const schema = {
					name: 83
				};

				isTableNameValid(schema).should.be.false;
			});
		});

		describe('when given a schema with a string name', () => {
			it('should return true', () => {
				const schema = {
					name: 'table_name'
				};

				isTableNameValid(schema).should.be.true;
			});
		});
	});

	describe('#isTypeMatch', () => {
		describe('when given a nil value', () => {
			it('should return true', () => {
				isTypeMatch().should.be.true;
			});
		});

		describe('when given a non-nil value and no type', () => {
			it('should throw an error', () => {
				(() => isTypeMatch(1)).should.throw(Error);
			});
		});

		describe('when given a non-nil value and an invalid type', () => {
			it('should throw an error', () => {
				(() => isTypeMatch([1], 'array')).should.throw(Error);
			});
		});

		describe('when given a string and a non-text type', () => {
			it('should return false', () => {
				isTypeMatch('value', 'number').should.be.false;
			});
		});

		describe('when given a string and text type', () => {
			it('should return true', () => {
				isTypeMatch('value', 'text').should.be.true;
			});
		});

		describe('when given a number and a non-number type', () => {
			it('should return false', () => {
				isTypeMatch(3, 'json').should.be.false;
			});
		});

		describe('when given a number and number type', () => {
			it('should return true', () => {
				isTypeMatch(10, 'number').should.be.true;
			});
		});

		describe('when given a boolean and a non-boolean type', () => {
			it('should return false', () => {
				isTypeMatch(true, 'text').should.be.false;
			});
		});

		describe('when given a boolean and boolean type', () => {
			it('should return true', () => {
				isTypeMatch(false, 'boolean').should.be.true;
			});
		});

		describe('when given an object and a non-json type', () => {
			it('should return false', () => {
				isTypeMatch({ prop: 'erty' }, 'boolean').should.be.false;
			});
		});

		describe('when given an object and json type', () => {
			it('should return true', () => {
				isTypeMatch({ id: 94 }, 'json').should.be.true;
			});
		});
	});

	describe('#getFormattedValue()', () => {
		describe('when given a nil value', () => {
			it('should return null', () => {
				getFormattedValue().toUpperCase().should.equal('NULL');
			});
		});

		describe('when given an invalid type', () => {
			it('should throw an error', () => {
				(() => getFormattedValue('val', 'string')).should.throw(Error);
			});
		});

		describe('when given a value and text type', () => {
			it('should surround the value with single quotes', () => {
				const val = 'blah';

				getFormattedValue(val, 'text').should.equal(`'${val}'`);
			});
		});

		describe('when given a value and number type', () => {
			it('should return the value', () => {
				const val = 832;

				getFormattedValue(val, 'number').should.equal(val);
			});
		});

		describe('when given true and a boolean type', () => {
			it('should return true', () => {
				const val = true;

				getFormattedValue(val, 'boolean').toUpperCase().should.equal('TRUE');
			});
		});

		describe('when given false and a boolean type', () => {
			it('should return false', () => {
				const val = false;

				getFormattedValue(val, 'boolean').toUpperCase().should.equal('FALSE');
			});
		});

		describe('when given a value and json type', () => {
			it('should return the stringified json object', () => {
				const val = { prop1: 23, prop2: 'val', prop3: false };
				getFormattedValue(val, 'json').should.equal(JSON.stringify(val));
			});
		});
	});
});
