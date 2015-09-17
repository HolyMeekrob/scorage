const pg = require('pg');

const client = () => {
	const config = {
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		port: process.env.DB_PORT,
		host: process.env.DB_HOST,
		ssl: process.env.DB_SSL
	};

	const makeRequest = (query) => {
		return new Promise((resolve, reject) => {
			pg.connect(config, (err, pgClient, done) => {
				if (err) {
					return reject(
						`Error establishing connection to the database: ${err}`);
				}

				pgClient.query(query, (err, result) => {
					done();

					if (err) {
						return reject(`Error running query: ${err}`);
					}

					return resolve(result);
				});
			});
		});
	};

	return Object.freeze({
		makeRequest
	});
};

module.exports = Object.freeze(client());
