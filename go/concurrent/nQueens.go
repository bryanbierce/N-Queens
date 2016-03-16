package nQueens

//Count will take a board matrix and return a solution count
func Count(n int) int {
	board := makeBoard(n)
	allCols := makeCols(n)
	initRow := 0
	initCount := 0

	return search(board, initRow, allCols, initCount)
}

// makeBoard constructs an emptry NxN matrix
func makeBoard(n int) (board [][]int) {
	board = make([][]int, n)
	for i := 0; i < n; i++ {
		board[i] = make([]int, n)
	}
	return
}

func makeCols(n int) (cols []int) {
	cols = make([]int, n)
	for i := 0; i < n; i++ {
		cols[i] = i
	}

	return
}

func hasMajorDiagonalConflitctAt(board [][]int, row, col int) bool {
	for row >= 0 && col >= 0 {
		if board[row][col] != 0 {
			return true
		}
		row--
		col--
	}

	return false
}

func hasMinorDiagonalConflictAt(board [][]int, row, col int) bool {
	for row >= 0 && col < len(board) {
		if board[row][col] != 0 {
			return true
		}
		row--
		col++
	}

	return false
}

func filterCols(cols []int, col int) (newCols []int) {
	for _, v := range cols {
		if v != col {
			newCols = append(newCols, v)
		}
	}
	return
}

func search(board [][]int, row int, cols []int, count int) int {
	if len(cols) == 0 {
		return count + 1
	}

	for _, col := range cols {
		if !hasMajorDiagonalConflitctAt(board, row, col) && !hasMinorDiagonalConflictAt(board, row, col) {
			board[row][col] = 1
			count = search(board, row+1, filterCols(cols, col), count)
			board[row][col] = 0
		}
	}

	return count
}
