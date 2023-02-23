import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Button from "./Button";
import Square from "./Square";
import { BrowserRouter as View } from "react-router-dom";

function GameBoard() {
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
  const minimax = (squares, depth, maximizingPlayer) => {
    const winner = checkWinner(squares);
    if (winner) {
      if (winner === "x") return 10 - depth;
      if (winner === "o") return depth - 10;
      return 0;
    }
    if (checkEndTheGame(squares)) return 0;

    if (maximizingPlayer) {
      let maxEval = -Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i]) continue;
        squares[i] = "x";
        const evaluation = minimax(squares, depth + 1, false);
        squares[i] = "";
        maxEval = Math.max(maxEval, evaluation);
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i]) continue;
        squares[i] = "o";
        const evaluation = minimax(squares, depth + 1, true);
        squares[i] = "";
        minEval = Math.min(minEval, evaluation);
      }
      return minEval;
    }
  };

  const updateSquares = (ind) => {
    if (squares[ind] || winner) {
      return;
    }
    const newSquares = [...squares];
    newSquares[ind] = "x";
    setSquares(newSquares);
    const W = checkWinner(newSquares);
    console.log(W)
    if (W) {
      console.log(W)
      setWinner(W);
    } else if (checkEndTheGame(newSquares)) {
      console.log("tie game")
      setWinner("x | o");
    } else {
      setTurn("o");
        // AI uses minimax to find best move
        const bestMove = getBestMove(newSquares);
        if (!bestMove) {
          const emptySquares = newSquares
            .map((s, i) => (s === "" ? i : null))
            .filter((i) => i !== null);
          const randomIndex = Math.floor(Math.random() * emptySquares.length);
          newSquares[emptySquares[randomIndex]] = "o";
        } else {
          newSquares[bestMove] = "o";
        }

      setSquares(newSquares);
      const W = checkWinner(newSquares);
      if (W) {
        setWinner(W);
      } else if (checkEndTheGame(newSquares)) {
        setWinner("x | o");
      }
      setTurn("x");
    }
  };

  const getBestMove = (squares) => {
    let bestScore = -Infinity;
    let bestMove = null;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i]) continue;
      squares[i] = "o";
      const score = minimax(squares, 0, false);
      squares[i] = "";
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
    return bestMove;
  };

  const resetGame = () => {
    setSquares(Array(9).fill(""));
    setTurn("x");
    setWinner(null);
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

export default GameBoard;
