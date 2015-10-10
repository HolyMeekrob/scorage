import playerController from './controllers/playerController';
import teamController from './controllers/teamController';
import leagueController from './controllers/leagueController';
import seasonController from './controllers/seasonController';
import locationController from './controllers/locationController';
import gameController from './controllers/gameController';

const router = (app) => {
	const register = (controller) => {
		app.use(controller.routes());
		app.use(controller.allowedMethods());
	};

	const registerRoutes = () => {
		register(playerController);
		register(teamController);
		register(leagueController);
		register(seasonController);
		register(locationController);
		register(gameController);
	};

	return Object.freeze({
		registerRoutes
	});
};

export default router;
