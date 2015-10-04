import baseModel from './baseModel';

const rosterSpot = (() => {
	const schema = {
		name: 'roster_spot',
		canDelete: true,
		columns: {
			player_id: {
				type: 'number',
				required: true,
				canCreate: true,
				canUpdate: false
			},
			team_id: {
				type: 'number',
				required: true,
				canCreate: true,
				canUpdate: false
			}
		}
	};

	const base = baseModel(schema);

	const removePlayerFromTeam = (teamId, playerId) => {
		return base.del([['team_id', teamId], ['player_id', playerId]]);
	};

	return Object.freeze({
		getSchema: base.getSchema,
		getTableName: base.getTableName,
		create: base.create,
		removePlayerFromTeam
	});
})();

export default rosterSpot;
