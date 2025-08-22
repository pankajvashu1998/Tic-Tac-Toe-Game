"use client";
import "animate.css";
import { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
import { GrCaretPrevious } from "react-icons/gr";
import { GrPowerReset } from "react-icons/gr";
import confetti from "canvas-confetti";
import { IoSettingsOutline } from "react-icons/io5";
import HomeScreen from "./HomeScreen";
import WinModal from "./WinModal";
import Setting from "./Setting";
import WinLine from "./WinLine";

export default function TicTacToeGame() {
  // Sound effects

  const clickAudioRef = useRef(null);
  const winAudioRef = useRef(null);
  const loseAudioRef = useRef(null);
  const gameOverAudioRef = useRef(null);
  const [speaker, setSpeaker] = useState(true);
  const [onSpeaker, setOnSpeaker] = useState(false);

  const playClickAudio = () => {
    if(!onSpeaker)
    clickAudioRef.current.play();
  };

  const playWinAudio = () => {
     if(!onSpeaker)
    winAudioRef.current.play();
  };

  const playLoseAudio = () => {
     if(!onSpeaker)
    loseAudioRef.current.play();
  };

  const playGameOverAudio = () => {
     if(!onSpeaker)
    gameOverAudioRef.current.play();
  };

  // Main game states
  const [gameMode, setGameMode] = useState(null); // null, 'computer', 'user'
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [difficulty, setDifficulty] = useState("medium");

  console.log(showDifficultyModal);
  
  // Game board states
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);

  const fireConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 50,
      decay: 0.9,
      startVelocity: 50,
    });
  };

  // Check for winner
  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      setTimeout(() => {
        setShowWinModal(true);
      }, 2000);
    } else if (board.every((cell) => cell !== null)) {
      setTimeout(() => {
        setIsDraw(true);
        playGameOverAudio();
        setShowWinModal(true);
      }, 1000);
    }
  }, [board]);

  // Open modal with winning & lose & draw sound
  setTimeout(() => {
    if (winner === "X") {
      fireConfetti();
      playWinAudio();
    } else if (winner === "O" && gameMode === "computer") {
      playLoseAudio();
    } else if (winner === "O") {
      fireConfetti();
      playWinAudio();
    }
  }, 2000);

  // Computer move
  useEffect(() => {
    if (gameMode === "computer" && !isXNext && !winner && !isDraw) {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, gameMode, winner, isDraw]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  const makeComputerMove = () => {
    const availableMoves = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((val) => val !== null);
    if (availableMoves.length === 0) return;

    let move;

    if (difficulty === "easy") {
      move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    } else if (difficulty === "medium") {
      if (Math.random() < 0.7) {
        move =
          getBestMove(board, "O") ||
          availableMoves[Math.floor(Math.random() * availableMoves.length)];
      } else {
        move =
          availableMoves[Math.floor(Math.random() * availableMoves.length)];
      }
    } else {
      move = getBestMove(board, "O") || availableMoves[0];
    }

    const newBoard = [...board];
    newBoard[move] = "O";
    setBoard(newBoard);
    setIsXNext(true);
    playClickAudio();
  };

  const getBestMove = (currentBoard, player) => {
    // Check if computer can win
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const testBoard = [...currentBoard];
        testBoard[i] = player;
        if (calculateWinner(testBoard)) return i;
      }
    }

    // Check if computer needs to block player
    const opponent = player === "X" ? "O" : "X";
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const testBoard = [...currentBoard];
        testBoard[i] = opponent;
        if (calculateWinner(testBoard)) return i;
      }
    }

    // Take center if available
    if (currentBoard[4] === null) return 4;

    // Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter((i) => currentBoard[i] === null);
    if (availableCorners.length > 0) {
      return availableCorners[
        Math.floor(Math.random() * availableCorners.length)
      ];
    }

    // Take any available spot
    const availableMoves = currentBoard
      .map((cell, index) => (cell === null ? index : null))
      .filter((val) => val !== null);
    return availableMoves[0];
  };

  const handleCellClick = (index) => {
    playClickAudio();
    if (board[index] || winner || isDraw) return;
    if (gameMode === "computer" && !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
    setIsDraw(false);
    setShowWinModal(false);
  };

  const backToMenu = () => {
    setGameMode(null);
    resetGame();
  };

  const handleUserVsComputer = () => {
    setShowDifficultyModal(true);
  };

  const handleUserVsUser = () => {
    setGameMode("user");
  };

  const handleDifficultyConfirm = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setGameMode("computer");
    setShowDifficultyModal(false);
  };

  //----------------------------------Static winning line------------------------------
  let [winLine, setWinLine] = useState(0);
  useEffect(() => {
    let winLineStop = setTimeout(() => {
      setWinLine(winLine + 1);
    }, 5);

    if (winLine === 108) {
      clearTimeout(winLineStop);
    }
  });

  // Landing Page

  if (!gameMode) {
    return (
      <>
        <HomeScreen
          props={{
            winLine,
            handleUserVsComputer,
            handleUserVsUser,
            showDifficultyModal,
            setShowDifficultyModal,
            setDifficulty,
            difficulty,
            handleDifficultyConfirm,
          }}
        />
      </>
    );
  }

  // Game Board
  return (
    <div className=" bubbleBackground    relative overflow-hidden ">
      <div className="bg-indigo-900/90 p-4 min-h-screen    flex justify-center items-center">
       
        <div className="w-sm m-auto p-4 rounded-xl z-10  relative border border-white/40 bg-indigo-900">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 ">
            <button
              onClick={backToMenu}
              className="cursor-pointer absolute text-4xl rounded-full left-0 top-0 p-3 text-purple-500  font-extrabold"
            >
              <GrCaretPrevious />
            </button>

            <button
              onClick={() => setSpeaker(false)}
              className="cursor-pointer absolute text-4xl rounded-full right-0 top-0 p-3 text-purple-500  font-extrabold "
            >
              <IoSettingsOutline />
            </button>
          </div>

          {/* Game Status */}

          {/* Computer mode----------- */}
          {gameMode === "computer" ? (
            <div className="text-center mb-6 flex justify-center items-center gap-2">
              <div
                className={`flex justify-between items-center flex-col gap-1 ${
                  isXNext ? "opacity-100 " : "opacity-15"
                }`}
              >
                {/* <IoClose className={`h-10 w-10 text-white ${isXNext && 'bounce2x'}`} /> */}
                <img
                  src="user.png"
                  alt=""
                  className={`h-6 w-6 text-white ${isXNext && "bounce2x"}`}
                />
                <span className="text-[11px]   text-blue-400 font-semibold">
                  PLAYER
                </span>
              </div>
              <span className="text-blue-400 font-bold mb-5">VS</span>
              <div
                className={`flex justify-between items-center flex-col  ${
                  isXNext ? "opacity-15" : "opacity-100 "
                }`}
              >
                <img
                  src="Meta-ai-logo (1).png"
                  className={`h-8 w-8 ml-2  rounded-full ${
                    isXNext ? "" : "bounce2x"
                  }`}
                />
                <span className="text-[12px] ml-2 text-blue-400 font-semibold">
                  AI
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center mb-6 flex justify-center items-center gap-2">
              <div
                className={`flex justify-between items-center flex-col gap-1 ${
                  isXNext ? "opacity-100 " : "opacity-15"
                }`}
              >
                <IoClose
                  className={`h-10 w-10 text-white ${isXNext && "bounce2x"}`}
                />
                <span className="text-[11px] relative bottom-1 text-blue-400 font-semibold">
                  PLAYER 1
                </span>
              </div>
              <span className="text-blue-400 font-bold mb-5">VS</span>
              <div
                className={`flex justify-between items-center flex-col gap-1 ${
                  isXNext ? "opacity-15" : "opacity-100 "
                }`}
              >
                <FaRegCircle
                  className={`h-8 w-8 ml-2  rounded-full borderShadow text-pink-500 ${
                    isXNext ? "" : "bounce2x"
                  }`}
                />
                <span className="text-[12px] ml-2 text-blue-400 font-semibold">
                  PLAYER 2
                </span>
              </div>
            </div>
          )}

          {/* Game Board */}
          <div className="  shadow-2xl shadow-white/40 mx-auto  md:max-w-[350px]  bg-gradient-to-br from-purple-900 via-indigo-900 to-black relative animate__animated animate__bounceIn circleShadow overflow-hidden">
            <div className="grid grid-cols-3  relative border-2 rounded  border-white/40 circleShadow ">
              {/* Sound effects------ */}
              <audio ref={clickAudioRef} src="click.mp3" />
              <audio ref={winAudioRef} src="win.mp3" />
              <audio ref={loseAudioRef} src="lose.mp3" />
              <audio ref={gameOverAudioRef} src="gameOver.mp3" />

              {winningLine && (
                <WinLine props={{winningLine}}/>
              )}
             
              {board.map((cell, index) => (
                <button
                  key={index}
                  onClick={() => handleCellClick(index)}
                  className={`aspect-square bg-transparent  border-2 border-white/10 flex items-center justify-center text-4xl font-bold transition-all cursor-pointer ${
                    winningLine && winningLine.includes(index)
                      ? "bg-green-100 border-green-300"
                      : ""
                  }`}
                  disabled={cell !== null || winner || isDraw}
                >
                  <span>
                    {cell === "X" ? (
                      <IoClose className="h-14 w-14  animate__animated animate__bounceIn text-white" />
                    ) : (
                      ""
                    )}
                    {cell === "O" ? (
                      <FaRegCircle className="h-10 w-10  bg-blue-500/30 rounded-full borderShadow animate__animated animate__bounceIn text-pink-500" />
                    ) : (
                      ""
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="w-full flex justify-center items-center pt-5">
            <button
              onClick={resetGame}
              className="px-6 py-2 border-2 border-blue-400 rounded-sm"
            >
              <GrPowerReset className="text-2xl font-bold text-white cursor-pointer" />
            </button>
          </div>

          <WinModal props={{showWinModal, gameMode, isDraw, winner, resetGame, backToMenu}}/>

          <div
            className={`w-full p-6 h-screen bg-black/60 fixed top-0 left-0 flex justify-center items-center ${
              speaker == true ? "hidden" : "block"
            }`}
            >
            <Setting props={{setSpeaker,setOnSpeaker,onSpeaker}}/>
          </div>
        </div>
      </div>
    </div>
  );
}
