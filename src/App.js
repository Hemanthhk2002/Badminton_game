
import './App.css';
import { useState } from 'react';
import PlayerList from './components/PlayerList';
import TeamGenerator from './components/TeamGenerator';
import MatchSchedule from './components/MatchSchedule';

function App() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);

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
    
    setTimeout(() => {
      const selectedPlayerNames = selectedPlayers.map(id => 
        players.find(p => p.id === id)?.name
      ).filter(Boolean);
      
      const shuffledPlayers = shuffleArray(selectedPlayerNames);
      const newTeams = [];
      
      for (let i = 0; i < shuffledPlayers.length; i += 2) {
        newTeams.push([shuffledPlayers[i], shuffledPlayers[i + 1]]);
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
          team2Index: j
        });
      }
    }
    
    const shuffledMatches = shuffleArray(newMatches);
    setMatches(shuffledMatches);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          🏸 Badminton Tournament Manager
        </h1>
        <p className="text-gray-600">
          Organize players, create teams, and generate match schedules
        </p>
      </div>

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

      <MatchSchedule
        teams={teams}
        matches={matches}
        onGenerateMatches={generateMatches}
      />
    </div>
  );
}

export default App;
