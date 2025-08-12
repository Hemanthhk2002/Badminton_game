import { useState } from 'react';

const PlayerList = ({ players, onAddPlayer, onRemovePlayer, selectedPlayers, onTogglePlayer }) => {
  const [newPlayerName, setNewPlayerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPlayerName.trim()) {
      onAddPlayer(newPlayerName.trim());
      setNewPlayerName('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <span className="mr-2">👥</span>
        Players
      </h2>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Enter player name"
            className="flex-1 px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          />
          <button 
            type="submit" 
            className="px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-200 text-sm sm:text-base whitespace-nowrap"
          >
            Add Player
          </button>
        </div>
      </form>

      {players.length > 0 ? (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {players.map((player) => (
            <div
              key={player.id}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                selectedPlayers.includes(player.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:bg-gray-50'
              } transition-colors`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedPlayers.includes(player.id)}
                  onChange={() => onTogglePlayer(player.id)}
                  className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-3"
                />
                <span className="text-gray-800">{player.name}</span>
              </div>
              <button
                onClick={() => onRemovePlayer(player.id)}
                className="text-red-500 hover:text-red-700"
                aria-label={`Remove ${player.name}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <p>No players added yet. Add some players to get started!</p>
        </div>
      )}
    </div>
  );
};

export default PlayerList;