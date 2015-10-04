import teamModel from '../db/models/team';
import koaBody from 'koa-body';
import koaRouter from 'koa-router';
const router = koaRouter({ prefix: '/teams' });
const bodyParser = koaBody();

// Get all teams
router.get('/', function* (next) {
	this.type = 'application/json';

	yield teamModel.getAll()
		.then((teams) => {
			this.body = teams;
		});

	yield next;
});

// Get team
router.get('/:id', function* (next) {
	this.type = 'application/json';

	yield teamModel.getById(parseInt(this.params.id, 10))
		.then((team) => {
			this.body = team;
		});

	yield next;
});

// Get roster
router.get('/:id/roster', function* (next) {
	this.type = 'application/json';

	yield teamModel.getRoster(parseInt(this.params.id, 10))
		.then((players) => {
			this.body = players;
		});

	yield next;
});

// Create team
router.post('/', bodyParser, function* (next) {
	this.accepts('application/json');
	this.type = 'application/json';

	const newTeam = yield teamModel.create(this.request.body);
	this.body = newTeam;
	yield next;
});

// Update team
router.put('/:id', bodyParser, function* (next) {
	this.accepts('application/json');
	this.type = 'application/json';

	const updatedTeam = yield teamModel.updateById(
		parseInt(this.params.id, 10), this.request.body);
	this.body = updatedTeam;

	yield next;
});

// Add player
router.put('/:teamId/player/:playerId', function* (next) {
	this.type = 'application/json';

	const updatedRoster = yield teamModel.addPlayer(
		parseInt(this.params.teamId, 10), parseInt(this.params.playerId, 10));
	this.body = updatedRoster;

	yield next;
});

export default router;
