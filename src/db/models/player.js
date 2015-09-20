const db = require('../client');
const queryBuilder = require('./queryBuilder');
const isNil = require('../../util').isNil;

const player = (() => {
	const tableName = 'player';

	const read = (options) => {
		const query = queryBuilder.select(tableName, options);

		return db.makeRequest(query)
			.then((result) => {
				return Promise.resolve(result.rows);
			});
	};

	return Object.freeze({
		get: read
	});
})();

module.exports = player;
