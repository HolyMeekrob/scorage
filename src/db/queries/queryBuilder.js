const select = require('./selectQueryBuilder').select;
const insert = require('./insertQueryBuilder').insert;

const queryBuilder = (() => {
	return Object.freeze({
		select,
		insert
	});
})();

module.exports = queryBuilder;
