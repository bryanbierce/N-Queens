onmessage = function(e) {
  recurse(e.data.board, e.data.cols, e.data.row);
  postMessage({ type: 'stable', horse: e.data.horse });
  self.close();
}

function recurse(board, cols, row){
  if(cols.length === 0){
    postMessage({ type: 'count'});
  }else{
    for(var i = 0; i < cols.length; i++){
      var col = cols[i];
      if(!hasMajorDiagonalConflictAt(board, col, row) && !hasMinorDiagonalConflictAt(board, col, row)){
        board[row][col] = !board[row][col];
        recurse(board, cols.filter(function(item, index){ return index !== i;}), row+1);
        board[row][col] = !board[row][col];
      }
    }
  }
};

function hasMinorDiagonalConflictAt(board, colIndex, rowIndex) {
  var n = board.length;
  while(++colIndex < n && --rowIndex >= 0) {
    if(board[rowIndex][colIndex]) return true;
  }

  return false;
}

function hasMajorDiagonalConflictAt(board, colIndex, rowIndex) {
  var n = board.length;
  while(--colIndex >= 0 && --rowIndex >= 0) {
    if(board[rowIndex][colIndex]) return true;
  }

  return false;
}
