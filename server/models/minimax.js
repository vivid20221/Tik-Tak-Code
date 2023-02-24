let board = [null, null, null, null, null, null, null, null, null];
let maximizingPlayer = 'X';
let minimizingPlayer = 'O';
let bestScore = -Infinity;
let bestMove = -1;

for (let i = 0; i < 9; i++) {
  // If the square is not taken
  if (board[i] === null) {
    // Make a move
    board[i] = maximizingPlayer;
    // Call minimax with the other player
    let score = minimax(board, 0, false, maximizingPlayer, minimizingPlayer);
    // Undo the move
    board[i] = null;
    // Update the best move
    if (score > bestScore) {
      bestScore = score;
      bestMove = i;
    }
  }
}

console.log(`The best move is ${bestMove}`);

function minimax(board, depth, isMaximizingPlayer, maximizingPlayer, minimizingPlayer) {
  // Check if maximizing player won
  if (checkWin(board, maximizingPlayer)) {
    return 10 - depth;
  }

  // Check if minimizing player won
  if (checkWin(board, minimizingPlayer)) {
    return depth - 10;
  }

  // Check if the board is full
  if (boardIsFull(board)) {
    return 0;
  }

  // If it's the maximizing player's turn
  if (isMaximizingPlayer) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      // If the square is not taken
      if (board[i] === null) {
        // Make a move
        board[i] = maximizingPlayer;
        // Call minimax recursively with the other player
        let score = minimax(board, depth + 1, !isMaximizingPlayer, maximizingPlayer, minimizingPlayer);
        // Undo the move
        board[i] = null;
        // Update the best score
        bestScore = Math.max(bestScore, score);
      }
    }
    return bestScore;
  } 
  // If it's the minimizing player's turn
  else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      // If the square is not taken
      if (board[i] === null) {
        // Make a move
        board[i] = minimizingPlayer;
        // Call minimax recursively with the other player
        let score = minimax(board, depth + 1, !isMaximizingPlayer, maximizingPlayer, minimizingPlayer);
        // Undo the move
        board[i] = null;
        // Update the best score
        bestScore = Math.min(bestScore, score);
      }
    }
    return bestScore;
  }
}

function checkWin(board, player) {
  // Check for rows
  for (let i = 0; i < 9; i += 3) {
    if (board[i] === player && board[i+1] === player && board[i+2] === player) {
      return true;
    }
  }
      // Check for columns
  for (let i = 0; i < 3; i++) {
    if (board[i] === player && board[i+3] === player && board[i+6] === player) {
      return true;
    }
  }
        // Check for diagonals
        if (board[0] === player && board[4] === player && board[8] === player) {
          return true;
        }
        if (board[2] === player && board[4] === player && board[6] === player) {
          return true;
        }
      
        // If no winning combination is found, return false
        return false;
      }
      
      function boardIsFull(board) {
        for (let i = 0; i < board.length; i++) {
          if (board[i] === null) {
            return false;
          }
        }
        return true;
      }
      
  
module.exports = minimax;