"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import HubSpotModal from './HubSpotModal';
import { Button } from "./ui";

// Game data structures
interface GameState {
  board: (string | null)[];
  isPlayerTurn: boolean;
  gameStatus: 'playing' | 'won' | 'lost' | 'tie';
  message: string;
}

// Tic Tac Toe Game Component
const AutomationTicTacToe = ({ 
  setIsPartnerModalOpen,
  onNavigateToNext 
}: { 
  setIsPartnerModalOpen: (open: boolean) => void;
  onNavigateToNext: () => void;
}) => {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    isPlayerTurn: true,
    gameStatus: 'playing',
    message: 'Your turn! Pick your automation tool 🎯'
  });

  // Player symbols (automation tools)
  const playerSymbols = ['⚡', '🤖', '🔧'];
  const computerSymbols = ['👤', '📝', '🐌'];

  const gameMessages = {
    playerWin: [
      "🎉 Automation wins! Just like in real life!",
      "💪 Automation dominates again!",
      "⚡ Speed and reliability triumph!",
      "🚀 This is why Fortune 500 companies choose automation!"
    ],
    computerWin: [
      "😅 Manual testing got lucky this time!",
      "🤔 Even experts lose sometimes - but automation usually wins!",
      "🎯 Good game! In real projects, automation wins 99% of the time"
    ],
    tie: [
      "🤝 A tie! In real life, automation always wins on speed",
      "⚖️ Balanced game! Though automation saves 900+ minutes daily"
    ],
    playing: [
      "🎯 Your turn! Choose your automation weapon",
      "⚡ Pick the perfect tool for the job",
      "🤖 Show manual testing who's boss!",
      "🔧 Build your automation strategy"
    ]
  };

  const checkWinner = (board: (string | null)[]): 'player' | 'computer' | null => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[b] && board[c]) {
        // Check if all three are player symbols
        const isPlayerLine = playerSymbols.includes(board[a] as string) && 
                           playerSymbols.includes(board[b] as string) && 
                           playerSymbols.includes(board[c] as string);
        if (isPlayerLine) return 'player';
        
        // Check if all three are computer symbols
        const isComputerLine = computerSymbols.includes(board[a] as string) && 
                              computerSymbols.includes(board[b] as string) && 
                              computerSymbols.includes(board[c] as string);
        if (isComputerLine) return 'computer';
      }
    }
    return null;
  };

  const handleCellClick = (index: number) => {
    if (gameState.board[index] || !gameState.isPlayerTurn || gameState.gameStatus !== 'playing') return;

    const newBoard = [...gameState.board];
    const randomPlayerSymbol = playerSymbols[Math.floor(Math.random() * playerSymbols.length)];
    newBoard[index] = randomPlayerSymbol;
    
    // Check win condition
    const winner = checkWinner(newBoard);
    if (winner === 'player') {
      setGameState({
        ...gameState,
        board: newBoard,
        gameStatus: 'won',
        message: gameMessages.playerWin[Math.floor(Math.random() * gameMessages.playerWin.length)]
      });
      return;
    }
    
    if (newBoard.every(cell => cell !== null)) {
      setGameState({
        ...gameState,
        board: newBoard,
        gameStatus: 'tie',
        message: gameMessages.tie[Math.floor(Math.random() * gameMessages.tie.length)]
      });
      return;
    }

    setGameState({
      ...gameState,
      board: newBoard,
      isPlayerTurn: false,
      message: "🤖 Computer's turn..."
    });
    
    // Computer move after delay
    setTimeout(() => makeComputerMove(newBoard), 1000);
  };

  const makeComputerMove = (currentBoard: (string | null)[]) => {
    const emptyCells = currentBoard.map((cell, index) => cell === null ? index : null).filter(val => val !== null);
    if (emptyCells.length === 0) return;

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const randomComputerSymbol = computerSymbols[Math.floor(Math.random() * computerSymbols.length)];
    
    const newBoard = [...currentBoard];
    newBoard[randomIndex] = randomComputerSymbol;

    const winner = checkWinner(newBoard);
    if (winner === 'computer') {
      setGameState({
        ...gameState,
        board: newBoard,
        gameStatus: 'lost',
        message: gameMessages.computerWin[Math.floor(Math.random() * gameMessages.computerWin.length)]
      });
    } else if (newBoard.every(cell => cell !== null)) {
      setGameState({
        ...gameState,
        board: newBoard,
        gameStatus: 'tie',
        message: gameMessages.tie[Math.floor(Math.random() * gameMessages.tie.length)]
      });
    } else {
      setGameState({
        ...gameState,
        board: newBoard,
        isPlayerTurn: true,
        message: gameMessages.playing[Math.floor(Math.random() * gameMessages.playing.length)]
      });
    }
  };

  const resetGame = () => {
    setGameState({
      board: Array(9).fill(null),
      isPlayerTurn: true,
      gameStatus: 'playing',
      message: gameMessages.playing[Math.floor(Math.random() * gameMessages.playing.length)]
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen text-white px-4 py-8"
    >
      <motion.h2 
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Automation Tic Tac Toe
      </motion.h2>
      
      {/* Fixed 3x3 Game Board */}
      <motion.div 
        className="w-full max-w-[360px] mx-auto mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {/* Tic Tac Toe Grid with visible borders */}
        <div className="bg-white/25 p-6 rounded-3xl backdrop-blur-lg border border-white/40 shadow-2xl">
          <div className="grid grid-cols-3 gap-3">
            {gameState.board.map((cell, index) => (
              <motion.button
                key={index}
                className={`
                  w-full h-24 md:h-28 lg:h-32
                  bg-white/15 backdrop-blur-sm
                  border-2 border-white/40
                  rounded-xl
                  flex items-center justify-center
                  text-4xl md:text-5xl lg:text-6xl
                  font-bold
                  transition-all duration-200
                  shadow-lg
                  ${cell 
                    ? 'cursor-not-allowed bg-white/30 border-white/60 shadow-inner' 
                    : 'hover:bg-white/25 hover:border-cyan-400/70 hover:scale-105 cursor-pointer hover:shadow-xl'
                  }
                `}
                onClick={() => handleCellClick(index)}
                disabled={!!cell || gameState.gameStatus !== 'playing'}
                whileHover={!cell ? { scale: 1.05 } : {}}
                whileTap={!cell ? { scale: 0.95 } : {}}
              >
                {cell && (
                  <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20,
                      duration: 0.4 
                    }}
                    className="select-none drop-shadow-lg"
                  >
                    {cell}
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Game Message */}
      <motion.div 
        className="text-lg md:text-xl lg:text-2xl text-center mb-8 min-h-[4rem] flex items-center justify-center max-w-2xl px-8 py-6 bg-white/20 backdrop-blur-lg rounded-2xl border border-white/40 shadow-2xl"
        key={gameState.message}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-white font-semibold drop-shadow-lg">
          {gameState.message}
        </span>
      </motion.div>
      
      {/* Game Actions */}
      {gameState.gameStatus !== 'playing' && (
        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-md mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="outline"
            size="lg"
            onClick={resetGame}
            data-testid="play-again-button"
            className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 min-w-[150px]"
          >
            Play Again
          </Button>
          <Button
            variant="gradient-primary"
            size="lg"
            onClick={() => setIsPartnerModalOpen(true)}
            data-testid="book-discovery-call-button"
            className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
          >
            Book Discovery Call
          </Button>
        </motion.div>
      )}
      
             {/* Navigation to Next Section */}
       <motion.div
         className="flex flex-col items-center gap-4"
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.5 }}
       >
         <p className="text-white/80 text-center text-lg font-medium drop-shadow-md">
           Discover more about my expertise and services
         </p>
         <Button
           variant="outline"
           size="md"
           onClick={onNavigateToNext}
           data-testid="explore-more-button"
           className="border-white/40 text-white hover:bg-white/15 hover:border-white/60 transition-all duration-300 shadow-lg hover:shadow-xl"
         >
           Explore More ↓
         </Button>
       </motion.div>
      
      {/* Game Legend */}
      <motion.div
        className="mt-8 text-center text-sm md:text-base text-white/90 px-6 py-4 bg-white/15 rounded-xl border border-white/30 backdrop-blur-md shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="font-medium drop-shadow-md">
          <span className="text-cyan-300">You:</span> Automation Tools (⚡🤖🔧) • <span className="text-pink-300">Computer:</span> Manual Testing (👤📝🐌)
        </p>
      </motion.div>
    </motion.div>
  );
};

// Floating particles component
const FloatingParticles = () => {
  // Fixed deterministic particle data to prevent hydration mismatch
  const particles = [
    { id: 1, left: '10%', animationDelay: '0s', animationDuration: '20s' },
    { id: 2, left: '20%', animationDelay: '2s', animationDuration: '25s' },
    { id: 3, left: '30%', animationDelay: '4s', animationDuration: '18s' },
    { id: 4, left: '40%', animationDelay: '6s', animationDuration: '22s' },
    { id: 5, left: '50%', animationDelay: '8s', animationDuration: '28s' },
    { id: 6, left: '60%', animationDelay: '10s', animationDuration: '16s' },
    { id: 7, left: '70%', animationDelay: '12s', animationDuration: '24s' },
    { id: 8, left: '80%', animationDelay: '14s', animationDuration: '26s' },
    { id: 9, left: '90%', animationDelay: '16s', animationDuration: '20s' },
    { id: 10, left: '15%', animationDelay: '18s', animationDuration: '23s' },
    { id: 11, left: '25%', animationDelay: '1s', animationDuration: '21s' },
    { id: 12, left: '35%', animationDelay: '3s', animationDuration: '19s' },
    { id: 13, left: '45%', animationDelay: '5s', animationDuration: '27s' },
    { id: 14, left: '55%', animationDelay: '7s', animationDuration: '17s' },
    { id: 15, left: '75%', animationDelay: '9s', animationDuration: '25s' },
  ];

  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-particle-float"
            style={{
              left: particle.left,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes particleFloat {
          0% { 
            transform: translateY(100vh) translateX(0px); 
            opacity: 0;
          }
          10% { 
            opacity: 1;
          }
          90% { 
            opacity: 1;
          }
          100% { 
            transform: translateY(-100px) translateX(30px); 
            opacity: 0;
          }
        }
        .animate-particle-float {
          animation: particleFloat linear infinite;
        }
      `}</style>
    </>
  );
};

// Bruno Simon inspired landing page
const LandingState = ({ onStartGame }: { onStartGame: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center min-h-screen text-white px-4"
    >
      <motion.h1 
        className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Nikolay Advolodkin
      </motion.h1>
      
      <motion.p 
        className="text-xl md:text-2xl lg:text-3xl text-center mb-12 text-white/80 max-w-4xl"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        My purpose is to elevate how people create technology
      </motion.p>
      
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <Button
          variant="gradient-primary"
          size="xl"
          onClick={onStartGame}
          className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 animate-pulse hover:animate-none text-xl px-12 py-6"
        >
          Start Game
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default function Hero() {
  const [gameStarted, setGameStarted] = useState(false);
  const [isCoursesModalOpen, setIsCoursesModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleNavigateToNext = () => {
    // Smooth scroll to the next section (About section)
    const aboutSection = document.getElementById('about') || document.querySelector('section:nth-of-type(2)');
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <FloatingParticles />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* HubSpot Modals */}
      <HubSpotModal
        isOpen={isCoursesModalOpen}
        onClose={() => setIsCoursesModalOpen(false)}
        title="Transform Your Testing Career"
        subtitle="Join thousands of professionals who've mastered automation testing with my comprehensive courses."
      />
      
      <HubSpotModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
        title="Partner with Nikolay"
        subtitle="Let's discuss how I can help transform your organization's testing strategy and accelerate your automation journey."
      />

      {/* Content */}
      <div className="relative z-10">
        {!gameStarted ? (
          <LandingState onStartGame={handleStartGame} />
        ) : (
          <AutomationTicTacToe 
            setIsPartnerModalOpen={setIsPartnerModalOpen}
            onNavigateToNext={handleNavigateToNext}
          />
        )}
      </div>
    </section>
  );
} 