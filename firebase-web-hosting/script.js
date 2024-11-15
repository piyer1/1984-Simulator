import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { AlertCircle, Eye, FileEdit, MessageSquare } from 'lucide-react';

// Game Constants
const SUSPICION_THRESHOLD = 75;
const METER_MAX = 100;
const METER_MIN = 0;

// Main Game Component
const Game1984 = () => {
  // Game State
  const [gameState, setGameState] = useState({
    playerRole: '',
    loyaltyMeter: 50,
    rebellionMeter: 0,
    survivalMeter: 100,
    suspicionLevel: 0,
    collectedDocuments: [],
    money: 100,
    gameStatus: 'character-creation'
  });

  // Character Creation Screen
  const CharacterCreation = () => {
    const roles = ['Editor', 'Surveillance Officer', 'Propaganda Developer'];
    
    const selectRole = () => {
      // No matter what they choose, they get randomly assigned
      const assignedRole = roles[Math.floor(Math.random() * roles.length)];
      setGameState(prev => ({
        ...prev,
        playerRole: assignedRole,
        gameStatus: 'active'
      }));
    };

    return (
      <div className="flex flex-col items-center space-y-4 p-6 bg-gray-900 text-gray-200">
        <h2 className="text-xl font-bold mb-4">Choose Your Role</h2>
        <div className="grid grid-cols-1 gap-4 w-full max-w-md">
          {roles.map(role => (
            <button
              key={role}
              onClick={selectRole}
              className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center space-x-3"
            >
              {role === 'Editor' && <FileEdit />}
              {role === 'Surveillance Officer' && <Eye />}
              {role === 'Propaganda Developer' && <MessageSquare />}
              <span>{role}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Main Game Interface
  const GameInterface = () => {
    const [currentTask, setCurrentTask] = useState(null);
    const [telescreenAlert, setTelescreenAlert] = useState(false);

    // Random Telescreen Check
    useEffect(() => {
      const telescreenInterval = setInterval(() => {
        const shouldCheck = Math.random() < 0.2; // 20% chance every interval
        if (shouldCheck) {
          setTelescreenAlert(true);
          setTimeout(() => setTelescreenAlert(false), 5000);
        }
      }, 30000);

      return () => clearInterval(telescreenInterval);
    }, []);

    // Task Handler
    const handleTask = (taskType) => {
      const loyaltyChange = Math.random() > 0.5 ? 5 : -5;
      const suspicionChange = Math.random() * 10;

      setGameState(prev => ({
        ...prev,
        loyaltyMeter: Math.max(METER_MIN, Math.min(METER_MAX, prev.loyaltyMeter + loyaltyChange)),
        suspicionLevel: Math.max(METER_MIN, Math.min(METER_MAX, prev.suspicionLevel + suspicionChange))
      }));

      // Check for raid trigger
      if (gameState.suspicionLevel >= SUSPICION_THRESHOLD) {
        triggerRaid();
      }
    };

    const triggerRaid = () => {
      setGameState(prev => ({
        ...prev,
        gameStatus: 'raid',
        survivalMeter: Math.max(METER_MIN, prev.survivalMeter - 30)
      }));
    };

    return (
      <div className="flex flex-col h-full bg-gray-900 text-gray-200">
        {/* Status Bars */}
        <div className="grid grid-cols-4 gap-4 p-4">
          <StatusMeter label="Loyalty" value={gameState.loyaltyMeter} color="blue" />
          <StatusMeter label="Rebellion" value={gameState.rebellionMeter} color="red" />
          <StatusMeter label="Survival" value={gameState.survivalMeter} color="green" />
          <StatusMeter label="Suspicion" value={gameState.suspicionLevel} color="yellow" />
        </div>

        {/* Telescreen Alert */}
        {telescreenAlert && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        bg-red-900 p-6 rounded-lg shadow-lg flex items-center space-x-3">
            <AlertCircle className="text-red-500" />
            <span className="text-xl">BIG BROTHER IS WATCHING</span>
          </div>
        )}

        {/* Work Area */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-3 gap-4">
            <TaskButton 
              label="Edit History" 
              icon={<FileEdit />}
              onClick={() => handleTask('edit')} 
            />
            <TaskButton 
              label="Conduct Surveillance" 
              icon={<Eye />}
              onClick={() => handleTask('surveillance')} 
            />
            <TaskButton 
              label="Create Propaganda" 
              icon={<MessageSquare />}
              onClick={() => handleTask('propaganda')} 
            />
          </div>
        </div>
      </div>
    );
  };

  // Utility Components
  const StatusMeter = ({ label, value, color }) => (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="text-sm mb-2">{label}</div>
      <div className="h-2 bg-gray-700 rounded-full">
        <div 
          className={`h-full bg-${color}-500 rounded-full transition-all duration-300`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  const TaskButton = ({ label, icon, onClick }) => (
    <button
      onClick={onClick}
      className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg flex flex-col items-center space-y-2"
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  // Main Render
  return (
    <div className="h-screen bg-gray-900">
      {gameState.gameStatus === 'character-creation' && <CharacterCreation />}
      {gameState.gameStatus === 'active' && <GameInterface />}
      {gameState.gameStatus === 'raid' && (
        <div className="fixed inset-0 bg-red-900/80 flex items-center justify-center">
          <Card className="p-6 bg-gray-800 text-gray-200">
            <h2 className="text-2xl mb-4">RAID IN PROGRESS</h2>
            <p>The Thought Police have been notified of your suspicious activities...</p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Game1984;