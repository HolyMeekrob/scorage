const util = (() => {
	const isNil = (obj) => {
		return obj === undefined || obj === null;
	};

	const single = (arr) => {
		if (isNil(arr)) {
			throw new Error('Array is required');
		}

		if (!Array.isArray(arr)) {
			throw new Error('Argument must be an array');
		}

		if (arr.length > 1) {
			throw new Error('');
		}

		if (arr.length === 0) {
			return {};
		}

		return arr[0];
	};

	return Object.freeze({
		isNil,
		single
	});
})();

module.exports = util;
