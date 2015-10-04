import { isTableNameValid } from './queryBuilderUtil';

const deleteQueryBuilder = (() => {
	const del = (schema, options) => {
		if (!isTableNameValid(schema)) {
			throw new Error('Valid table name required');
		}

		if (!schema.canDelete) {
			throw new Error(`Table ${schema.name} does not allow deletes`);
		}

		return `DELETE FROM ${schema.name}${options.getConditions()} RETURNING *`;
	};

	return Object.freeze({
		del
	});
})();

export default deleteQueryBuilder;
