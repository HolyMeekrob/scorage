import { isNil } from '../../util';

const queryBuilderUtil = (() => {
	const isTableNameValid = (schema) => {
		return !isNil(schema) && (typeof schema.name === 'string');
	};

	const isTypeMatch = (value, type) => {
		if (isNil(value)) {
			return true;
		}

		if (type === 'text') {
			return typeof value === 'string';
		}

		if (type === 'number') {
			return typeof value === 'number';
		}

		if (type === 'boolean') {
			return typeof value === 'boolean';
		}

		if (type === 'json') {
			return value !== null && typeof value === 'object';
		}

		throw new Error(`${type} is not a valid type`);
	};

	const getFormattedValue = (value, type) => {
		if (isNil(value)) {
			return 'NULL';
		}

		if (type === 'text') {
			return `'${value}'`;
		}

		if (type === 'number') {
			return value;
		}

		if (type === 'boolean') {
			return value ? 'TRUE' : 'FALSE';
		}

		if (type === 'json') {
			return JSON.stringify(value);
		}

		throw new Error(`${type} is not a valid type`);
	};

	return Object.freeze({
		isTableNameValid,
		isTypeMatch,
		getFormattedValue
	});
})();

export default queryBuilderUtil;
