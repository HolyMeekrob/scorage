import { select } from './selectQueryBuilder';
import { insert } from './insertQueryBuilder';

const queryBuilder = (() => {
	return Object.freeze({
		select,
		insert
	});
})();

export default queryBuilder;
