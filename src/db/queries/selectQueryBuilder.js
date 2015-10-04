import { getFields } from '../subqueries/fieldsBuilder';
import { getConditions } from '../subqueries/conditionsBuilder';
import { getSources } from '../subqueries/sourcesBuilder';
import { isTableNameValid } from './queryBuilderUtil';
import { any } from '../../util';

const selectQueryBuilder = (() => {
	const select = (schema, fields, conditions) => {
		if (!isTableNameValid(schema)) {
			throw new Error('Valid table name required');
		}

		const fieldsStr = getFields(fields);
		const conditionsStr = getConditions(conditions);

		return `SELECT ${fieldsStr} FROM ${schema.name}${conditionsStr}`;
	};

	const selectJoin = (schemas, fields, joins, conditions) => {
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
		select,
		selectJoin
	});
})();

export default selectQueryBuilder;
