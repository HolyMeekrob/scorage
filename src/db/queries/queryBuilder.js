import { select } from './selectQueryBuilder';
import { insert } from './insertQueryBuilder';
import { update } from './updateQueryBuilder';

const queryBuilder = (() => {
	return Object.freeze({
		select,
		insert,
		update
	});
})();

export default queryBuilder;
