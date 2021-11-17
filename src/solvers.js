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

//initialize new board.
//set a piece
//set another piece
//if has row + column conflicts returns true
//remove piece
//set another piece further along
//loop through until a solution is obtained (all n rooks are placed + validation passes)
//if no solution, change the first placement.
window.findNRooksSolution = function(n) {
  let board = new Board(n); //fixme
  let solution;
  // let recurThruBoard = function (board, numRooks, colIndex = 0, rowIndex = 0) {
  //   board.attributes[colIndex][rowIndex] = 1;
  //   numRooks--;
  //   if (board.hasAnyRooksConflicts()) {
  //     return;
  //   }
  //   if ((!board.hasAnyRooksConflicts()) && (numRooks === 0)) {
  //     solution = board;
  //     return;
  //   }
  //   for (let i = 0; i < n; i++) {
  //     for (let j = 1; j < n; j++) {
  //       recurThruBoard(board, numRooks, i, j);
  //     }
  //   }
  // };
  // recurThruBoard(board, n);
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let solutionCount = 0;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
