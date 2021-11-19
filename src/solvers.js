/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// inputs: n -> number.
// output: matrix (an array of arrays).
// initialize a board.
// recursive function (pass in board, solution matrix, # of rooks, currIndexI, currIndexJ)
// check if we've placed all rooks and there are no conflicts
// if so, set solution equal to board (we're done) and return
//check if there's a conflict
//return nothing
// else
//for loop into board;
//place rook into board at position + solution matrix and decrement rooks
// recur into board, passing rooks (1 less), w/ a placed rook.
window.findNRooksSolution = function(n) {
  let board = new Board({ n: n } ); //fixme
  let solution;
  let recurThruBoard = function (numRooks) {
    if (numRooks === 0) {
      solution = board;
      return;
    }
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        board.attributes[i][j] = 1;
        if (board.hasAnyRooksConflicts()) {
          board.attributes[i][j] = 0;
        }
      }
    }
    recurThruBoard(numRooks - 1);
  };
  recurThruBoard(n);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let solutionsCount = 0;
  let board = new Board({ n: n } ); //fixme
  let recurThruBoard = function (rows) {
    if (rows === n) {
      solutionsCount++;
      return;
    }
    for (let i = 0; i < n; i++) {
      board.attributes[rows][i] = 1;
      if (!board.hasAnyRooksConflicts()) {
        recurThruBoard(rows + 1);
      }
      board.attributes[rows][i] = 0;
    }
  };
  recurThruBoard(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionsCount);
  return solutionsCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other.
// this is running into trouble with the n = 0 case.
window.findNQueensSolution = function(n) {
  let board = new Board({ n: n } ); //fixme
  let solution = board.rows();
  let recurThruBoard = function (rows) {
    if (rows === n) {
      solution = _.map(board.rows(), function(row) {
        return row.slice();
      });
      return;
    }
    for (let i = 0; i < n; i++) {
      board.attributes[rows][i] = 1;
      if (!board.hasAnyQueensConflicts()) {
        recurThruBoard(rows + 1);
      }
      board.attributes[rows][i] = 0;
    }
  };
  recurThruBoard(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let solutionsCount = 0;
  let board = new Board({ n: n } ); //fixme
  if (n === 2 || n === 3) {
    return solutionsCount;
  }
  let recurThruBoard = function (rows) {
    if (rows === n) {
      solutionsCount++;
      return;
    }
    for (let i = 0; i < n; i++) {
      board.attributes[rows][i] = 1;
      if (!board.hasAnyQueensConflicts()) {
        recurThruBoard(rows + 1);
      }
      board.attributes[rows][i] = 0;
    }
  };
  recurThruBoard(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionsCount);
  return solutionsCount;
};
