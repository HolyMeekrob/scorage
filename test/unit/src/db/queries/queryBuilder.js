const queryBuilder = require('../../../../../src/db/queries/queryBuilder');
require('chai').should();

describe('queryBuilder', () => {
	describe('#select()', () => {
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
			it('should throw an error', () => {
				const tableName = 'tableName';
				(() => queryBuilder.select(tableName, true)).should.throw(Error);
			});
		});

		describe('when given a nil options argument', () => {
			it('should select all from the table', () => {
				const tableName = 'theTable';
				const regex = /^(?:SELECT|select) (\S+) (?:FROM|from) (\S+)$/;

				const query = queryBuilder.select(tableName);
				const result = regex.exec(query);

				result.should.not.be.null;
				result[1].should.equal('*');
				result[2].should.equal(tableName);
			});
		});

		describe('when given non-nil fields that is not an array', () => {
			it('should throw an error', () => {
				const tableName = 'table';
				const options = {
					getFields: () => 'not an array',
					getConditions: () => new Map()
				};
				(() => queryBuilder.select(tableName, options)).should.throw(Error);
			});
		});

		describe('when given an empty list of fields', () => {
			it('should select all from the table', () => {
				const tableName = 'theTable';
				const regex = /^(?:SELECT|select) (\S+) (?:FROM|from) (\S+)$/;

				const options = {
					getFields: () => [],
					getConditions: () => new Map()
				};

				const query = queryBuilder.select(tableName, options);
				const result = regex.exec(query);

				result.should.not.be.null;
				result[1].should.equal('*');
				result[2].should.equal(tableName);
			});
		});

		describe('when given fields', () => {
			it('should select those fields', () => {
				const tableName = 'testTable';
				const options = {
					getFields: () => ['these', 'are', 'the', 'fields'],
					getConditions: () => new Map()
				};

				const regex = /^(?:SELECT|select) ((?:\S+, )*)(\S+) (?:FROM|from) (\S+)$/;

				const query = queryBuilder.select(tableName, options);
				const result = regex.exec(query);

				result.should.not.be.null;
				result[1].should.equal('these, are, the, ');
				result[2].should.equal('fields');
				result[3].should.equal(tableName);
			});
		});

		describe('when given a single value condition', () => {
			it('should select based on that condition', () => {
				const tableName = 'table';
				const key = 'key';
				const val = 'val';

				const options = {
					getFields: () => [],
					getConditions: () => new Map([[key, val]])
				};

				const regex = /^(?:SELECT|select) \* (?:FROM|from) (\S+) (?:WHERE|where) (\S+) = (\S+)$/;

				const query = queryBuilder.select(tableName, options);
				const result = regex.exec(query);

				result.should.not.be.null;
				result[1].should.equal(tableName);
				result[2].should.equal(key);
				result[3].should.equal(val);
			});
		});

		describe('when given a multiple value condition', () => {
			it('should select based on those values', () => {
				const tableName = 'table';
				const key = 'key';
				const vals = ['val1', 'val2', 'val3'];

				const options = {
					getFields: () => [],
					getConditions: () => new Map([[key, vals]])
				};

				const regex = /^(?:SELECT|select) \* (?:FROM|from) (\S+) (?:WHERE|where) (\S+) (?:IN|in) \(((?:\S+, )*\S+)\)$/;

				const query = queryBuilder.select(tableName, options);
				const result = regex.exec(query);

				result.should.not.be.null;
				result[1].should.equal(tableName);
				result[2].should.equal(key);
				result[3].should.equal(vals.join(', '));
			});
		});

		describe('when given single and multiple value conditions', () => {
			it('should select based on all conditions', () => {
				const tableName = 'table';
				const key1 = 'key1';
				const key2 = 'key2';
				const val1 = 'val1';
				const val2 = ['a', 'b', 'c', 'd'];

				const options = {
					getFields: () => [],
					getConditions: () => new Map([[key1, val1], [key2, val2]])
				};

				const regex = /^(?:SELECT|select) \* (?:FROM|from) (\S+) (?:WHERE|where) (\S+) = (\S+) AND (\S+) (?:IN|in) \(((?:\S+, )*\S+)\)$/;

				const query = queryBuilder.select(tableName, options);
				const result = regex.exec(query);

				result.should.not.be.null;
				result[1].should.equal(tableName);
				result[2].should.equal(key1);
				result[3].should.equal(val1);
				result[4].should.equal(key2);
				result[5].should.equal(val2.join(', '));
			});
		});

		describe('when given both fields and conditions', () => {
			it('should select the fields based on the conditions', () => {
				const tableName = 'table';
				const fields = ['alpha', 'beta', 'gamma'];
				const key = 'theKey';
				const val = 'theVal';

				const options = {
					getFields: () => fields,
					getConditions: () => new Map([[key, val]])
				};

				const regex = /^(?:SELECT|select) ((?:\S+, )*\S+) (?:FROM|from) (\S+) (?:WHERE|where) (\S+) = (\S+)$/;

				const query = queryBuilder.select(tableName, options);
				const result = regex.exec(query);

				result.should.not.be.null;
				result[1].should.equal(fields.join(', '));
				result[2].should.equal(tableName);
				result[3].should.equal(key);
				result[4].should.equal(val);
			});
		});
	});
});
