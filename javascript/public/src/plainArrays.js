
function plainCountNQueens(board, cols, row, count){
  cols = cols || makeColsArray(board.length);
  row = row || 0;
  count = count || 0;

  if(cols.length === 0) {
    return ++count;
  } else {
    for(var i = 0; i < cols.length; i++) {
      var col = cols[i];
      if(!hasMajorDiagonalConflictAt(board, col, row) && !hasMinorDiagonalConflictAt(board, col, row)) {
        var newCols = cols.filter(function(item, index) { return index !== i});
        board[row][col] = !board[row][col];
        count = plainCountNQueens(board, newCols, row+1, count);
        board[row][col] = !board[row][col];
      }
    }
  }
  return count;
};

function makeColsArray(n) {
  var arr = [];
  for(var i = 0; i < n; i++) {
    arr[i] = i;
  }
  return arr;
};

function hasMinorDiagonalConflictAt(board, colIndex, rowIndex) {
  var n = board.length;
  while(++colIndex < n && --rowIndex >= 0) {
    if(board[rowIndex][colIndex]) return true;
  }

  return false;
}

function hasMajorDiagonalConflictAt(board, colIndex, rowIndex) {
  while(--colIndex >= 0 && --rowIndex >= 0) {
    if(board[rowIndex][colIndex]) return true;
  }

  return false;
}


function makeEmptyMatrix(n) {
  var matrix = [];
  for(var i = 0; i < n; i++){
    var row = [];
    for(var j = 0; j < n; j++){
      row[j] = false;
    }
    matrix[i] = row;
  }

  return matrix;
};

/*
 ---------- ---------- ---------- ----------
|          |\\\\\\\\\\|          |\\\\\\\\\\|
|          |\\\\\\\\\\|          |\\\\\\\\\\|
|          |\\\\\\\\\\|          |\\\\\\\\\\|
|          |\\\\\\\\\\|          |\\\\\\\\\\|
 ---------- ---------- ---------- ----------
|\\\\\\\\\\|          |\\\\\\\\\\|          |
|\\\\\\\\\\|          |\\\\\\\\\\|          |
|\\\\\\\\\\|          |\\\\\\\\\\|          |
|\\\\\\\\\\|          |\\\\\\\\\\|          |
 ---------- ---------- ---------- ----------
|          |\\\\\\\\\\|          |\\\\\\\\\\|
|          |\\\\\\\\\\|          |\\\\\\\\\\|
|          |\\\\\\\\\\|          |\\\\\\\\\\|
|          |\\\\\\\\\\|          |\\\\\\\\\\|
 ---------- ---------- ---------- ----------
|\\\\\\\\\\|          |\\\\\\\\\\|          |
|\\\\\\\\\\|          |\\\\\\\\\\|          |
|\\\\\\\\\\|          |\\\\\\\\\\|          |
|\\\\\\\\\\|          |\\\\\\\\\\|          |
 ---------- ---------- ---------- ----------
*/
