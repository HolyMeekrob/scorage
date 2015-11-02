import baseModel from './baseModel';

export default (getDataStore) => {
	const base = baseModel(getDataStore, 'season');
	const { create, get, getById, update, updateById } = base;

	const getTeams = (seasonId) => {
		return getDataStore().season.getTeams(seasonId);
	};

	const addTeam = (teamId, seasonId) => {
		return getDataStore().season.addTeam(teamId, seasonId);
	};

	const removeTeam = (teamId, seasonId) => {
		return getDataStore().season.removeTeam(teamId, seasonId);
	};

	return Object.freeze({
		addTeam,
		create,
		get,
		getTeams,
		getById,
		removeTeam,
		update,
		updateById
	});
};
