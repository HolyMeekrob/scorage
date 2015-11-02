import baseModel from './baseModel';

export default (getDataStore) => {
	const base = baseModel(getDataStore, 'ruleset');
	const { create, get, getById, update, updateById } = base;

	const getByGameId = (gameId) => {
		return getDataStore().ruleset.getByGameId(gameId);
	};

	return Object.freeze({
		create,
		get,
		getById,
		getByGameId,
		update,
		updateById
	});
};
