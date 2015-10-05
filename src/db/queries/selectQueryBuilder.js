import { getFields } from '../subqueries/fieldsBuilder';
import { getConditions } from '../subqueries/conditionsBuilder';
import { getSources } from '../subqueries/sourcesBuilder';
import { isTableNameValid } from './queryBuilderUtil';
import { any } from '../../util';

const selectQueryBuilder = (() => {
	const select = (schemas, fields, joins, conditions) => {
		schemas = Array.isArray(schemas) ? schemas : [schemas];
		const invalidTables = schemas.filter((schema) => {
			return !isTableNameValid(schema);
		}).map((schema) => schema.name);
		if (any(invalidTables)) {
			throw new Error(`Invalid tables: ${invalidTables.map.join(', ')}`);
		}

		const fieldsStr = getFields(fields);
		const sourcesStr = getSources(schemas, joins);
		const conditionsStr = getConditions(conditions);

		return `SELECT ${fieldsStr} FROM ${sourcesStr}${conditionsStr}`;
	};

	return Object.freeze({
		select
	});
})();

export default selectQueryBuilder;
