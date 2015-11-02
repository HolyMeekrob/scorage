import baseModel from './baseModel';

export default (getDataStore) => {
	const base = baseModel(getDataStore, 'league');
	const { create, get, getById, update, updateById } = base;

	const getSeasons = (leagueId) => {
		return getDataStore().league.getSeasons(leagueId);
	};

	return Object.freeze({
		create,
		get,
		getById,
		getSeasons,
		update,
		updateById
	});
};
