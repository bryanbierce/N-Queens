import time

def nQueens(n):
    board, cols = buildBoardAndCols(n)
    return search(board, cols)

def buildBoardAndCols(n):
    return [[0 for i in range(n)] for i in range(n)], [i for i in range(n)]

def search(board, cols, row = 0, sum = 0):
    if len(cols) is 0: return 1
    for col in cols:
        if not hasMajorDiagonalConflict(board, row, col) and not hasMinorDiagonalConflict(board, row, col):
            board[row][col] = 1
            sum += search(board, [i for i in cols if i is not col], row+1)
            board[row][col] = 0
    return sum

def hasMajorDiagonalConflict(board, r, c):
    r, c = r-1, c-1
    while r >= 0 and c >= 0:
        if board[r][c] is 1: return True
        r, c = r-1, c-1
    return False

def hasMinorDiagonalConflict(board, r, c):
    r, c = r-1, c+1
    while r >= 0 and c < len(board):
        if board[r][c] is 1:
            return True
        r, c = r-1, c+1
    return False

start = time.time()
nQueens(13)
print(time.time() - start)
