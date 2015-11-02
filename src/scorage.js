import player from './models/player';
import team from './models/team';
import league from './models/league';
import season from './models/season';
import location from './models/location';
import game from './models/game';
import ruleset from './models/ruleset';
import play from './models/play';
import match from './models/match';

export default (() => {
	let store = undefined;

	const registerDataStore = (dataStore) => {
		store = dataStore;
	};

	const getDataStore = () => store;

	return Object.freeze({
		registerDataStore,
		player: player(getDataStore),
		team: team(getDataStore),
		league: league(getDataStore),
		season: season(getDataStore),
		location: location(getDataStore),
		game: game(getDataStore),
		ruleset: ruleset(getDataStore),
		play: play(getDataStore),
		match: match(getDataStore)
	});
})();
