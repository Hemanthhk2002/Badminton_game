const TeamGenerator = ({ selectedPlayers, players, onTeamsGenerated, teams, isShuffling }) => {
    const selectedPlayerNames = selectedPlayers.map(id => 
        players.find(p => p.id === id)?.name
    ).filter(Boolean);

    const canGenerateTeams = selectedPlayers.length >= 4 && selectedPlayers.length % 2 === 0;

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🏸</span>
                Team Generator
            </h2>

            {selectedPlayers.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                        Selected Players ({selectedPlayers.length})
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {selectedPlayerNames.map((name, index) => (
                            <span
                                key={index}
                                className={`px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium ${
                                    isShuffling ? 'animate-shuffle' : ''
                                }`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {name}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {!canGenerateTeams && selectedPlayers.length > 0 && (
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                        ⚠️ Please select an even number of players (minimum 4) to form teams.
                    </p>
                </div>
            )}

            <button
                onClick={onTeamsGenerated}
                disabled={!canGenerateTeams || isShuffling}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                    canGenerateTeams && !isShuffling
                        ? 'bg-green-600 text-white hover:bg-green-700 animate-pulse-glow'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
                {isShuffling ? (
                    <span className="flex items-center justify-center">
                        <span className="animate-spin mr-2">🔄</span>
                        Shuffling Teams...
                    </span>
                ) : (
                    '🎲 Shuffle Teams'
                )}
            </button>

            {teams.length > 0 && !isShuffling && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                        Generated Teams ({teams.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {teams.map((team, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-200 animate-bounce-in"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <h4 className="font-bold text-purple-800 mb-2">
                                    Team {String.fromCharCode(65 + index)}
                                </h4>
                                <div className="space-y-1">
                                    {team.map((player, playerIndex) => (
                                        <div key={playerIndex} className="text-purple-700 font-medium">
                                            {player}
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