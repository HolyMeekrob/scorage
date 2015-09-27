const router = require('koa-router')({ prefix: '/players' });
const koaBody = require('koa-body');
const playerModel = require('../db/models/player');

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

module.exports = router;
