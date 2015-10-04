import { select } from './selectQueryBuilder';
import { insert } from './insertQueryBuilder';
import { update } from './updateQueryBuilder';
import { del } from './deleteQueryBuilder';

const queryBuilder = (() => {
	return Object.freeze({
		select,
		insert,
		update,
		del
	});
})();

export default queryBuilder;
