import baseModel from './baseModel';
import player from './player';
import roster from './rosterSpot';
// import { getConditions } from '../subqueries/conditionsBuilder';
// import { removeExtraWhitespace } from '../queries/queryBuilderUtil';
import { selectJoin } from '../queries/selectQueryBuilder';

const team = (() => {
	const schema = {
		name: 'team',
		canDelete: false,
		columns: {
			id: {
				type: 'number',
				required: false,
				canCreate: false,
				canUpdate: false
			},
			name: {
				type: 'text',
				required: true,
				canCreate: true,
				canUpdate: true
			},
			coach_id: {
				type: 'number',
				required: false,
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

// 	const getRoster = (teamId) => {
// 		const playerTable = player.getTableName();
// 		const rosterTable = roster.getTableName();
// 		const conditions = getConditions(
// 			[[`${rosterTable}.team_id`, teamId]]);
// 		const query = removeExtraWhitespace(
// 			`SELECT ${playerTable}.* FROM ${playerTable} \
// 			INNER JOIN ${rosterTable} ON ${playerTable}.id = ${rosterTable}.player_id\
// 			${conditions}`
// 		);
//
// 		return base.runQuery(query);
// 	};

	const getRoster = (teamId) => {
		return base.runQuery(selectJoin(
			[player.getSchema(), roster.getSchema()],
			undefined,
			[['id', 'player_id']],
			[[`${roster.getTableName()}.team_id`, teamId]]));
	};

	const addPlayer = (teamId, playerId) => {
		return roster.create({
			team_id: teamId,
			player_id: playerId,
		}).then(() => {
			return Promise.resolve(getRoster(teamId));
		});
	};

	const removePlayer = (teamId, playerId) => {
		return roster.removePlayerFromTeam(teamId, playerId)
			.then(() => {
				return Promise.resolve(base.getById(teamId));
			});
	};

	return Object.freeze({
		getSchema: base.getSchema,
		getTableName: base.getTableName,
		create: base.create,
		get: base.get,
		getById: base.getById,
		getRoster,
		update: base.update,
		updateById: base.updateById,
		addPlayer,
		removePlayer
	});
})();

export default team;
