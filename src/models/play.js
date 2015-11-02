import baseModel from './baseModel';

export default (getDataStore) => {
	const base = baseModel(getDataStore, 'play');
	const { create, deleteById, get, getById, update, updateById } = base;

	const getPlaysByMatchId = (matchId) => {
		return getDataStore().play.getPlaysByMatchId(matchId);
	};

	return Object.freeze({
		create,
		deleteById,
		get,
		getById,
		getPlaysByMatchId,
		update,
		updateById
	});
};
