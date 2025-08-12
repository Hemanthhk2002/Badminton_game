const MatchSchedule = ({ teams, matches, onGenerateMatches }) => {
    const canGenerateMatches = teams.length >= 2;

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">📅</span>
                Match Schedule
            </h2>

            <button
                onClick={onGenerateMatches}
                disabled={!canGenerateMatches}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all mb-6 ${
                    canGenerateMatches
                        ? 'bg-orange-600 text-white hover:bg-orange-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
                🏆 Generate Match Schedule
            </button>

            {matches.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Tournament Matches ({matches.length})
                    </h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {matches.map((match, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200 animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="text-lg font-bold text-gray-800">
                                        Match {index + 1}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        🏸
                                    </div>
                                </div>
                                <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2">
                                    <div className="flex-1 text-center">
                                        <div className="font-bold text-blue-800 bg-blue-100 rounded-lg p-2">
                                            Team {String.fromCharCode(65 + match.team1Index)}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            {match.team1.join(' & ')}
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-600 my-2 sm:my-0">
                                        vs
                                    </div>
                                    <div className="flex-1 text-center">
                                        <div className="font-bold text-blue-800 bg-blue-100 rounded-lg p-2">
                                            Team {String.fromCharCode(65 + match.team2Index)}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            {match.team2.join(' & ')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MatchSchedule;