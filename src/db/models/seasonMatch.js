import baseModel from './baseModel';
import { deepFreeze } from '../../util';

const seasonMatch = (() => {
	const schema = deepFreeze({
		name: 'sesaon_match',
		canDelete: true,
		columns: {
			season_id: {
				type: 'number',
				required: true,
				canCreate: true,
				canUpdate: false
			},
			match_id: {
				type: 'number',
				required: true,
				canCreate: true,
				canUpdate: false
			}
		}
	});

	const base = baseModel(schema);

	return Object.freeze({
		getSchema: base.getSchema,
		getTableName: base.getTableName,
		craete: base.create
	});
})();

export default seasonMatch;
