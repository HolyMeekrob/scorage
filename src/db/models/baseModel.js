import db from '../client';
import optionsBuilder from '../queries/optionsBuilder';
import queryBuilder from '../queries/queryBuilder';
import { single } from '../../util';

const baseModel = (schema) => {
	const getTableName = () => {
		return schema.name;
	};

	const runQuery = (query) => {
		return db.makeRequest(query)
			.then((result) => {
				return Promise.resolve(result.rows);
			});
	};

	const runQuerySingle = (query) => {
		return runQuery(query)
			.then((rows) => {
				return Promise.resolve(single(rows));
			});
	};

	const create = (vals) => {
		return runQuerySingle(queryBuilder.insert(schema, vals));
	};

	const del = (options) => {
		return runQuery(queryBuilder.delete(schema, options));
	};

	const deleteSingle = (options) => {
		return runQuerySingle(queryBuilder.delete(schema, options));
	};

	const deleteById = (id) => {
		return deleteSingle(optionsBuilder.build(undefined, [['id', id]]));
	};

	const get = (options) => {
		return runQuery(queryBuilder.select(schema, options));
	};

	const getSingle = (options) => {
		return runQuerySingle(queryBuilder.select(schema, options));
	};

	const getAll = (fields) => {
		const options = optionsBuilder.build(fields);
		return get(options);
	};

	const getById = (id, fields) => {
		const options = optionsBuilder.build(fields, [['id', id]]);
		return getSingle(options);
	};

	const update = (vals, options) => {
		return runQuery(queryBuilder.update(schema, vals, options));
	};

	const updateById = (id, vals) => {
		const options = optionsBuilder.build(undefined, [['id', id]]);
		return update(vals, options);
	};

	return Object.freeze({
		getTableName,
		create,
		del,
		deleteSingle,
		deleteById,
		get,
		getSingle,
		getAll,
		getById,
		runQuery,
		runQuerySingle,
		update,
		updateById
	});
};

export default baseModel;
