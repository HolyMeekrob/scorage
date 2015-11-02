import baseModel from './baseModel';

export default (getDataStore) => {
	const base = baseModel(getDataStore, 'matchSite');
	const { create, deleteById, get, getById, update, updateById } = base;

	return Object.freeze({
		create,
		deleteById,
		get,
		getById,
		update,
		updateById
	});
};
