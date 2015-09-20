const util = require('../../../src/util');
const isNil = util.isNil;
const single = util.single;

require('chai').should();

describe('util', () => {
	describe('#isNil()', () => {
		describe('when given undefined', () => {
			it('should return true', () => {
				isNil(undefined).should.be.true;
			});
		});

		describe('when given null', () => {
			it('should return true', () => {
				isNil(null).should.be.true;
			});
		});

		describe('when given false', () => {
			it('should return false', () => {
				isNil(false).should.be.false;
			});
		});

		describe('when given an empty array', () => {
			it('should return false', () => {
				isNil([]).should.be.false;
			});
		});

		describe('when given an empty object', () => {
			it('should return false', () => {
				isNil({}).should.be.false;
			});
		});

		describe('when given an empty string', () => {
			it('should return false', () => {
				isNil('').should.be.false;
			});
		});

		describe('when given zero', () => {
			it('should return false', () => {
				isNil(0).should.be.false;
			});
		});
	});

	describe('#single()', () => {
		describe('when not given an argument', () => {
			it('should throw an error', () => {
				(() => single()).should.throw(Error);
			});
		});

		describe('when given a non-array', () => {
			it('should throw an error', () => {
				(() => single('not an array')).should.throw(Error);
			});
		});

		describe('when given a multiple element array', () => {
			it('should throw an error', () => {
				(() => single([1, 2])).should.throw(Error);
			});
		});

		describe('when given a zero element array', () => {
			it('should return an empty object', () => {
				single([]).should.deep.equal({});
			});
		});

		describe('when given a single element array', () => {
			it('should return that element', () => {
				const elem = 'hello';
				single([elem]).should.equal(elem);
			});
		});
	});
});
