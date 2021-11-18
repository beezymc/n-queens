// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },

    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      const currRow = this.attributes[rowIndex];
      let conflictCount = -1;
      for (let i = 0; i < currRow.length; i++) {
        if (currRow[i] === 1) {
          conflictCount++;
        }
      }
      return conflictCount >= 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for (let rowKey in this.attributes) {
        if (this.hasRowConflictAt(rowKey)) {
          return true;
        }
      }
      return false;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let conflictCount = -1;
      for (let rowKey in this.attributes) {
        if (this.attributes[rowKey][colIndex] === 1) {
          conflictCount++;
        }
      }
      return conflictCount >= 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (let i = 0; i < this.attributes[0].length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      let conflictCount = -1;
      for (let i = 0; i < this.attributes.n; i++) {
        for (let j = 0; j < this.attributes.n; j++) {
          if (this._getFirstRowColumnIndexForMajorDiagonalOn(i, j) === majorDiagonalColumnIndexAtFirstRow && this.attributes[i][j] === 1) {
            conflictCount++;
          }
        }
      }
      return conflictCount >= 1;
      // let conflictCount = -1;
      // let rowIndex, colIndex;
      // if (majorDiagonalColumnIndexAtFirstRow >= 0) {
      //   rowIndex = 0;
      //   colIndex = majorDiagonalColumnIndexAtFirstRow;
      // } else {
      //   rowIndex = Math.abs(majorDiagonalColumnIndexAtFirstRow);
      //   colIndex = 0;
      // }
      // while (this._isInBounds(rowIndex, colIndex)) {
      //   if (this.attributes[rowIndex][colIndex] === 1) {
      //     conflictCount++;
      //   }
      //   rowIndex++;
      //   colIndex++;
      // }
      // return conflictCount >= 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // n = 1; 0 // n = 2 -1-1 // n = 3 -2-2 // n = 4 -3-3 // n = 5 -4-4
      for (let i = -(this.attributes.n - 1); i < this.attributes.n - 1; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      let conflictCount = -1;
      for (let i = 0; i < this.attributes.n; i++) {
        for (let j = 0; j < this.attributes.n; j++) {
          if (this._getFirstRowColumnIndexForMinorDiagonalOn(i, j) === minorDiagonalColumnIndexAtFirstRow && this.attributes[i][j] === 1) {
            conflictCount++;
          }
        }
      }
      return conflictCount >= 1;
      // let conflictCount = -1;
      // let rowIndex, colIndex;
      // if (minorDiagonalColumnIndexAtFirstRow <= this.attributes.n - 1) {
      //   rowIndex = minorDiagonalColumnIndexAtFirstRow;
      //   colIndex = this.attributes.n - 1;
      // } else {
      //   rowIndex = this.attributes.n - 1;
      //   colIndex = (2 * this.attributes.n) - minorDiagonalColumnIndexAtFirstRow - 2;
      // }
      // while (this._isInBounds(rowIndex, colIndex)) {
      //   if (this.attributes[rowIndex][colIndex] === 1) {
      //     conflictCount++;
      //   }
      //   rowIndex++;
      //   colIndex--;
      // }
      // return conflictCount >= 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // n = 1; 0 // n = 2 0-2 // n = 3 0-4 // n = 4 0-6 // n = 5 -4-4 0-8
      for (let i = 0; i < (2 * this.attributes.n) - 2; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/
  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
