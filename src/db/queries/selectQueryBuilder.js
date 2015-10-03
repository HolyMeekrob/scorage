import optionsBuilder from './optionsBuilder';
import { isTableNameValid } from './queryBuilderUtil';
import { isNil } from '../../util';

const selectQueryBuilder = (() => {
	const select = (schema, options) => {
		if (!isTableNameValid(schema)) {
			throw new Error('Valid table name required');
		}

		if (!isNil(options) && typeof options !== 'object') {
			throw new Error('Options must be an object');
		}

		if (isNil(options)) {
			options = optionsBuilder.build();
		}

		return `SELECT ${options.getFields()} \
			FROM ${schema.name}\
			${options.getConditions()}`
			.trim()
			.replace(/\t/g, '');
	};

	return Object.freeze({
		select
	});
})();

export default selectQueryBuilder;
