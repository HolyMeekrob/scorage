const optionsBuilder = require('./optionsBuilder');
const isNil = require('../../util').isNil;

const queryBuilder = (() => {
	const getFieldsString = (fields) => {
		if (isNil(fields) || fields.length === 0) {
			return '*';
		}

		if (!Array.isArray(fields)) {
			throw new Error('Query fields must be an array');
		}

		return fields.join(', ');
	};

	const getConditionsString = (conditions) => {
		if (isNil(conditions) || conditions.size === 0) {
			return '';
		}

		const clauses = Array.from(conditions.entries()).map((condition) => {
			if (Array.isArray(condition[1])) {
				return `${condition[0]} IN (${condition[1].join(', ')})`;
			}

			return `${condition[0]} = ${condition[1]}`;
		});

		return ` WHERE ${clauses.join(' AND ')}`;
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
			options = optionsBuilder.build();
		}

		return `SELECT ${getFieldsString(options.getFields())} FROM ${tableName}\
			${getConditionsString(options.getConditions())}`
			.trim()
			.replace(/\t/g, '');
	};

	return Object.freeze({
		select
	});
})();

module.exports = queryBuilder;
