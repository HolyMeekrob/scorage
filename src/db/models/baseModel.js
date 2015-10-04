import db from '../client';
import queryBuilder from '../queries/queryBuilder';
import { single } from '../../util';

const baseModel = (schema) => {
	const makeSingle = (promise) => {
		return promise.then((rows) => {
			return Promise.resolve(single(rows));
		});
	};

	const getTableName = () => {
		return schema.name;
	};

	const runQuery = (query) => {
		return db.makeRequest(query)
			.then((result) => {
				return Promise.resolve(result.rows);
			});
	};

	const create = (vals) => {
		return makeSingle(runQuery(queryBuilder.insert(schema, vals)));
	};

	const del = (conditions) => {
		return runQuery(queryBuilder.delete(schema, conditions));
	};

	const deleteById = (id) => {
		return makeSingle(del([['id', id]]));
	};

	const get = (fields, conditions) => {
		return runQuery(queryBuilder.select(schema, fields, conditions));
	};

	const getById = (id, fields) => {
		return makeSingle(get(fields, [['id', id]]));
	};

	const update = (vals, conditions) => {
		return runQuery(queryBuilder.update(schema, vals, conditions));
	};

	const updateById = (id, vals) => {
		return makeSingle(update(vals, [['id', id]]));
	};

	return Object.freeze({
		getTableName,
		create,
		del,
		deleteById,
		get,
		getById,
		runQuery,
		update,
		updateById
	});
};

export default baseModel;
