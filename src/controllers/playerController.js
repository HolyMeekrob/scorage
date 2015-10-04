import playerModel from '../db/models/player';
import koaBody from 'koa-body';
import koaRouter from 'koa-router';
const router = koaRouter({ prefix: '/players' });
const bodyParser = koaBody();

// Get all players
router.get('/', function* (next) {
	this.type = 'application/json';

	yield playerModel.get()
		.then((players) => {
			this.body = players;
		});

	yield next;
});

// Get player
router.get('/:id', function* (next) {
	this.type = 'application/json';

	yield playerModel.getById(parseInt(this.params.id, 10))
		.then((player) => {
			this.body = player;
		});

	yield next;
});

// Create player
router.post('/', bodyParser, function* (next) {
	this.accepts('application/json');
	this.type = 'application/json';

	const newPlayer = yield playerModel.create(this.request.body);
	this.body = newPlayer;
	yield next;
});

// Update player
router.put('/:id', bodyParser, function* (next) {
	this.accepts('application/json');
	this.type = 'application/json';

	const updatedPlayer = yield playerModel.updateById(
		parseInt(this.params.id, 10), this.request.body);
	this.body = updatedPlayer;

	yield next;
});

export default router;
