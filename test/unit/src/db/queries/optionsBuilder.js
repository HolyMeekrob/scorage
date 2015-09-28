import optionsBuilder from '../../../../../src/db/queries/optionsBuilder';
import chai from 'chai';
chai.should();

describe('optionsBuilder', () => {
	describe('#build()', () => {
		describe('when given no arguments', () => {
			it('should have empty properties', () => {
				const options = optionsBuilder.build();
				options.getFields().length.should.equal(0);
				options.getConditions().size.should.equal(0);
			});
		});

		describe('when given fields that are not an array', () => {
			it('should throw an error', () => {
				(() => optionsBuilder.build('not an array')).should.throw(Error);
			});
		});

		describe('when given fields that are an array', () => {
			it('should have its fields set', () => {
				const fields = ['left', 'right', 'center'];
				const options = optionsBuilder.build(fields);

				options.getFields().should.deep.equal(fields);
			});
		});

		describe('when given conditions that are not an array', () => {
			it('should throw an error', () => {
				(() => optionsBuilder.build(undefined, 'not an array')).should.throw(Error);
			});
		});

		describe('when given a condition that is not an array', () => {
			it('should throw an error', () => {
				const conditions = [['key', 'value'], 45];
				(() => optionsBuilder.build(undefined, conditions)).should.throw(Error);
			});
		});

		describe('when given a condition that is a non-two element array', () => {
			it('should throw an error', () => {
				const conditions = [['key', 'value'], ['a'], ['b'], ['c']];
				(() => optionsBuilder.build(undefined, conditions)).should.throw(Error);
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

				const result = options.getConditions();
				result.size.should.equal(2);
				result.get(key1).should.equal(val1);
				result.get(key2).should.equal(val2);
			});
		});

		describe('when given fields and conditions', () => {
			it('should set both correctly', () => {
				const key = 'theKey';
				const val = 'theVal';

				const fields = ['abc', 'def', 'ghi', 'jkl', 'mno'];
				const conditions = [[key, val]];

				const options = optionsBuilder.build(fields, conditions);

				options.getFields().should.deep.equal(fields);

				const conditionResult = options.getConditions();
				conditionResult.size.should.equal(1);
				conditionResult.get(key).should.equal(val);
			});
		});
	});
});
