import { isNil, any } from '../../util';
import {
	isTableNameValid,
	getMisusedColumns,
	getInvalidColumns,
	getTypeMismatchedColumns,
	getFormattedValue
} from './queryBuilderUtil';

const updateQueryBuilder = (() => {
	const checkValuesForUpdate = (schema, values) => {
		if (!any(Object.keys(values))) {
			throw new Error('Must update at least one value');
		}

		const readonlyColumns = getMisusedColumns(schema, values, 'canUpdate');
		if (any(readonlyColumns)) {
			throw new Error(
				`Columns [${readonlyColumns.join(', ')} are readonly`);
		}

		const invalidColumns = getInvalidColumns(schema, values);
		if (any(invalidColumns)) {
			throw new Error(`Columns [${invalidColumns.join(', ')}] are invalid`);
		}

		const typeMismatches = getTypeMismatchedColumns(schema, values);
		if (any(typeMismatches)) {
			throw new Error(
				`Columns [${typeMismatches.join(', ')}] are the wrong type`);
		}
	};

	const update = (schema, values, options) => {
		if (!isTableNameValid(schema)) {
			throw new Error('Valid table name required');
		}

		if (isNil(values) || typeof values !== 'object') {
			throw new Error('Update values must be an object');
		}

		checkValuesForUpdate(schema, values);

		const querySets = Object.keys(values).map((col) => {
			const value = getFormattedValue(values[col], schema.columns[col].type);
			return `${col} = ${value}`;
		});

		return `UPDATE ${schema.name} SET ${querySets}\
			${options.getConditions()} RETURNING *`
			.trim()
			.replace(/\t/g, '');
	};

	return Object.freeze({
		update
	});
})();

export default updateQueryBuilder;
