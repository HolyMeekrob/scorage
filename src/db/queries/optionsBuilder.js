import { isNil } from '../../util';

const options = () => {
	let fields = [];
	let conditions = [];

	const checkFields = (fieldsToCheck) => {
		if (isNil(fieldsToCheck)) {
			return true;
		}

		if (!Array.isArray(fieldsToCheck)) {
			throw new Error('Query fields must be an array');
		}

		return true;
	};

	const checkConditions = (conditionsToCheck) => {
		if (isNil(conditionsToCheck)) {
			return true;
		}

		if (!Array.isArray(conditionsToCheck)) {
			throw new Error('Query conditions must be an array');
		}

		const invalidConditions = conditionsToCheck.filter((condition) => {
			return (!Array.isArray(condition) || condition.length !== 2);
		});

		if (invalidConditions.length > 0) {
			throw new Error(
				'Query conditions must be an array of two element arrays');
		}

		return true;
	};

	const getFields = () => {
		return fields.slice(0);
	};

	const setFields = (newFields) => {
		checkFields(newFields);
		fields = [].concat(newFields).filter((field) => !isNil(field));
	};

	const getConditions = () => {
		return new Map(conditions);
	};

	const setConditions = (newConditions) => {
		checkConditions(newConditions);
		conditions = new Map(newConditions);
	};

	return Object.freeze({
		getFields,
		setFields,
		getConditions,
		setConditions
	});
};

const optionsBuilder = (() => {
	const build = (fields, conditions) => {
		const newOptions = options();
		newOptions.setFields(fields);
		newOptions.setConditions(conditions);
		return newOptions;
	};

	return Object.freeze({
		build
	});
})();

export default optionsBuilder;
