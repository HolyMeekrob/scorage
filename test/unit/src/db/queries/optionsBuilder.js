import optionsBuilder from '../../../../../src/db/queries/optionsBuilder';
import chai from 'chai';
chai.should();

describe('optionsBuilder', () => {
	describe('#build()', () => {
		describe('when given no arguments', () => {
			it('should have empty properties', () => {
				const options = optionsBuilder.build();
				options.getFields().should.equal('*');
				options.getConditions().should.equal('');
			});
		});

		describe('when given fields that are not an array', () => {
			describe('and retrieving those fields', () => {
				it('should throw an error', () => {
					(() => optionsBuilder.build('not an array').getFields()).should.throw(Error);
				});
			});
		});

		describe('when given fields that are an array', () => {
			it('should have its fields set', () => {
				const fields = ['left', 'right', 'center'];
				const options = optionsBuilder.build(fields);

				options.getFields().should.deep.equal(fields.join(', '));
			});
		});

		describe('when given conditions that are not an array', () => {
			describe('and retrieving those conditions', () => {
				it('should throw an error', () => {
					(() => optionsBuilder.build(undefined, 'not an array').getConditions()).should.throw(Error);
				});
			});
		});

		describe('when given a condition that is a non-two element array', () => {
			describe('and retrieving those conditions', () => {
				it('should throw an error', () => {
					const conditions = [['key', 'value'], ['a'], ['b'], ['c']];
					(() => optionsBuilder.build(undefined, conditions).getConditions()).should.throw(Error);
				});
			});
		});

		describe('when given valid conditions', () => {
			it('should have its conditions set', () => {
				const key1 = 'key';
				const key2 = 'otherKey';
				const val1 = 'this is the value';
				const val2 = 231;

				const conditions = [[key1, val1], [key2, val2]];
				const options = optionsBuilder.build(undefined, conditions);

				const regex = /^ (?:WHERE|where) (.+=.+) (?:AND|and) (.+=.+)$/;
				const conditionStr = options.getConditions();
				const result = regex.exec(conditionStr);

				const testCondition = (clause) => {
					return clause === `${key1} = '${val1}'`
					|| clause === `${key2} = ${val2}`;
				};

				result.should.not.be.null;
				const cond1 = result[1];
				const cond2 = result[2];
				cond1.should.not.deep.equal(cond2);
				cond1.should.satisfy(testCondition);
				cond2.should.satisfy(testCondition);
			});
		});

		describe('when given fields and conditions', () => {
			it('should set both correctly', () => {
				const key = 'theKey';
				const val = 'theVal';

				const fields = ['abc', 'def', 'ghi', 'jkl', 'mno'];
				const conditions = [[key, val]];

				const options = optionsBuilder.build(fields, conditions);

				options.getFields().should.deep.equal(fields.join(', '));

				const regex = /^ (?:WHERE|where) (\S+ = \S+)$/;
				const conditionResult = options.getConditions();
				const result = regex.exec(conditionResult);

				result.should.not.be.null;
				result[1].should.equal(`${key} = '${val}'`);
			});
		});

		describe('when given conditions with multiple accepted values', () => {
			it('should have its conditions set appropriately', () => {
				const key = 'key';
				const val1 = 'val1';
				const val2 = 'val2';
				const val3 = 'val3';
				const vals = [val1, val2, val3];
				const conditions = [[key, vals]];

				const options = optionsBuilder.build(undefined, conditions);

				const regex = /^ (?:WHERE|where) (\w+) IN \(((?:'\w+', )+)('\w+')\)$/;
				const conditionsStr = options.getConditions();
				const result = regex.exec(conditionsStr);

				result.should.not.be.null;
				result[1].should.equal(key);
				result[2].should.equal(`'${val1}', '${val2}', `);
				result[3].should.equal(`'${val3}'`);
			});
		});
	});
});
