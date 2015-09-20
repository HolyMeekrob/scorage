const should = require('chai').should();
const queryBuilder = require('../../../../../src/db/models/queryBuilder');

describe('queryBuilder', () => {
	describe('when given a nil table name', () => {
		it('should throw an error', () => {
			(() => queryBuilder.select()).should.throw(Error);
		});
	});

	describe('when given a tableName that is not a string', () => {
		it('should throw an error', () => {
			(() => queryBuilder.select(123)).should.throw(Error);
		});
	});

	describe('when given a non-nil non-object options argument', () => {
		it('should hrow an error', () => {
			const tableName = 'tableName';
			(() => queryBuilder.select(tableName, true)).should.throw(Error);
		});
	});

	describe('when given a nil options argument', () => {
		it('should select all from the table', () => {
			const tableName = 'theTable';
			const regex = /^(?:SELECT|select) (\S+) (?:FROM|from) (\S+)$/;

			const result = queryBuilder.select(tableName);
			const test = regex.exec(result);

			test.should.not.be.null;
			test[1].should.equal('*');
			test[2].should.equal(tableName);
		});
	});

	describe('#select()', () => {
		describe('when given non-nil fields that is not an array', () => {
			it('should throw an error', () => {
				const tableName = 'table';
				const options = {
					fields: 'not an array'
				};
				(() => queryBuilder.select(tableName, options)).should.throw(Error);
			});
		});

		describe('when given fields', () => {
			it('should select those fields', () => {
				const tableName = 'testTable';
				const options = {
					fields: ['these', 'are', 'the', 'fields']
				};

				const regex = /^(?:SELECT|select) ((?:\S+, )*)(\S+) (?:FROM|from) (\S+)$/;

				const result = queryBuilder.select(tableName, options);
				const test = regex.exec(result);-

				test.should.not.be.null;
				test[1].should.equal('these, are, the, ');
				test[2].should.equal('fields');
				test[3].should.equal(tableName);
			});
		});
	});
});
