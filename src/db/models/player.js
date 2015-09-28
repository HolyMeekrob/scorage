import db from '../client';
import optionsBuilder from '../queries/optionsBuilder';
import queryBuilder from '../queries/queryBuilder';
import { single } from '../../util';

const player = (() => {
	const schema = {
		name: 'player',
		columns: {
			id: {
				type: 'number',
				required: true,
				canCreate: false,
				canUpdate: false
			},
			first_name: {
				type: 'text',
				required: false,
				canCreate: true,
				canUpdate: true
			},
			middle_name: {
				type: 'text',
				required: false,
				canCreate: true,
				canUpdate: true
			},
			last_name: {
				type: 'text',
				required: false,
				canCreate: true,
				canUpdate: true
			},
			nickname: {
				type: 'text',
				required: true,
				canCreate: true,
				canUpdate: true
			},
			email: {
				type: 'text',
				required: false,
				canCreate: true,
				canUpdate: true
			},
			phone: {
				type: 'text',
				required: false,
				canCreate: true,
				canUpdate: true
			},
			address: {
				type: 'text',
				required: false,
				canCreate: true,
				canUpdate: true
			},
			description: {
				type: 'text',
				required: false,
				canCreate: true,
				canUpdate: true
			},
			website: {
				type: 'text',
				required: false,
				canCreate: true,
				canUpdate: true
			}
		}
	};

	const create = (vals) => {
		const query = queryBuilder.insert(schema, vals);

		return db.makeRequest(query)
			.then((result) => {
				return Promise.resolve(single(result.rows));
			});
	};

	const get = (options) => {
		const query = queryBuilder.select(schema, options);

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
		create,
		getAll,
		getById
	});
})();

export default player;
