import leagueModel from '../db/models/league';
import koaBody from 'koa-body';
import koaRouter from 'koa-router';
const router = koaRouter({ prefix: '/leagues' });
const bodyParser = koaBody();

// Get all leagues
router.get('/', function* (next) {
	this.type = 'application/json';

	yield leagueModel.get()
		.then((leagues) => {
			this.body = leagues;
		});

	yield next;
});

// Get league
router.get('/:id', function* (next) {
	this.type = 'application/json';

	yield leagueModel.getById(parseInt(this.params.id, 10))
		.then((league) => {
			this.body = league;
		});

	yield next;
});

// Update league
router.put('/:id', bodyParser, function* (next) {
	this.accepts('application/json');
	this.type = 'application/json';

	const updatedLeague = yield leagueModel.updateById(
		parseInt(this.params.id, 10), this.request.body);
	this.body = updatedLeague;

	yield next;
});

export default router;
