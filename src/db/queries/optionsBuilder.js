import { build as buildFields } from './fieldsBuilder';
import { build as buildConditions } from './conditionsBuilder';

const optionsBuilder = (() => {
	const build = (fields, conditions) => {
		return Object.freeze({
			getFields: () => buildFields(fields),
			getConditions: () => buildConditions(conditions)
		});
	};

	return Object.freeze({
		build
	});
})();

export default optionsBuilder;
