import seasonModel from '../db/models/season';
import koaBody from 'koa-body';
import koaRouter from 'koa-router';
const router = koaRouter({ prefix: '/seasons' });
const bodyParser = koaBody();

// Get all seasons
router.get('/', function* (next) {
	this.type = 'application/json';

	yield seasonModel.get()
		.then((seasons) => {
			this.body = seasons;
		});

	yield next;
});

// Get season
router.get('/:id', function* (next) {
	this.type = 'application/json';

	yield seasonModel.getById(parseInt(this.params.id, 10))
		.then((season) => {
			this.body = season;
		});

	yield next;
});

// Get teams
router.get('/:id/teams', function* (next) {
	this.type = 'application/json';

	yield seasonModel.getTeams(parseInt(this.params.id, 10))
		.then((teams) => {
			this.body = teams;
		});

	yield next;
});

// Create season
router.post('/', bodyParser, function* (next) {
	this.accepts('application/json');
	this.type = 'application/json';

	const newSeason = yield seasonModel.create(this.request.body);
	this.body = newSeason;

	yield next;
});

// Update season
router.put('/:id', bodyParser, function* (next) {
	this.accepts('application/json');
	this.type = 'application/json';

	const updatedSeason = yield seasonModel.updateById(
		parseInt(this.params.id, 10), this.request.body);
	this.body = updatedSeason;

	yield next;
});

// Add team
router.put('/:seasonId/team/:teamId', function* (next) {
	this.type = 'application/json';

	const updatedList = yield seasonModel.addTeam(
		parseInt(this.params.teamId, 10), parseInt(this.params.seasonId, 10));
	this.body = updatedList;

	yield next;
});

// Remove team
router.delete('/:seasonId/team/:teamId', function* (next) {
	this.type = 'application/json';

	const updatedList = yield seasonModel.removeTeam(
		parseInt(this.params.teamId, 10), parseInt(this.params.season, 10));
	this.body = updatedList;

	yield next;
});

export default router;
