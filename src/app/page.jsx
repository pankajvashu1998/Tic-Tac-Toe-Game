"use client";
import "animate.css";
import { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";

import { GrCaretPrevious } from "react-icons/gr";
import { GrPowerReset } from "react-icons/gr";
import { RiLoopLeftFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import confetti from "canvas-confetti";

export default function TicTacToeGame() {
  // Sound effects

  const clickAudioRef = useRef(null);
  const winAudioRef = useRef(null);
  const loseAudioRef = useRef(null);
  const gameOverAudioRef = useRef(null);

  const playClickAudio = () => {
    clickAudioRef.current.play();
  };

  const playWinAudio = () => {
    winAudioRef.current.play();
  };

  const playLoseAudio = () => {
    loseAudioRef.current.play();
  };

  const playGameOverAudio = () => {
    gameOverAudioRef.current.play();
  };

  // Main game states
  const [gameMode, setGameMode] = useState(null); // null, 'computer', 'user'
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [difficulty, setDifficulty] = useState("medium");

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
      <div className="min-h-screen  flex justify-center items-center  w-full bg-black relative overflow-hidden">
        {/* Middle - Game Image */}
        <div className="flex-1 flex items-center flex-col px-4 z-10  w-full">
          <div className=" rounded-xl shadow-2xl shadow-white/40 p-6 md:max-w-[350px]  bg-gradient-to-br from-purple-900 via-indigo-900 to-black relative border border-white/40 ">
            <div className="relative">
              <h1 className="text-center md:text-3xl text-2xl font-bold text-white">
                TIC TAC TOE
              </h1>
              <p className="text-sm text-center text-white pb-4 ">
                Think Ahead, Win Faster!
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3 relative ">
              {/* Background gradient container */}
              <div className="col-span-3 grid grid-cols-3 p-2 rounded shadow-lg relative circleShadow animate__animated animate__bounceIn">
                {/* Winning line overlay - choose one based on winning condition */}

                {/* Diagonal (top-left to bottom-right) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="absolute w-full  rounded-full z-20 shadow-[0_0_15px_5px_rgba(99,102,241,0.7)] borderShadow"
                    style={{
                      width: `${winLine}%`,
                      transform: "translateY(-50%) rotate(45deg)",
                      transformOrigin: "left center",
                      top: "12%",
                      left: "12%",
                    }}
                  ></div>
                </div>

                {/* Rest of your cells remain unchanged */}
                <div className="aspect-square bg-transparent flex items-center justify-center text-3xl font-bold text-pink-500 shadow-md transition-all duration-200 transform border-2 border-white/10">
                  <FaRegCircle className="h-10 w-10 animate-pulse bg-blue-500/30 rounded-full borderShadow" />
                </div>
                <div className="aspect-square bg-transparent flex items-center justify-center text-3xl font-bold text-pink-500 shadow-md transition-all duration-200 transform border-2 border-white/10">
                  <FaRegCircle className="h-10 w-10 animate-pulse bg-blue-500/30 rounded-full borderShadow" />
                </div>
                <div className="aspect-square bg-transparent shadow-md transition-all duration-200 transform border-2 border-white/10"></div>

                <div className="aspect-square bg-transparent flex items-center justify-center text-3xl font-bold text-white shadow-md transition-all duration-200 transform border-2 border-white/10">
                  <IoClose className="h-14 w-14 animate-pulse" />
                </div>
                <div className="aspect-square bg-transparent flex items-center justify-center text-3xl font-bold text-pink-500 shadow-md transition-all duration-200 transform border-2 border-white/10">
                  <FaRegCircle className="h-10 w-10 animate-pulse bg-blue-500/30 rounded-full borderShadow" />
                </div>
                <div className="aspect-square bg-transparent flex items-center justify-center text-3xl font-bold text-white shadow-md transition-all duration-200 transform border-2 border-white/10">
                  <IoClose className="h-14 w-14 animate-pulse" />
                </div>

                <div className="aspect-square bg-transparent shadow-md transition-all duration-200 transform border-2 border-white/10"></div>
                <div className="aspect-square bg-transparent flex items-center justify-center text-3xl font-bold text-white shadow-md transition-all duration-200 transform border-2 border-white/10">
                  <IoClose className="h-14 w-14 animate-pulse" />
                </div>
                <div className="aspect-square bg-transparent flex items-center justify-center text-3xl font-bold text-pink-500 shadow-md transition-all duration-200 transform border-2 border-white/10">
                  <FaRegCircle className="h-10 w-10 animate-pulse bg-blue-500/30 rounded-full borderShadow" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleUserVsComputer}
                className="hover:bg-purple-600/50  outline-0 w-full group relative inline-flex overflow-hidden rounded p-[2px] border border-purple-500  circleShadow"
              >
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center gap-3  px-8 py-3 text-sm font-medium backdrop-blur-3xl transition-all duration-300 ">
                  <svg
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mr-2 h-5 w-5 text-pink-500 transition-transform duration-300 group-hover:-translate-x-1"
                  >
                    <path
                      d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                  <img src="user.png" alt="" className="w-4 h-4" />
                  <span className="text-white">VS</span>
                  <span className="flex items-center justify-center text-white font-sm">
                    <img
                      src="Meta-ai-logo.png"
                      alt=""
                      className="w-5 h-5 mr-1"
                    />
                  </span>

                  <svg
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="ml-2 h-5 w-5 text-blue-500 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </span>
              </button>

              <button
                onClick={handleUserVsUser}
                className=" hover:bg-purple-600/50 outline-0 w-full group relative inline-flex overflow-hidden rounded p-[2px]  border border-purple-500  circleShadow"
              >
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center gap-3 rounded px-8 py-3 text-sm font-medium backdrop-blur-3xl transition-all duration-300 ">
                  <svg
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mr-2 h-5 w-5 text-pink-500 transition-transform duration-300 group-hover:-translate-x-1"
                  >
                    <path
                      d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                  <img src="user.png" alt="" className="w-4 h-4" />
                  <span className="text-white">VS</span>
                  <img src="user.png" alt="" className="w-4 h-4" />

                  <svg
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="ml-2 h-5 w-5 text-blue-500 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
          {/* <Game_nstruction /> */}
        </div>

        {/* Difficulty Modal */}
        {showDifficultyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
              <button
                onClick={() => setShowDifficultyModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-purple-100 rounded-full transition-colors text-2xl text-purple-700"
              >
                <IoClose className="h-6 w-6 cursor-pointer" />
              </button>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Level Difficulty
                </h2>
                <p className="text-purple-600">Choose your challenge level</p>
              </div>

              <div className="space-y-4 mb-6">
                {["easy", "medium", "hard"].map((diff) => (
                  <div
                    key={diff}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      difficulty === diff
                        ? "border-purple-500 bg-purple-200"
                        : "border-purple-200"
                    }`}
                    onClick={() => setDifficulty(diff)}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          difficulty === diff
                            ? "border-purple-600 bg-purple-600"
                            : "border-purple-300"
                        }`}
                      >
                        {difficulty === diff && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 capitalize">
                          {diff}
                        </h3>
                        <p className="text-sm text-purple-700">
                          {diff === "easy"
                            ? "Computer makes random moves"
                            : diff === "medium"
                            ? "Computer plays strategically sometimes"
                            : "Computer never loses"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm text-purple-700 mb-2">
                  <span>Easy</span>
                  <span>Medium</span>
                  <span>Hard</span>
                </div>
                <div className="relative h-2 bg-purple-200 rounded-full">
                  <div
                    className={`absolute h-full rounded-full transition-all duration-300 ${
                      difficulty === "easy"
                        ? "bg-green-500"
                        : difficulty === "medium"
                        ? "bg-yellow-400"
                        : "bg-red-500"
                    }`}
                    style={{
                      width:
                        difficulty === "easy"
                          ? "5%"
                          : difficulty === "medium"
                          ? "50%"
                          : "100%",
                    }}
                  ></div>
                </div>
              </div>

              <button
                onClick={() => handleDifficultyConfirm(difficulty)}
                className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-lg transition-all transform hover:scale-[1.01] cursor-pointer"
              >
                Start Game
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Game Board
  return (
    <div className="min-h-screen flex justify-center items-center bg-black relative overflow-hidden p-4 ">
      <div className="w-sm m-auto p-6 rounded-xl z-10 bg-gradient-to-br from-purple-900 via-indigo-900 to-black relative border border-white/40 ">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 ">
          <button
            onClick={backToMenu}
            className="cursor-pointer absolute text-4xl rounded-full left-0 top-0 p-3 text-purple-500  font-extrabold"
          >
            <GrCaretPrevious />
          </button>

          <button
            onClick={resetGame}
            className="cursor-pointer absolute text-4xl rounded-full right-0 top-0 p-3 text-purple-500  font-extrabold "
          >
            <GrPowerReset />
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
              <div className="absolute inset-0 w-full h-full pointer-events-none ">
                {/* Horizontal lines */}
                {winningLine[0] === 0 &&
                  winningLine[1] === 1 &&
                  winningLine[2] === 2 && (
                    <div
                      className="winning-line horizontal animate-grow"
                      style={{ top: "16.5%", left: "10%" }}
                    />
                  )}
                {winningLine[0] === 3 &&
                  winningLine[1] === 4 &&
                  winningLine[2] === 5 && (
                    <div
                      className="winning-line horizontal animate-grow"
                      style={{ top: "50%", left: "10%" }}
                    />
                  )}
                {winningLine[0] === 6 &&
                  winningLine[1] === 7 &&
                  winningLine[2] === 8 && (
                    <div
                      className="winning-line horizontal animate-grow"
                      style={{ top: "83.5%", left: "10%" }}
                    />
                  )}

                {/* Vertical lines */}
                {winningLine[0] === 0 &&
                  winningLine[1] === 3 &&
                  winningLine[2] === 6 && (
                    <div
                      className="winning-line vertical animate-grow"
                      style={{ left: "16.5%", top: "10%" }}
                    />
                  )}
                {winningLine[0] === 1 &&
                  winningLine[1] === 4 &&
                  winningLine[2] === 7 && (
                    <div
                      className="winning-line vertical animate-grow"
                      style={{ left: "50%", top: "10%" }}
                    />
                  )}
                {winningLine[0] === 2 &&
                  winningLine[1] === 5 &&
                  winningLine[2] === 8 && (
                    <div
                      className="winning-line vertical animate-grow"
                      style={{ left: "83.5%", top: "10%" }}
                    />
                  )}

                {/* Diagonal lines */}
                {winningLine[0] === 0 &&
                  winningLine[1] === 4 &&
                  winningLine[2] === 8 && (
                    <div className="winning-line diagonal-1 animate-grow-diagonal" />
                  )}
                {winningLine[0] === 2 &&
                  winningLine[1] === 4 &&
                  winningLine[2] === 6 && (
                    <div className="winning-line diagonal-2 animate-grow-diagonal" />
                  )}
              </div>
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

        {/* Winning Modal */}
        {showWinModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center animate__animated animate__fadeInUp">
              {gameMode === "computer" ? (
                <div className="mb-6">
                  {isDraw ? (
                    <div className="w-28 h-28 mx-auto  rounded-full flex items-center justify-center">
                      <img
                        src="handshake.png"
                        alt=""
                        className="animate__animated animate__fadeInUp"
                      />
                    </div>
                  ) : winner === "X" ? (
                    <div className="w-24 h-24 mx-auto  rounded-full flex items-center justify-center text-4xl">
                      <img src="trophy.png" alt="" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 mx-auto  rounded-full flex items-center justify-center text-4xl">
                      <img src="sad-face.png" alt="" />
                    </div>
                  )}

                  <h2 className="text-3xl font-bold text-gray-800 mb-2 mt-2">
                    {isDraw
                      ? "DRAW!"
                      : `${winner === "X" ? "You win!" : "You lose!"}`}
                  </h2>

                  <p className="text-gray-600 mb-8">
                    {isDraw
                      ? "Great game! You both played well."
                      : winner === "X"
                      ? "Congratulations! You won the game!"
                      : "Better luck next time!"}
                  </p>
                </div>
              ) : (
                <div>
                  <div className="w-24 h-24 mx-auto  rounded-full flex items-center justify-center text-4xl">
                    <img src="trophy.png" alt="" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2 mt-2">
                    {isDraw
                      ? "DRAW!"
                      : `${winner === "X" ? "PLAYER 1 WIN!" : "PLAYER 2 WIN!"}`}
                  </h2>

                  <p className="text-gray-600 mb-8">
                    {isDraw
                      ? "Great game! You both played well."
                      : winner === "X"
                      ? "Congratulations!"
                      : "Congratulations!"}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={resetGame}
                  className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded shadow-lg flex justify-center items-center gap-2 cursor-pointer"
                >
                  <span className="text-2xl">
                    <RiLoopLeftFill />
                  </span>{" "}
                  Play Again
                </button>

                <button
                  onClick={backToMenu}
                  className="w-full py-3 text-lg font-semibold border-2 border-gray-300 hover:bg-gray-50 text-gray-700 rounded flex justify-center items-center gap-2 cursor-pointer"
                >
                  <span className="text-2xl font-semibold">
                    <FaHome />
                  </span>{" "}
                  Back to Menu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
