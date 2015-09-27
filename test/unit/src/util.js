const util = require('../../../src/util');
const isNil = util.isNil;
const single = util.single;
const isIterable = util.isIterable;
const any = util.any;
const includes = util.includes;
const difference = util.difference;

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

	describe('#isIterable()', () => {
		describe('when not given an argument', () => {
			it('should return false', () => {
				isIterable().should.be.false;
			});
		});

		describe('when given null', () => {
			it('should return false', () => {
				isIterable(null).should.be.false;
			});
		});

		describe('when given a number', () => {
			it('should return false', () => {
				isIterable(5).should.be.false;
			});
		});

		describe('when given a boolean', () => {
			it('should return false', () => {
				isIterable(true).should.be.false;
			});
		});

		describe('when given a string', () => {
			it('should return true', () => {
				isIterable('hello').should.be.true;
			});
		});

		describe('when given an array', () => {
			it('should return true', () => {
				isIterable([]).should.be.true;
			});
		});

		describe('when given an object', () => {
			it('should return false', () => {
				isIterable({}).should.be.false;
			});
		});

		describe('when given a map', () => {
			it('should return true', () => {
				isIterable(new Map()).should.be.true;
			});
		});

		describe('when given a set', () => {
			it('should return true', () => {
				isIterable(new Set()).should.be.true;
			});
		});
	});

	describe('#any()', () => {
		describe('when not given an argument', () => {
			it('should throw an error', () => {
				(() => any()).should.throw(Error);
			});
		});

		describe('when given null', () => {
			it('should throw an error', () => {
				(() => any(null)).should.throw(Error);
			});
		});

		describe('when given a non-iterable', () => {
			it('should throw an error', () => {
				(() => any(23)).should.throw(Error);
			});
		});

		describe('when given an empty array', () => {
			it('should return false', () => {
				any([]).should.be.false;
			});
		});

		describe('when given an empty string', () => {
			it('should return false', () => {
				any('').should.be.false;
			});
		});

		describe('when given an empty map', () => {
			it('should return false', () => {
				any(new Map()).should.be.false;
			});
		});

		describe('when given a non-empty array', () => {
			it('should return true', () => {
				any([1, 'hello', true]).should.be.true;
			});
		});

		describe('when given a non-empty string', () => {
			it('should return true', () => {
				any('string').should.be.true;
			});
		});

		describe('when given a non-empty set', () => {
			it('should return true', () => {
				any(new Set([7, 8, 9])).should.be.true;
			});
		});
	});

	describe('#includes', () => {
		describe('when not given the first argument', () => {
			it('should throw an error', () => {
				(() => includes()).should.throw(Error);
			});
		});

		describe('when given a non-iterable', () => {
			it('should throw an error', () => {
				(() => includes(true)).should.throw(Error);
			});
		});

		describe('when given an empty string', () => {
			it('should return false', () => {
				includes('').should.be.false;
			});
		});

		describe('when given an empty array', () => {
			it('should return false', () => {
				includes([]).should.be.false;
			});
		});

		describe('when given a single-element set and a value not in the set', () => {
			it('should return false', () => {
				const iter = new Set();
				const val1 = 4;
				const val2 = 5;
				iter.add(val1);

				includes(iter, val2).should.be.false;
			});
		});

		describe('when given a one character string and the character in the string', () => {
			it('should return true', () => {
				const char = 'a';
				const iter = char;

				includes(iter, char).should.be.true;
			});
		});

		describe('when given a multiple-element array and a value not in the array', () => {
			it('should return false', () => {
				const val1 = false;
				const val2 = 7;
				const val3 = 'hi';
				const val4 = { prop: [] };
				const val5 = true;
				const iter = [val1, val2, val3, val4];

				includes(iter, val5).should.be.false;
			});
		});

		describe('when given a multiple-element iterable and a value in the iterable', () => {
			it('should return true', () => {
				const key1 = 'key1';
				const key2 = 'key2';
				const val1 = 8;
				const val2 = 100;

				const iter = new Map([[key1, val1], [key2, val2]]);

				includes(iter.keys(), key2).should.be.true;
			});
		});
	});

	describe('#difference()', () => {
		describe('when given no arguments', () => {
			it('should throw an error', () => {
				(() => difference()).should.throw(Error);
			});
		});

		describe('when given a nil second argument', () => {
			it('should throw an error', () => {
				(() => difference([])).should.throw(Error);
			});
		});

		describe('when given a first argument that is not iterable', () => {
			it('should throw an error', () => {
				(() => difference(12, [])).should.throw(Error);
			});
		});

		describe('when given a second argument that is not iterable', () => {
			it('should throw an error', () => {
				(() => difference([12], 21)).should.throw(Error);
			});
		});

		describe('when given identical sets', () => {
			it('should return an empty array', () => {
				const arr = [1, 4, 9];
				difference(arr, arr).should.deep.equal([]);
			});
		});

		describe('when given a subset', () => {
			it('should return an empty array', () => {
				const a = ['hello', 'there'];
				const b = ['oh', 'there', 'hello'];

				difference(a, b).should.deep.equal([]);
			});
		});

		describe('when given a superset', () => {
			it('should return the difference', () => {
				const a = [1, 2, 3, 4, 5];
				const b = [4, 2];

				const diff = difference(a, b);
				diff.length.should.equal(3);
				diff.should.include(1);
				diff.should.include(3);
				diff.should.include(5);
			});
		});

		describe('when given a two sets with elements in common', () => {
			it('should should return the difference', () => {
				const a = [10, 20, 30];
				const b = [1, 10, 100];

				difference(a, b).should.deep.equal([20, 30]);
			});
		});

		describe('when given two disjoint sets', () => {
			it('should return the first set', () => {
				const a = ['a', 'alpha', 'one'];
				const b = ['b', 'beta', 'two'];

				difference(a, b).should.deep.equal(a);
			});
		});

		describe('when given iterables with duplicates', () => {
			it('should retain the duplicates', () => {
				const a = [1, 2, 1, 3];
				const b = [3, 4, 5];

				const diff = difference(a, b);
				diff.length.should.equal(3);
				diff.should.include(1);
				diff.should.include(2);
				diff.should.not.include(3);
				diff.filter((x) => x === 1).length.should.equal(2);
			});
		});
	});
});
