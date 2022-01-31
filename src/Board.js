import { useEffect, useState } from "react";
export const Players = {
  PlayerOne: "X",
  PlayerTwo: "O"
};
export const Board = ({ currentPlayer, setCurrentPlayer }) => {
  const [winner, setWinner] = useState("NA");
  var XArray = [];
  var OArray = [];
  const winCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  const initialBoard = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ];
  const initialScore = { X: 0, O: 0 };
  const [board, setBoard] = useState(initialBoard);
  const [score, setScore] = useState(initialScore);
  const handleOnClick = (e) => {
    let i = Math.floor(e.target.value / 3);
    let j = Math.floor(e.target.value % 3);
    currentPlayer === Players.PlayerOne
      ? setCurrentPlayer(Players.PlayerTwo)
      : setCurrentPlayer(Players.PlayerOne);

    let tempBoard = board;
    tempBoard[i][j] = currentPlayer;
    setBoard(tempBoard);
    checkWinner(board);
  };
  const checkWinner = (board) => {
    let BothArray = [XArray, OArray];
    board.forEach((e, i) => {
      e.forEach((l, j) => {
        if (l === Players.PlayerOne) {
          XArray.push(initialBoard[i][j]);
        } else if (l === Players.PlayerTwo) {
          OArray.push(initialBoard[i][j]);
        }
      });
    });
    BothArray.forEach((array, index) => {
      winCases.forEach((e) => {
        if (e.every((l) => array.includes(l))) {
          setWinner(index === 0 ? Players.PlayerOne : Players.PlayerTwo);
        }
      });
    });
    if (XArray.length + OArray.length === 9) {
      setWinner("T");
      return;
    }
  };

  const resetScore = () => {
    setScore(initialScore);
  };
  const resetBoard = () => {
    XArray = [];
    OArray = [];
    setBoard(initialBoard);
    setWinner("NA");
    setCurrentPlayer(Players.PlayerOne);
  };

  function resetGame() {
    resetBoard();
    resetScore();
  }

  useEffect(() => {
    switch (winner) {
      case Players.PlayerOne: {
        setScore((s) => ({ ...s, X: s.X + 1 }));
        resetBoard();
        break;
      }
      case Players.PlayerTwo: {
        setScore((s) => ({ ...s, O: s.O + 1 }));
        resetBoard();
        break;
      }
      case "T": {
        resetBoard();
        break;
      }
      default:
        break;
    }
  }, [winner]);

  return (
    <>
      <h4>
        Score: Player One: {score.X} Player Two: {score.O}
      </h4>
      <table style={{ marginLeft: "auto", marginRight: "auto" }}>
        <tbody className="board">
          {board.map((e, i) => {
            return (
              <tr
                key={i}
                style={{ display: "table", gridTemplateColumns: "1fr 1fr 1fr" }}
              >
                {e.map((l, j) => {
                  return (
                    <Square
                      key={initialBoard[i][j]}
                      value={board[i][j]}
                      onClick={handleOnClick}
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <button style={{ margin: 5 }} onClick={resetBoard}>
        Reset Board
      </button>
      <button style={{ margin: 5 }} onClick={resetGame}>
        Reset Game
      </button>
    </>
  );
};

export const Square = ({ value, onClick }) => {
  const style = {
    width: 50,
    height: 50,
    backgroundColor: "aliceblue",
    borderRadius: 5,
    borderStroke: "blue"
  };
  useEffect(() => {}, [value]);
  return (
    <td>
      <button
        value={value}
        style={style}
        onClick={(e) => {
          onClick(e);
        }}
        disabled={isNaN(value)}
      >
        {isNaN(value) && value}
      </button>
    </td>
  );
};
export default Board;
