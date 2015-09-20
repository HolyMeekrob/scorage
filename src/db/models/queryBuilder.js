const isNil = require('../../util').isNil;

const queryBuilder = (() => {
	const getFieldString = (fields) => {
		if (isNil(fields)) {
			return '*';
		}

		if (!Array.isArray(fields)) {
			throw new Error('Query fields must be an array');
		}

		return fields.reduce((prev, curr) => {
			return prev === ''
				? `${curr}`
				: `${prev}, ${curr}`;
		}, '');
	};

	const select = (tableName, options) => {
		if (isNil(tableName)) {
			throw new Error('Table name required to build a query');
		}

		if (typeof tableName !== 'string') {
			throw new Error('Table name must be a string');
		}

		if (!isNil(options) && typeof options !== 'object') {
			throw new Error('Options must be an object');
		}

		if (isNil(options)) {
			options = {};
		}

		return `SELECT ${getFieldString(options.fields)} FROM ${tableName}`;
	};

	return Object.freeze({
		select
	});
})();

module.exports = queryBuilder;
