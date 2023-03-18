import { useState } from "react";

const calculateWinner = (squares: string[]): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]!;
    if (
      squares[a!] &&
      squares[a!] === squares[b!] &&
      squares[a!] === squares[c!]
    ) {
      const winner = squares[a!];
      if (typeof winner === "string") {
        return winner;
      }
    }
  }

  return null;
};

type SquareProps = {
  value: string;
  onSquareClick: () => void;
};

const Square = ({ value, onSquareClick }: SquareProps) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

type BoardProps = {
  xIsNext: boolean;
  squares: string[];
  onPlay: (squares: string[]) => void;
};

export const Board = ({ xIsNext, squares, onPlay }: BoardProps) => {
  const handleClick = (i: number) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");
    onPlay(nextSquares);
  };

  let status: string;
  const winner = calculateWinner(squares);
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next Player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={typeof squares[0] === "string" ? squares[0] : ""}
          onSquareClick={() => handleClick(0)}
        />
        <Square
          value={typeof squares[1] === "string" ? squares[1] : ""}
          onSquareClick={() => handleClick(1)}
        />
        <Square
          value={typeof squares[2] === "string" ? squares[2] : ""}
          onSquareClick={() => handleClick(2)}
        />
      </div>
      <div className="board-row">
        <Square
          value={typeof squares[3] === "string" ? squares[3] : ""}
          onSquareClick={() => handleClick(3)}
        />
        <Square
          value={typeof squares[4] === "string" ? squares[4] : ""}
          onSquareClick={() => handleClick(4)}
        />
        <Square
          value={typeof squares[5] === "string" ? squares[5] : ""}
          onSquareClick={() => handleClick(5)}
        />
      </div>
      <div className="board-row">
        <Square
          value={typeof squares[6] === "string" ? squares[6] : ""}
          onSquareClick={() => handleClick(6)}
        />
        <Square
          value={typeof squares[7] === "string" ? squares[7] : ""}
          onSquareClick={() => handleClick(7)}
        />
        <Square
          value={typeof squares[8] === "string" ? squares[8] : ""}
          onSquareClick={() => handleClick(8)}
        />
      </div>
    </>
  );
};

export const Game = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array<string>(9).fill("")]);
  const currentSquares = history[history.length - 1]!;

  const handlePlay = (nextSquares: string[]) => {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (_nextMove: number) => {};

  const moves = history.map((_squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to move #${move}`;
    } else {
      description = "Go to game start";
    }
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
