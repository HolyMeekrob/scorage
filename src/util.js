const util = (() => {
	const isNil = (obj) => {
		return obj === undefined || obj === null;
	};

	return Object.freeze({
		isNil
	});
})();

module.exports = util;
