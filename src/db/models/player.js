const db = require('../client');
const isNil = require('../../util').isNil;

const player = (() => {
	const GET = (options) => {
		let fields = '*';
		if (!isNil(options) && !isNil(options.fields)) {
			fields = options.fields;
		}

		return db.makeRequest(`SELECT ${fields} FROM player`)
			.then((result) => {
				return Promise.resolve(result.rows);
			});
	};

	return Object.freeze({
		get: GET
	});
})();

module.exports = player;
