const TeamGenerator = ({ selectedPlayers, players, onTeamsGenerated, teams, isShuffling }) => {
    const selectedPlayerNames = selectedPlayers.map(id => 
        players.find(p => p.id === id)?.name
    ).filter(Boolean);

    const canGenerateTeams = selectedPlayers.length >= 4 && selectedPlayers.length % 2 === 0;

    return (
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl shadow-lg p-4 sm:p-6 border-2 border-blue-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
                <span className="mr-2 text-2xl">🏸</span>
                Team Generator
            </h2>
            <div className="flex items-center bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium px-3 py-1.5 sm:py-1 rounded-full whitespace-nowrap">
                <span className="mr-1.5">👥</span>
                {selectedPlayers.length} {selectedPlayers.length === 1 ? 'player' : 'players'} selected
            </div>
        </div>

            {selectedPlayers.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
                        Selected Players
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {selectedPlayerNames.map((name, index) => (
                            <span
                                key={index}
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                    isShuffling 
                                        ? 'animate-bounce' 
                                        : 'bg-white shadow-sm'
                                }`}
                                style={{
                                    animationDelay: isShuffling ? `${index * 0.1}s` : '0s',
                                    backgroundColor: isShuffling 
                                        ? `hsl(${index * 30}, 80%, 90%)` 
                                        : 'white',
                                    border: '1px solid #e5e7eb'
                                }}
                            >
                                <span className="mr-1">👤</span>
                                {name}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {!canGenerateTeams && selectedPlayers.length > 0 && (
                <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                                {selectedPlayers.length < 4 
                                    ? 'You need at least 4 players to form teams.'
                                    : 'Please select an even number of players to form balanced teams.'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={onTeamsGenerated}
                disabled={!canGenerateTeams || isShuffling}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-[1.02] ${
                    canGenerateTeams && !isShuffling
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg hover:shadow-xl hover:from-green-600 hover:to-blue-600'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
            >
                {isShuffling ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Shuffling Teams...
                    </span>
                ) : (
                    <span className="flex items-center justify-center">
                        <span className="mr-2">🎲</span>
                        Generate Teams
                    </span>
                )}
            </button>

            {teams.length > 0 && !isShuffling && (
                <div className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Generated Teams
                        </h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            {teams.length} {teams.length === 1 ? 'Team' : 'Teams'}
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {teams.map((team, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 rounded-xl border-2 border-blue-100 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mr-3">
                                        {String.fromCharCode(65 + index)}
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-800">
                                        Team {String.fromCharCode(65 + index)}
                                    </h4>
                                </div>
                                <div className="space-y-2">
                                    {team.map((player, playerIndex) => (
                                        <div 
                                            key={playerIndex}
                                            className="flex items-center p-2 bg-gray-50 rounded-lg"
                                        >
                                            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium mr-3">
                                                {playerIndex + 1}
                                            </span>
                                            <span className="text-gray-700">{player}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamGenerator;
