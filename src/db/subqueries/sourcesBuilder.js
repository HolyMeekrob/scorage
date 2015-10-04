import { any, isNil, includes } from '../../util';
import { removeExtraWhitespace } from '../queries/queryBuilderUtil';
const sourcesBuilder = (() => {
	const zipArgs = (schemas, joins) => {
		return joins.map((join, i) => {
			return [schemas[i], schemas[i + 1], join[0], join[1]];
		});
	};

	const getSources = (schemas, joins) => {
		if (!isNil(joins) && !Array.isArray(joins)) {
			throw new Error('Sources must be an array');
		}

		schemas = Array.isArray(schemas) ? schemas : [schemas];
		joins = isNil(joins) ? [] : joins;

		if (schemas.length !== (joins.length + 1)) {
			throw new Error('Joins must be one less than total table count');
		}

		const zippedArgs = zipArgs(schemas, joins);

		const invalidJoins = zippedArgs.filter((zip) => {
			return !includes(Object.keys(zip[0].columns), zip[2])
			|| !includes(Object.keys(zip[1].columns), zip[3]);
		});

		if (any(invalidJoins)) {
			throw new Error('Join columns must exist in schemas');
		}

		return zippedArgs.reduce((prev, curr) => {
			return removeExtraWhitespace(
				`${prev} INNER JOIN ${curr[1].name} ON \
				${curr[0].name}.${curr[2]} = ${curr[1].name}.${curr[3]}`
			);
		}, zippedArgs[0][0].name);
	};

	return Object.freeze({
		getSources
	});
})();

export default sourcesBuilder;
