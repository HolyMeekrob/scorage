import baseModel from './baseModel';

const player = (() => {
	const schema = {
		name: 'player',
		canDelete: false,
		columns: {
			id: {
				type: 'number',
				required: false,
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

	const base = baseModel(schema);

	return Object.freeze({
		getTableName: base.getTableName,
		create: base.create,
		getAll: base.getAll,
		getById: base.getById,
		update: base.update,
		updateById: base.updateById
	});
})();

export default player;
