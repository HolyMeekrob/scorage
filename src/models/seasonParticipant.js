export default (getDataStore) => {
	const addTeamToSeason = (teamId, seasonId) => {
		return getDataStore().seasonParticipant.addTeamToSeason(teamId, seasonId);
	};

	const removeTeamFromSeason = (teamId, seasonId) => {
		return getDataStore().seasonParticipant
			.removeTeamFromSeason(teamId, seasonId);
	};

	return Object.freeze({
		addTeamToSeason,
		removeTeamFromSeason
	});
};
