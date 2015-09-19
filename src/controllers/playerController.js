const router = require('koa-router')();
const player = require('../db/models/player');

router.get('/players', function *(next) {
	this.type = 'application/json';
	yield next;
	yield player.get()
		.then((players) => {
			this.body = players;
		});
});

// router.get('/players/:id', function *(next) {
// 	this.type = 'application/json';
// 	yield player.findById(this.params.id)
// 		.then((player) => {
// 			this.body = player.dataValues;
// 		});
// });

module.exports = router;
