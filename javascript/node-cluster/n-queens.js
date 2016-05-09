function countQueensFrom(i, n){
  const board = buildBoardWithPiece(i, n);
  const cols = buildColsArrayWithPiece(i, n);
  const solutions = search(board, cols, 1, 0);

  process.send({ type: 'completed', solutions });
}

function buildBoardWithPiece(i, n) {
  const board = [];
  for(let j = 0; j < n; j++) {
    const row = [];
    for(let k = 0; k < n; k++) {
      row[k] = false;
    }
    board[j] = row;
  }

  board[0][i] = true;
  return board;
}

function buildColsArrayWithPiece(i, n) {
  const cols = [];
  for (let j = 0; j < n; j++) {
    if(j !== i) cols.push(j);
  }
  return cols;
}


function hasMajorDiagonalConflict(board, row, col) {
  while (--row >= 0 && --col >= 0) {
    if (board[row][col]) return true;
  }
  return false;
}

function hasMinorDiagonalConflict(board, row, col) {
  const n = board.length;
  while (--row >= 0 && ++col <= n) {
    if (board[row][col]) return true;
  }
  return false;
}

function search(board, cols, row, count) {
  if (cols.length === 0) {
    return count + 1;
  } else {
    for (let i = 0; i < cols.length; i++) {
      const col = cols[i];

      if (!hasMajorDiagonalConflict(board, row, col)
      && !hasMinorDiagonalConflict(board, row, col)) {
        board[row][col] = true;
        count = search(board, cols.filter((val) => val !== col), row+1, count);
        board[row][col] = false;
      }
    }

    return count;
  }
}

module.exports = countQueensFrom;
