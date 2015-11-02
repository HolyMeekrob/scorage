import baseModel from './baseModel';

export default (getDataStore) => {
	const base = baseModel(getDataStore, 'game');
	const { create, get, getById, update, updateById } = base;

	const getByFormatterId = (formatterId) => {
		return getDataStore().game.getByFormatterId(formatterId);
	};

	return Object.freeze({
		create,
		get,
		getByFormatterId,
		getById,
		update,
		updateById
	});
};
