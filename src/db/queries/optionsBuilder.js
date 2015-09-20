const isNil = require('../../util').isNil;

const options = () => {
	const checkFields = (fields) => {
		if (isNil(fields)) {
			return true;
		}

		if (!Array.isArray(fields)) {
			throw new Error('Query fields must be an array');
		}

		return true;
	};

	const checkConditions = (conditions) => {
		if (isNil(conditions)) {
			return true;
		}

		if (!Array.isArray(conditions)) {
			throw new Error('Query conditions must be an array');
		}

		const invalidConditions = conditions.filter((condition) => {
			return (!Array.isArray(condition) || condition.length !== 2);
		});

		if (invalidConditions.length > 0) {
			throw new Error(
				'Query conditions must be an array of two element arrays');
		}

		return true;
	};

	const getFields = () => {
		return this.fields;
	};

	const setFields = (fields) => {
		checkFields(fields);
		this.fields = [].concat(fields).filter((field) => !isNil(field));
	};

	const getConditions = () => {
		return this.conditions;
	};

	const setConditions = (conditions) => {
		checkConditions(conditions);
		this.conditions = new Map(conditions);
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

module.exports = optionsBuilder;
