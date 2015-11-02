import baseModel from './baseModel';

export default (getDataStore) => {
	const base = baseModel(getDataStore, 'team');
	const { create, get, getById, update, updateById } = base;

	const getRoster = (teamId) => {
		return getDataStore().team.getRoster(teamId);
	};

	const addPlayer = (playerId, teamId) => {
		return getDataStore().team.addPlayer(playerId, teamId);
	};

	const removePlayer = (playerId, teamId) => {
		return getDataStore().team.removePlayer(playerId, teamId);
	};

	return Object.freeze({
		addPlayer,
		create,
		get,
		getById,
		getRoster,
		removePlayer,
		update,
		updateById
	});
};
