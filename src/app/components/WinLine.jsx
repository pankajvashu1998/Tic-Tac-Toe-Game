import React from "react";

const WinLine = ({ props }) => {
  const { winningLine } = props;
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none ">
      {/* Horizontal lines */}
      {winningLine[0] === 0 && winningLine[1] === 1 && winningLine[2] === 2 && (
        <div
          className="winning-line horizontal animate-grow"
          style={{ top: "16.5%", left: "10%" }}
        />
      )}
      {winningLine[0] === 3 && winningLine[1] === 4 && winningLine[2] === 5 && (
        <div
          className="winning-line horizontal animate-grow"
          style={{ top: "50%", left: "10%" }}
        />
      )}
      {winningLine[0] === 6 && winningLine[1] === 7 && winningLine[2] === 8 && (
        <div
          className="winning-line horizontal animate-grow"
          style={{ top: "83.5%", left: "10%" }}
        />
      )}

      {/* Vertical lines */}
      {winningLine[0] === 0 && winningLine[1] === 3 && winningLine[2] === 6 && (
        <div
          className="winning-line vertical animate-grow"
          style={{ left: "16.5%", top: "10%" }}
        />
      )}
      {winningLine[0] === 1 && winningLine[1] === 4 && winningLine[2] === 7 && (
        <div
          className="winning-line vertical animate-grow"
          style={{ left: "50%", top: "10%" }}
        />
      )}
      {winningLine[0] === 2 && winningLine[1] === 5 && winningLine[2] === 8 && (
        <div
          className="winning-line vertical animate-grow"
          style={{ left: "83.5%", top: "10%" }}
        />
      )}

      {/* Diagonal lines */}
      {winningLine[0] === 0 && winningLine[1] === 4 && winningLine[2] === 8 && (
        <div className="winning-line diagonal-1 animate-grow-diagonal" />
      )}
      {winningLine[0] === 2 && winningLine[1] === 4 && winningLine[2] === 6 && (
        <div className="winning-line diagonal-2 animate-grow-diagonal" />
      )}
    </div>
  );
};

export default WinLine;
