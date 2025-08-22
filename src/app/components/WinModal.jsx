import React from "react";
import { RiLoopLeftFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
const WinModal = ({ props }) => {
  const { showWinModal, gameMode, isDraw, winner, resetGame, backToMenu } =
    props;
  return (
    <div>
      {showWinModal && (
        <div className="fixed top-0 left-0 bubbleBackground w-full  z-50 ">
          <div className="w-full bg-indigo-900/90 h-screen flex items-center justify-center">
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
        </div>
      )}
    </div>
  );
};

export default WinModal;
