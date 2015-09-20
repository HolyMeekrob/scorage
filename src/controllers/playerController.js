const router = require('koa-router')();
const playerModel = require('../db/models/player');

router.get('/players', function *(next) {
	this.type = 'application/json';
	yield next;
	yield playerModel.getAll()
		.then((players) => {
			this.body = players;
		});
});

router.get('/players/:id', function *(next) {
	this.type = 'application/json';
	yield next;

	yield playerModel.getById(this.params.id)
		.then((player) => {
			this.body = player;
		});
});

module.exports = router;
