export default (getDataStore, modelName) => {
	const getModel = () => {
		return getDataStore()[modelName];
	};

	const create = (vals) => {
		return getModel().create(vals);
	};

	const del = (conditions) => {
		return getModel().del(conditions);
	};

	const deleteById = (id) => {
		return getModel().deleteById(id);
	};

	const update = (vals, conditions) => {
		return getModel().update(vals, conditions);
	};

	const updateById = (id, vals) => {
		return getModel().update(id, vals);
	};

	const get = (fields, conditions) => {
		return getModel().get(fields, conditions);
	};

	const getById = (id, fields) => {
		return getModel().getById(id, fields);
	};

	return Object.freeze({
		create,
		del,
		deleteById,
		get,
		getById,
		update,
		updateById
	});
};
