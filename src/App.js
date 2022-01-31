import { useState } from "react";
import "./styles.css";
import Board from "./Board";
export default function App() {
  const [currentPlayer, setCurrentPlayer] = useState("X");

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <h3>Current Player: {currentPlayer}</h3>
      <Board
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
      />
    </div>
  );
}
