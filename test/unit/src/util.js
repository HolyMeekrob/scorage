const isNil = require('../../../src/util').isNil;
const should = require('chai').should();

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
});
