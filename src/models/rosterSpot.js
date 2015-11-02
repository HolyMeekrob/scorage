
export default (getDataStore) => {
	const addPlayerToTeam = (playerId, teamId) => {
		return getDataStore().rosterSpot.addPlayerToTeam(playerId, teamId);
	};

	const removePlayerFromTeam = (playerId, teamId) => {
		return getDataStore().rosterSpot.removePlayerFromTeam(playerId, teamId);
	};

	return Object.freeze({
		addPlayerToTeam,
		removePlayerFromTeam
	});
};
