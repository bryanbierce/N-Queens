
function plainCountNQueens(board, cols, row, count){
  cols = cols || makeColsArray(board[0].length);
  row = row || 0;
  count = count || 0;

  if(cols.length === 0) {
    return ++count;
  }else{
    for(let i = 0; i < cols.length; i++) {
      let col = cols[i];
      board[row][col] = !board[row][col];
      if(!hasMajorDiagonalConflictAt(board, col, row) && !hasMinorDiagonalConflictAt(board, col, row)) {
        let cols = cols.filter((item, index) => index !== i);
        count = plainCountNQueens(board, cols, row+1, count);
      }
      board[row][col] = !board[row][col];
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
  var n = board[0].length;
  while(++colIndex < n && --rowIndex >= 0) {
    if(board[rowIndex][colIndex]) return true;
  }

  return false;
}

function hasMajorDiagonalConflictAt(board, colIndex, rowIndex) {
  var n = board[0].length;
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
