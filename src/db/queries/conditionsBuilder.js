import { isNil } from '../../util';

const conditionsBuilder = (() => {
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

	const format = (val) => {
		if (typeof val === 'string') {
			return `'${val}'`;
		}
		return val;
	};

	const getConditionsString = (conditions) => {
		if (isNil(conditions) || conditions.length === 0) {
			return '';
		}

		const clauses = conditions.map((condition) => {
			if (Array.isArray(condition[1])) {
				return `${condition[0]} IN (${condition[1].map(format).join(', ') })`;
			}

			return `${condition[0]} = ${format(condition[1])}`;
		});

		return ` WHERE ${clauses.join(' AND ') }`;
	};

	const build = (conditions) => {
		checkConditions(conditions);
		return getConditionsString(conditions);
	};

	return Object.freeze({
		build
	});
})();

export default conditionsBuilder;
