import queryBuilder from '../../../../../src/db/queries/queryBuilder';
import chai from 'chai';
chai.should();

describe('queryBuilder', () => {
	describe('#select()', () => {
		describe('when given a nil schema', () => {
			it('should throw an error', () => {
				(() => queryBuilder.select()).should.throw(Error);
			});
		});

		describe('when given a nil table name', () => {
			it('should throw an error', () => {
				(() => queryBuilder.select({})).should.throw(Error);
			});
		});

		describe('when given a tableName that is not a string', () => {
			it('should throw an error', () => {
				const schema = {
					name: 123
				};

				(() => queryBuilder.select(schema)).should.throw(Error);
			});
		});

		describe('when given a non-nil non-object options argument', () => {
			it('should throw an error', () => {
				const schema = {
					name: 'tableName'
				};

				(() => queryBuilder.select(schema, true)).should.throw(Error);
			});
		});

		describe('when given a nil options argument', () => {
			it('should select all from the table', () => {
				const schema = {
					name: 'theTable'
				};

				const regex = /^(?:SELECT|select) (\S+) (?:FROM|from) (\S+)$/;

				const query = queryBuilder.select(schema);
				const result = regex.exec(query);

				result.should.not.be.null;
				result[1].should.equal('*');
				result[2].should.equal(schema.name);
			});
		});

		describe('when given an empty list of fields', () => {
			it('should select all from the table', () => {
				const schema = {
					name: 'theTable'
				};

				const options = {
					getFields: () => '*',
					getConditions: () => ''
				};

				const regex = /^(?:SELECT|select) (\S+) (?:FROM|from) (\S+)$/;

				const query = queryBuilder.select(schema, options);
				const result = regex.exec(query);

				result.should.not.be.null;
				result[1].should.equal('*');
				result[2].should.equal(schema.name);
			});
		});

		describe('when given fields', () => {
			it('should select those fields', () => {
				const schema = {
					name: 'tableWithFields'
				};

				const options = {
					getFields: () => 'these, are, the, fields',
					getConditions: () => ''
				};

				const regex = /^(?:SELECT|select) ((?:\S+, )*)(\S+) (?:FROM|from) (\S+)$/;

				const query = queryBuilder.select(schema, options);
				const result = regex.exec(query);

				result.should.not.be.null;
				result[1].should.equal('these, are, the, ');
				result[2].should.equal('fields');
				result[3].should.equal(schema.name);
			});
		});

		describe('when given a single value condition', () => {
			it('should select based on that condition', () => {
				const schema = {
					name: 'table'
				};

				const key = 'key';
				const val = 'val';

				const options = {
					getFields: () => '*',
					getConditions: () => ` WHERE ${key} = '${val}'`
				};

				const regex = /^(?:SELECT|select) \* (?:FROM|from) (\S+) WHERE (\S+) = (\S+)$/;

				const query = queryBuilder.select(schema, options);
				const result = regex.exec(query);

				result.should.not.be.null;
				result[1].should.equal(schema.name);
				result[2].should.equal(key);
				result[3].should.equal(`'${val}'`);
			});
		});

		describe('when given a multiple value condition', () => {
			it('should select based on those values', () => {
				const schema = {
					name: 'table'
				};

				const key = 'key';
				const vals = ['val1', 'val2', 'val3'];

				const options = {
					getFields: () => '*',
					getConditions: () => ` WHERE ${key} IN (${vals.join(', ') })`
				};

				const regex = /^(?:SELECT|select) \* (?:FROM|from) (\S+) WHERE (\S+) IN \(((?:\S+, )*\S+)\)$/;

				const query = queryBuilder.select(schema, options);
				const result = regex.exec(query);

				result.should.not.be.null;
				result[1].should.equal(schema.name);
				result[2].should.equal(key);
				result[3].should.equal(vals.join(', '));
			});
		});

		describe('when given single and multiple value conditions', () => {
			it('should select based on all conditions', () => {
				const schema = {
					name: 'table'
				};

				const key1 = 'key1';
				const key2 = 'key2';
				const val1 = 'val1';
				const val2 = ['a', 'b', 'c', 'd'];

				const options = {
					getFields: () => '*',
					getConditions: () => ` WHERE ${key1} = ${val1} AND ${key2} IN (${val2.join(', ') })`
				};

				const regex = /^(?:SELECT|select) \* (?:FROM|from) (\S+) WHERE (\S+) = (\S+) AND (\S+) IN \(((?:\S+, )*\S+)\)$/;

				const query = queryBuilder.select(schema, options);
				const result = regex.exec(query);

				result.should.not.be.null;
				result[1].should.equal(schema.name);
				result[2].should.equal(key1);
				result[3].should.equal(val1);
				result[4].should.equal(key2);
				result[5].should.equal(val2.join(', '));
			});
		});

		describe('when given both fields and conditions', () => {
			it('should select the fields based on the conditions', () => {
				const schema = {
					name: 'table'
				};

				const fields = ['alpha', 'beta', 'gamma'];
				const key = 'theKey';
				const val = 'theVal';

				const options = {
					getFields: () => fields.join(', '),
					getConditions: () => ` WHERE ${key} = '${val}'`
				};

				const regex = /^(?:SELECT|select) ((?:\S+, )*\S+) (?:FROM|from) (\S+) WHERE (\S+) = (\S+)$/;

				const query = queryBuilder.select(schema, options);
				const result = regex.exec(query);

				result.should.not.be.null;
				result[1].should.equal(fields.join(', '));
				result[2].should.equal(schema.name);
				result[3].should.equal(key);
				result[4].should.equal(`'${val}'`);
			});
		});
	});

	describe('#insert()', () => {
		describe('when given a nil schema name', () => {
			it('should throw an error', () => {
				const vals = {
					prop: 'val'
				};

				(() => queryBuilder.insert(undefined, vals)).should.throw(Error);
			});
		});

		describe('when given a nil table name', () => {
			it('should throw an error', () => {
				const vals = {
					prop: 'val'
				};
				(() => queryBuilder.insert({}, vals)).should.throw(Error);
			});
		});

		describe('when given a tableName that is not a string', () => {
			it('should throw an error', () => {
				const schema = {
					name: 123,
					columns: { prop: { type: 'text', required: true, canCreate: true } }
				};

				const vals = {
					prop: 'val'
				};

				(() => queryBuilder.insert(schema, vals)).should.throw(Error);
			});
		});

		describe('when not given a values argument', () => {
			it('should throw an error', () => {
				const schema = {
					name: 'tableName',
					columns: { prop: { type: 'text' } }
				};

				(() => queryBuilder.insert(schema)).should.throw(Error);
			});
		});

		describe('when given a values argument that is not an object', () => {
			it('should throw an error', () => {
				const schema = {
					name: 'tableName',
					columns: { prop: { type: 'text', required: true, canCreate: true } }
				};

				(() => queryBuilder.insert(schema, 'not an object')).should.throw(Error);
			});
		});

		describe('when missing required columns', () => {
			it('should throw an error', () => {
				const schema = {
					name: 'tableName',
					columns: {
						prop1: { type: 'number', required: true, canCreate: true },
						prop2: { type: 'number', required: true, canCreate: true }
					}
				};

				const values = { prop1: 5 };

				(() => queryBuilder.insert(schema, values)).should.throw(Error);
			});
		});

		describe('when given non-existent columns', () => {
			it('should throw an error', () => {
				const schema = {
					name: 'tableName',
					columns: {
						prop1: { type: 'number', required: true, canCreate: true }
					}
				};

				const values = { prop1: 3, prop2: 7 };

				(() => queryBuilder.insert(schema, values)).should.throw(Error);
			});
		});

		describe('when given mismatched types', () => {
			it('should throw an error', () => {
				const schema = {
					name: 'table',
					columns: {
						prop: { type: 'number', required: true, canCreate: true }
					}
				};

				const values = { prop: 'not a number' };

				(() => queryBuilder.insert(schema, values)).should.throw(Error);
			});
		});

		describe('when the schema has an invalid type', () => {
			it('should throw an error', () => {
				const schema = {
					name: 'table',
					columns: {
						prop: { type: 'integer', required: true, canCreate: true }
					}
				};

				const values = { prop: 873 };

				(() => queryBuilder.insert(schema, values)).should.throw(Error);
			});
		});

		describe('when given a column that cannot be inserted', () => {
			it('should throw an error', () => {
				const schema = {
					name: 'tbl',
					columns: {
						prop1: { type: 'number', required: true, canCreate: false }
					}
				};

				const values = { prop1: 500 };

				(() => queryBuilder.insert(schema, values)).should.throw(Error);
			});
		});

		describe('when given valid arguments', () => {
			it('should return the correct insert statement', () => {
				const schema = {
					name: 'table_name',
					columns: {
						colA: { type: 'text', required: true, canCreate: true },
						colB: { type: 'number', required: false, canCreate: true },
						colC: { type: 'boolean', required: true, canCreate: true },
						colD: { type: 'json', required: false, canCreate: true }
					}
				};

				const vals = {
					colA: 'value A',
					colB: 27,
					colC: true,
					colD: { foo: 'bar' }
				};

				const regex = /^(?:INSERT INTO|insert into) (\S+) \(((?:\S+, )*(?:\S+))\) (?:VALUES|values) \(((?:.+, )*(?:.+))\) RETURNING \*$/;

				const query = queryBuilder.insert(schema, vals);
				const result = regex.exec(query);

				const queryCols = result[2].split(', ');
				const queryVals = result[3].split(', ');

				result.should.not.be.null;
				result[1].should.equal(schema.name);
				queryCols.should.include('colA');
				queryCols.should.include('colB');
				queryCols.should.include('colC');
				queryCols.should.include('colD');
				queryVals.should.include(`'${vals.colA}'`);
				queryVals.should.include(vals.colB.toString());
				queryVals.should.include(vals.colC.toString().toUpperCase());
				queryVals.should.include(JSON.stringify(vals.colD));
			});
		});
	});

	describe('#update()', () => {
		describe('when given a nil schema', () => {
			it('should throw an error', () => {
				const schema = undefined;
				const values = { key: 'val' };
				const options = {
					getConditions: () => ''
				};

				(() => queryBuilder.update(schema, values, options)).should.throw(Error);
			});
		});

		describe('when given a nil table name', () => {
			it('should throw an error', () => {
				const schema = {};
				const values = { key: 'val' };
				const options = {
					getConditions: () => ''
				};

				(() => queryBuilder.update(schema, values, options)).should.throw(Error);
			});
		});

		describe('when given a tableName that is not a string', () => {
			it('should throw an error', () => {
				const schema = {
					name: 123
				};
				const values = { key: 'val' };
				const options = {
					getConditions: () => ''
				};

				(() => queryBuilder.update(schema, values, options)).should.throw(Error);
			});
		});

		describe('when given a nil values argument', () => {
			it('should throw an error', () => {
				const schema = {
					name: 'table',
					columns: {
						prop: { type: 'text', required: false, canUpdate: true }
					}
				};
				const values = undefined;
				const options = {
					getConditions: () => ''
				};

				(() => queryBuilder.update(schema, values, options)).should.throw(Error);
			});
		});

		describe('when given a non-object values argument', () => {
			it('should throw an error', () => {
				const schema = {
					name: 'table',
					columns: {
						prop: { type: 'text', required: false, canUpdate: true }
					}
				};
				const values = 'not an object';
				const options = {
					getConditions: () => ''
				};

				(() => queryBuilder.update(schema, values, options)).should.throw(Error);
			});
		});

		describe('when given an empty values object', () => {
			it('should throw an error', () => {
				const schema = {
					name: 'table',
					columns: {
						prop: { type: 'text', required: false, canUpdate: true }
					}
				};
				const values = {};
				const options = {
					getConditions: () => ''
				};

				(() => queryBuilder.update(schema, values, options)).should.throw(Error);
			});
		});

		describe('when given non-existent columns', () => {
			it('should throw an error', () => {
				const schema = {
					name: 'tableName',
					columns: {
						prop1: { type: 'number', required: true, canUpdate: true }
					}
				};

				const values = { prop1: 3, prop2: 7 };
				const options = {
					getConditions: () => ''
				};

				(() => queryBuilder.update(schema, values, options)).should.throw(Error);
			});
		});

		describe('when given mismatched types', () => {
			it('should throw an error', () => {
				const schema = {
					name: 'table',
					columns: {
						prop: { type: 'number', required: true, canUpdate: true }
					}
				};

				const values = { prop: 'not a number' };
				const options = {
					getConditions: () => ''
				};

				(() => queryBuilder.update(schema, values, options)).should.throw(Error);
			});
		});

		describe('when the schema has an invalid type', () => {
			it('should throw an error', () => {
				const schema = {
					name: 'table',
					columns: {
						prop: { type: 'integer', required: true, canUpdate: true }
					}
				};

				const values = { prop: 873 };
				const options = {
					getConditions: () => ''
				};

				(() => queryBuilder.update(schema, values, options)).should.throw(Error);
			});
		});

		describe('when given a column that cannot be updated', () => {
			it('should throw an error', () => {
				const schema = {
					name: 'tbl',
					columns: {
						prop1: { type: 'number', required: true, canUpdate: false }
					}
				};

				const values = { prop1: 500 };
				const options = {
					getConditions: () => ''
				};

				(() => queryBuilder.update(schema, values, options)).should.throw(Error);
			});
		});

		describe('when given valid values', () => {
			it('should return the expected update statement', () => {
				const schema = {
					name: 'table',
					columns: {
						prop1: { type: 'text', required: true, canUpdate: true }
					}
				};

				const val = 'newVal';
				const values = { prop1: val };
				const options = {
					getConditions: () => ''
				};

				const regex = /^(?:UPDATE|update) (\w+) (?:SET|set) (\w+) = ('\w+') RETURNING \*$/;
				const updateStr = queryBuilder.update(schema, values, options);
				const result = regex.exec(updateStr);

				result.should.not.be.null;
				result[1].should.equal(schema.name);
				result[2].should.equal('prop1');
				result[3].should.equal(`'${val}'`);
			});
		});

		describe('when given valid values with conditions', () => {
			it('should return the expected update statement', () => {
				const schema = {
					name: 'table',
					columns: {
						prop1: { type: 'number', required: true, canUpdate: true }
					}
				};

				const val = 101;
				const values = { prop1: val };

				const conditionStr = ' WHERE prop1 = 100';
				const options = {
					getConditions: () => conditionStr
				};

				const regex = /^(?:UPDATE|update) (\w+) (?:SET|set) (\w+) = (\w+)(.*) RETURNING \*$/;
				const updateStr = queryBuilder.update(schema, values, options);
				const result = regex.exec(updateStr);

				result.should.not.be.null;
				result[1].should.equal(schema.name);
				result[2].should.equal('prop1');
				result[3].should.equal(val.toString());
				result[4].should.equal(conditionStr);
			});
		});
	});
});
