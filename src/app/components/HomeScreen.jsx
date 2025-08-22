import React from "react";
import { FaRegCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import About from "./About";
const HomeScreen = ({ props }) => {
  const {
    winLine,
    handleUserVsComputer,
    handleUserVsUser,
    showDifficultyModal,
    setShowDifficultyModal,
    setDifficulty,
    difficulty,
    handleDifficultyConfirm,
  } = props;
  return (
    <div className=" bubbleBackground  flex justify-center flex-col items-center  w-full relative overflow-hidden">
      {/* Middle - Game Image */}
      <div className="flex-1 flex items-center flex-col justify-center gap-7  px-4 z-10 bg-indigo-900/90  min-h-screen w-full">
        <div className=" p-6 md:max-w-[350px] w-full   relative ">
          <div className="relative">
            <h1 className="text-center md:text-5xl text-2xl font-bold text-white">
              TIC TAC TOE
            </h1>
            <p className="text-sm text-center text-white pb-4 ">
              Think Ahead, Win Faster!
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3 border-4 border-blue-300 rounded-xl relative bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
            {/* Background gradient container */}
            <div className="col-span-3 grid grid-cols-3  rounded shadow-lg relative circleShadow animate__animated animate__bounceIn">
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

          <div className="w-full flex justify-center items-center flex-col gap-3">
            <button
              onClick={handleUserVsComputer}
              className="bg-indigo-800 text-white border-2 border-blue-400 p-3 rounded-xl cursor-pointer hover:bg-indigo-900 duration-300"
            >
              <div className="flex justify-center items-center gap-4">
                <img src="user.png" alt="User" className="w-6 h-6" />
                <span className="text-white font-semibold">VS</span>

                <img src="Meta-ai-logo.png" alt="AI" className="w-7 h-7" />
              </div>
            </button>
            <button
              onClick={handleUserVsUser}
              className="bg-indigo-800 text-white border-2 border-blue-400 p-3 rounded-xl cursor-pointer hover:bg-indigo-900 duration-300"
            >
              <div className="flex justify-center items-center gap-4">
                <img src="user.png" alt="User" className="w-6 h-6" />
                <span className="text-white font-semibold">VS</span>
                <img src="user.png" alt="User" className="w-6 h-6" />
              </div>
            </button>
          </div>
        </div>
      </div>

     

      {/* Difficulty Modal */}
      {showDifficultyModal && (
        <div className="fixed w-full   bubbleBackground   z-50">
          <div className="w-full h-screen bg-indigo-900/90 flex items-center justify-center">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate__animated animate__bounceIn">
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
        </div>
      )}

    
    </div>
  );
};

export default HomeScreen;
