import baseModel from './baseModel';

export default (getDataStore) => {
	const base = baseModel(getDataStore, 'match');
	const { create, deleteById, get, getById, update, updateById } = base;

	const getPlays = (id) => {
		return getDataStore().match.getPlays(id);
	};

	return Object.freeze({
		create,
		deleteById,
		get,
		getById,
		getPlays,
		update,
		updateById
	});
};
