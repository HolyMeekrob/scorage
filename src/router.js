import playerController from './controllers/playerController';
import teamController from './controllers/teamController';
import leagueController from './controllers/leagueController';

const router = (app) => {
	const register = (controller) => {
		app.use(controller.routes());
		app.use(controller.allowedMethods());
	};

	const registerRoutes = () => {
		register(playerController);
		register(teamController);
		register(leagueController);
	};

	return Object.freeze({
		registerRoutes
	});
};

export default router;
