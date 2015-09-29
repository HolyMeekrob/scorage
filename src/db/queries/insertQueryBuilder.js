import { isNil, difference, any, intersection } from '../../util';
import {
	isTypeMatch,
	isTableNameValid,
	getFormattedValue
} from './queryBuilderUtil';

const insertQueryBuilder = (() => {
	const checkValuesForInsert = (schema, values) => {
		const schemaColumns = Object.getOwnPropertyNames(schema.columns);
		const valueColumns = Object.getOwnPropertyNames(values);

		const requiredColumns = schemaColumns.filter((col) => {
			return schema.columns[col].required;
		});

		const missingColumns = difference(requiredColumns, valueColumns);
		if (any(missingColumns)) {
			throw new Error(`Columns [${missingColumns.join(', ')}] are required`);
		}

		const cannotInsertColumns = schemaColumns.filter((col) => {
			return !schema.columns[col].canCreate;
		});

		const extraColumns = intersection(cannotInsertColumns, valueColumns);
		if (any(extraColumns)) {
			throw new Error(
				`Columns [${extraColumns.join(', ')}] cannot be inserted`);
		}

		const invalidColumns = difference(valueColumns, schemaColumns);
		if (any(invalidColumns)) {
			throw new Error(`Columns [${invalidColumns.join(', ')}] are invalid`);
		}

		const typeMismatches = valueColumns.filter((col) => {
			return !isTypeMatch(values[col], schema.columns[col].type);
		});
		if (any(typeMismatches)) {
			throw new Error(
				`Columns [${typeMismatches.join(', ')}] are the wrong type`);
		}
	};

	const insert = (schema, values) => {
		if (!isTableNameValid(schema)) {
			throw new Error('Valid table name required');
		}

		if (isNil(values) || typeof values !== 'object') {
			throw new Error('Insert values must be an object');
		}

		checkValuesForInsert(schema, values);

		const updateCols = Object.getOwnPropertyNames(values);

		const colVals = updateCols.reduce((arr, col) => {
			arr.push([col, getFormattedValue(
				values[col], schema.columns[col].type)]);
			return arr;
		}, []);

		const queryCols = colVals.map((both) => both[0]).join(', ');
		const queryVals = colVals.map((both) => both[1]).join(', ');

		return `INSERT INTO ${schema.name} (${queryCols}) VALUES (${queryVals}) \
			RETURNING *`
			.trim()
			.replace(/\t/g, '');
	};

	return Object.freeze({
		insert
	});
})();

export default insertQueryBuilder;
