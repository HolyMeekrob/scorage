import { getFields } from '../subqueries/fieldsBuilder';
import { getConditions } from '../subqueries/conditionsBuilder';
import { isTableNameValid } from './queryBuilderUtil';

const selectQueryBuilder = (() => {
	const select = (schema, fields, conditions) => {
		if (!isTableNameValid(schema)) {
			throw new Error('Valid table name required');
		}

		const fieldsStr = getFields(fields);
		const conditionsStr = getConditions(conditions);

		return `SELECT ${fieldsStr} FROM ${schema.name}${conditionsStr}`;
	};

	return Object.freeze({
		select
	});
})();

export default selectQueryBuilder;
