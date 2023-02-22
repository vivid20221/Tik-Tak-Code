import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Button from "./components/Button";
import Square from "./components/Square";
//import NavBar from "./components/NavBar";
//import PaymentForm from "./components/PaymentForm";
//import StripeContainer from "./components/StripeContainer";
import { BrowserRouter as View } from "react-router-dom";
//import TikTakCode from "./components/TikTakCode";
//import Square from "./components/Icons";
//import Ai from "./components/Ai";
//import GameBoard from "./components/GameBoard";

function App() {
  const styles = {
    container: {
      flex: 1,
    },
  };

  const rightButtonConfig = {
    title: "Next",
    handler: () => alert("hello!"),
  };

  const titleConfig = {
    title: "TIK-TAK-CODE",
  };

  function NavBar() {
    return (
      <View style={styles.container}>
        <NavBar title={titleConfig} rightButton={rightButtonConfig} />
      </View>
    );
  }
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState(null);

  const checkEndTheGame = () => {
    for (let square of squares) {
      if (!square) return false;
    }
    return true;
  };

  const checkWinner = () => {
    const combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of combos) {
      const [a, b, c] = combo;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const updateSquares = (ind) => {
    if (squares[ind] || winner || turn === "o") {
      return;
    }
    const s = squares.slice(); // make a copy of the squares array
    s[ind] = turn;
    setSquares(s);
    setTurn(turn === "x" ? "o" : "x");
    const W = checkWinner(s);
    if (W) {
      setWinner(W);
    } else if (checkEndTheGame(s)) {
      setWinner("x | o");
    } else if (turn === "o") {
      // it's the AI's turn to play
      let bestScore = -Infinity;
      let bestMove = null;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === "") {
          s[i] = "o";
          const score = minimax(s, 0, false);
          s[i] = "";
          if (score > bestScore) {
            bestScore = score;
            bestMove = i;
          }
        }
      }
      s[bestMove] = "o";
      setSquares(s);
      setTurn("x");
      const winner = checkWinner(s);
      if (winner) {
        setWinner(winner);
      } else if (checkEndTheGame(s)) {
        setWinner("x | o");
      }
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(""));
    setTurn("x");
    setWinner(null);
  };

   // Helper function for getting available moves on the board
   const getAvailableMoves = (board) => {
    return board.reduce((moves, curr, index) => {
      if (curr === "") moves.push(index);
      return moves;
    }, []);
  }
const minimax = (squares, depth, isMaximizingPlayer) => {
  const winner = checkWinner(squares);
  if (winner !== null) {
    if (winner === "x") {
      return 10 - depth;
    } else if (winner === "o") {
      return depth - 10;
    } else {
      return 0;
    }
  }

  if (checkEndTheGame(squares)) {
    return 0;
  }

  if (isMaximizingPlayer) {
    let bestScore = -Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === "") {
        squares[i] = "x";
        const score = minimax(squares, depth + 1, false);
        squares[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === "") {
        squares[i] = "o";
        const score = minimax(squares, depth + 1, true);
        squares[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

  return (
    <div className="tic-tac-toe">
      <h1> TIK-TAK-CODE! </h1>
      <Button resetGame={resetGame} />
      <div className="game">
        {Array.from("012345678").map((ind) => (
          <Square
            key={ind}
            ind={ind}
            updateSquares={updateSquares}
            clsName={squares[ind]}
          />
        ))}
      </div>
      <div className={`turn ${turn === "x" ? "left" : "right"}`}>
        <Square clsName="x" />
        <Square clsName="o" />
      </div>
      <AnimatePresence>
        {winner && (
          <motion.div
            key={"parent-box"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="winner"
          >
            <motion.div
              key={"child-box"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="text"
            >
              <motion.h2
                initial={{ scale: 0, y: 100 }}
                animate={{
                  scale: 1,
                  y: 0,
                  transition: {
                    y: { delay: 0.7 },
                    duration: 0.7,
                  },
                }}
              >
                {winner === "x | o" ? "No Winner." : "YOU HAVE WON!!"}
              </motion.h2>
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  transition: {
                    delay: 1.3,
                    duration: 0.2,
                  },
                }}
                className="win"
              >
                {winner === "x | o" ? (
                  <>
                    <Square clsName="x" />
                    <Square clsName="o" />
                  </>
                ) : (
                  <>
                    <Square clsName={winner} />
                  </>
                )}
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  transition: { delay: 1.5, duration: 0.3 },
                }}
              >
                <Button resetGame={resetGame} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
