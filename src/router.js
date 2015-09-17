const playerController = require('./controllers/playerController');

const router = (app) => {
	const register = (controller) => {
		app.use(controller.routes());
		app.use(controller.allowedMethods());
	}
	const registerRoutes = () => {
		register(playerController);
	};

	return Object.freeze({
		registerRoutes
	});
};

module.exports = router;
