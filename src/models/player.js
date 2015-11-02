import baseModel from './baseModel';

export default (getDataStore) => {
	const base = baseModel(getDataStore, 'player');
	const { create, get, getById, update, updateById } = base;

	return Object.freeze({
		create,
		get,
		getById,
		update,
		updateById
	});
};
