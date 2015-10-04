import baseModel from './baseModel';
import optionsBuilder from '../queries/optionsBuilder';

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

	const getByTeam = (teamId) => {
		const options = optionsBuilder.build(undefined, [['team_id', teamId]]);
		return base.get(options);
	};

	const getByPlayer = (playerId) => {
		const options = optionsBuilder.build(undefined, [['player_id', playerId]]);
		return base.get(options);
	};

	const removePlayerFromTeam = (teamId, playerId) => {
		const options = optionsBuilder.build(
			undefined, [['team_id', teamId], ['player_id', playerId]]
		);
		return base.del(options);
	};

	return Object.freeze({
		getTableName: base.getTableName,
		create: base.create,
		getByTeam,
		getByPlayer,
		getAll: base.getAll,
		removePlayerFromTeam
	});
})();

export default rosterSpot;
