import baseModel from './baseModel';
import { deepFreeze } from '../../util';

const match = (() => {
	const schema = deepFreeze({
		name: 'match',
		canDelete: true,
		columns: {
			id: {
				type: 'number',
				required: false,
				canCreate: false,
				canUpdate: false
			},
			away_team_id: {
				type: 'number',
				required: true,
				canCreate: true,
				canUpdate: false
			},
			home_team_id: {
				type: 'number',
				required: true,
				canCreate: true,
				canUpdate: false
			},
			match_site_id: {
				type: 'number',
				required: false,
				canCreate: true,
				canUpdate: true
			},
			season_id: {
				type: 'number',
				required: false,
				canCreate: true,
				canUpdate: true
			}
		}
	});

	const base = baseModel(schema);

	return Object.freeze({
		getSchema: base.getSchema,
		getTableName: base.getTableName,
		create: base.create,
		get: base.get,
		getById: base.getById,
		update: base.update,
		updateById: base.updateById,
		deleteById: base.deleteById
	});
})();

export default match;
