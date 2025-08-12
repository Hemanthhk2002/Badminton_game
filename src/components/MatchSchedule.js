const MatchSchedule = ({ teams, matches, onGenerateMatches, onSetWinner }) => {
    const canGenerateMatches = teams.length >= 2;

    return (
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-lg p-6 border-2 border-green-100">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <span className="mr-2">🏆</span>
                    Tournament Matches
                </h2>
                <button
                    onClick={onGenerateMatches}
                    disabled={!canGenerateMatches}
                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                        canGenerateMatches
                            ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 shadow-md hover:shadow-lg'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    <span className="mr-2">🔄</span>
                    Generate Schedule
                </button>
            </div>

            {matches.length > 0 ? (
                <div className="space-y-4">
                    {matches.map((match, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-4 border-2 border-green-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="text-center text-sm text-gray-500 mb-2">
                                Match {index + 1}
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                {/* Team 1 */}
                                <div 
                                    className={`p-3 rounded-lg text-center transition-all ${
                                        match.winner === 'team1' 
                                            ? 'bg-green-50 border-2 border-green-300 transform scale-105'
                                            : 'bg-gray-50 border border-gray-200'
                                    }`}
                                >
                                    <div className="font-bold text-gray-800">
                                        Team {String.fromCharCode(65 + match.team1Index)}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {match.team1.join(' & ')}
                                    </div>
                                    <button
                                        onClick={() => onSetWinner(index, 'team1')}
                                        className={`mt-2 px-3 py-1 text-xs rounded-full ${
                                            match.winner === 'team1'
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        {match.winner === 'team1' ? 'Winner! 🏆' : 'Set Winner'}
                                    </button>
                                </div>

                                {/* VS */}
                                <div className="text-center">
                                    <div className="inline-block bg-gray-100 rounded-full p-2">
                                        <span className="text-xl font-bold text-gray-600">VS</span>
                                    </div>
                                </div>

                                {/* Team 2 */}
                                <div 
                                    className={`p-3 rounded-lg text-center transition-all ${
                                        match.winner === 'team2' 
                                            ? 'bg-green-50 border-2 border-green-300 transform scale-105'
                                            : 'bg-gray-50 border border-gray-200'
                                    }`}
                                >
                                    <div className="font-bold text-gray-800">
                                        Team {String.fromCharCode(65 + match.team2Index)}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {match.team2.join(' & ')}
                                    </div>
                                    <button
                                        onClick={() => onSetWinner(index, 'team2')}
                                        className={`mt-2 px-3 py-1 text-xs rounded-full ${
                                            match.winner === 'team2'
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        {match.winner === 'team2' ? 'Winner! 🏆' : 'Set Winner'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
                        <span className="text-4xl">🏸</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-700">No matches scheduled yet</h3>
                    <p className="text-gray-500 mt-1">
                        {canGenerateMatches 
                            ? 'Click "Generate Schedule" to create matchups!'
                            : 'You need at least 2 teams to generate matches.'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default MatchSchedule;
