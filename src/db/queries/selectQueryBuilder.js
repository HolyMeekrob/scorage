import optionsBuilder from './optionsBuilder';
import { isTableNameValid } from './queryBuilderUtil';
import { isNil } from '../../util';

const selectQueryBuilder = (() => {
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
				return `${condition[0]} IN (${condition[1].join(', ') })`;
			}

			return `${condition[0]} = ${condition[1]}`;
		});

		return ` WHERE ${clauses.join(' AND ') }`;
	};

	const select = (schema, options) => {
		if (!isTableNameValid(schema)) {
			throw new Error('Valid table name required');
		}

		if (!isNil(options) && typeof options !== 'object') {
			throw new Error('Options must be an object');
		}

		if (isNil(options)) {
			options = optionsBuilder.build();
		}

		return `SELECT ${getFieldsString(options.getFields()) } \
			FROM ${schema.name}\
			${getConditionsString(options.getConditions()) }`
			.trim()
			.replace(/\t/g, '');
	};

	return Object.freeze({
		select
	});
})();

export default selectQueryBuilder;
