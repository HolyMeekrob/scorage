import { getFields } from '../../../../../src/db/subqueries/fieldsBuilder';
import chai from 'chai';
chai.should();

describe('fieldsBuilder', () => {
	describe('#getFields()', () => {
		describe('when given no arguments', () => {
			it('should return the wildcard', () => {
				getFields().should.equal('*');
			});
		});

		describe('when given fields that are not an array', () => {
			describe('and retrieving those fields', () => {
				it('should throw an error', () => {
					(() => getFields('not an array')).should.throw(Error);
				});
			});
		});

		describe('when given fields that are an array', () => {
			it('should have the fields in correct format', () => {
				const fields = ['left', 'right', 'center'];

				getFields(fields).should.deep.equal(fields.join(', '));
			});
		});
	});
});
