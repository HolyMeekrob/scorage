const db = require('../client');
const optionsBuilder = require('../queries/optionsBuilder');
const queryBuilder = require('../queries/queryBuilder');
const single = require('../../util').single;

const player = (() => {
	const tableName = 'player';

	const get = (options) => {
		const query = queryBuilder.select(tableName, options);

		return db.makeRequest(query)
			.then((result) => {
				return Promise.resolve(result.rows);
			});
	};

	const getSingle = (options) => {
		return get(options)
			.then((rows) => {
				return Promise.resolve(single(rows));
			});
	};

	const getAll = (fields) => {
		const options = optionsBuilder.build(fields);
		return get(options);
	};

	const getById = (id, fields) => {
		const options = optionsBuilder.build(fields, [['id', id]]);
		return getSingle(options);
	};

	return Object.freeze({
		getAll,
		getById
	});
})();

module.exports = player;
