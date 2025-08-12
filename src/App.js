import './App.css';
import { useState } from 'react';
import PlayerList from './components/PlayerList';
import TeamGenerator from './components/TeamGenerator';
import MatchSchedule from './components/MatchSchedule';
import DeveloperCredit from './components/DeveloperCredit';

function App() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [winners, setWinners] = useState({});

  const addPlayer = (name) => {
    const newPlayer = {
      id: Date.now() + Math.random(),
      name: name
    };
    setPlayers(prev => [...prev, newPlayer]);
  };

  const removePlayer = (id) => {
    setPlayers(prev => prev.filter(p => p.id !== id));
    setSelectedPlayers(prev => prev.filter(playerId => playerId !== id));
  };

  const togglePlayer = (id) => {
    setSelectedPlayers(prev => 
      prev.includes(id) 
        ? prev.filter(playerId => playerId !== id)
        : [...prev, id]
    );
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const generateTeams = () => {
    setIsShuffling(true);
    setMatches([]);
    setWinners({});
    
    setTimeout(() => {
      const selectedPlayerNames = selectedPlayers.map(id => 
        players.find(p => p.id === id)?.name
      ).filter(Boolean);
      
      const shuffledPlayers = shuffleArray(selectedPlayerNames);
      const newTeams = [];
      
      for (let i = 0; i < shuffledPlayers.length; i += 2) {
        if (shuffledPlayers[i + 1]) {
          newTeams.push([shuffledPlayers[i], shuffledPlayers[i + 1]]);
        }
      }
      
      setTeams(newTeams);
      setIsShuffling(false);
    }, 1500);
  };

  const generateMatches = () => {
    const newMatches = [];
    
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        newMatches.push({
          team1: teams[i],
          team2: teams[j],
          team1Index: i,
          team2Index: j,
          winner: null
        });
      }
    }
    
    const shuffledMatches = shuffleArray(newMatches);
    setMatches(shuffledMatches);
    setWinners({});
  };

  const setMatchWinner = (matchIndex, team) => {
    setWinners(prev => ({
      ...prev,
      [matchIndex]: team
    }));
    
    // Update the matches with the winner
    setMatches(prev => 
      prev.map((match, idx) => 
        idx === matchIndex ? { ...match, winner: team } : match
      )
    );
  };

  // Calculate tournament standings
  const getTournamentStandings = () => {
    const teamScores = {};
    
    matches.forEach(match => {
      if (match.winner === 'team1') {
        const teamKey = `Team ${String.fromCharCode(65 + match.team1Index)}`;
        teamScores[teamKey] = (teamScores[teamKey] || 0) + 1;
      } else if (match.winner === 'team2') {
        const teamKey = `Team ${String.fromCharCode(65 + match.team2Index)}`;
        teamScores[teamKey] = (teamScores[teamKey] || 0) + 1;
      }
    });
    
    return Object.entries(teamScores)
      .sort((a, b) => b[1] - a[1])
      .map(([team, score]) => ({
        team,
        score,
        players: team === 'Team A' ? teams[0] : 
                team === 'Team B' ? (teams[1] || []) :
                team === 'Team C' ? (teams[2] || []) :
                teams[3] || []
      }));
  };

  const standings = getTournamentStandings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
            🏸 Badminton
          </h1>
          <p className="text-lg text-gray-600">
            Organize players, create teams, and track match results
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <PlayerList
              players={players}
              onAddPlayer={addPlayer}
              onRemovePlayer={removePlayer}
              selectedPlayers={selectedPlayers}
              onTogglePlayer={togglePlayer}
            />

            <TeamGenerator
              selectedPlayers={selectedPlayers}
              players={players}
              onTeamsGenerated={generateTeams}
              teams={teams}
              isShuffling={isShuffling}
            />
          </div>

          <div className="space-y-6">
            <MatchSchedule
              teams={teams}
              matches={matches}
              onGenerateMatches={generateMatches}
              onSetWinner={setMatchWinner}
            />

            {standings.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">🏅</span>
                  Tournament Standings
                </h2>
                <div className="space-y-3">
                  {standings.map((standing, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200"
                    >
                      <div className="flex items-center">
                        <span className="text-yellow-600 font-bold text-lg w-6">
                          {index + 1}.
                        </span>
                        <div className="ml-3">
                          <div className="font-bold text-gray-800">
                            {standing.team}
                          </div>
                          <div className="text-sm text-gray-600">
                            {standing.players.join(' & ')}
                          </div>
                        </div>
                      </div>
                      <div className="bg-yellow-100 text-yellow-800 font-bold px-3 py-1 rounded-full">
                        {standing.score} {standing.score === 1 ? 'win' : 'wins'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <DeveloperCredit />
    </div>
  );
}

export default App;