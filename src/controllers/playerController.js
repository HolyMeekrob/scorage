import koaBody from 'koa-body';
import playerModel from '../db/models/player';
import koaRouter from 'koa-router';
const router = koaRouter({ prefix: '/players' });


router.get('/', function* (next) {
	this.type = 'application/json';

	yield playerModel.getAll()
		.then((players) => {
			this.body = players;
		});

	yield next;
});

router.get('/:id', function* (next) {
	this.type = 'application/json';

	yield playerModel.getById(this.params.id)
		.then((player) => {
			this.body = player;
		});

	yield next;
});

router.post('/players', koaBody, function* (next) {
	this.accepts('application/json');

	const newPlayer = yield playerModel.create(this.request.body);
	this.body = JSON.stringify(newPlayer);
	yield next;
});

export default router;
