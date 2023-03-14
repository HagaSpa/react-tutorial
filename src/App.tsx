import { useState } from "react";

type Props = {
  value: string;
  onSquareClick: () => void;
};

const Square = ({ value, onSquareClick }: Props) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

export const Board = () => {
  const [squares, setSquares] = useState(Array<string>(9).fill(""));
  const handleClick = (i: number) => {
    const nextSquares = squares.slice();
    nextSquares[i] = "X";
    setSquares(nextSquares);
  };

  return (
    <>
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
