package nQueens

//Count will take a board matrix and return a solution count
func Count(n int) int {
	solutionCount := 0
	done := make(chan bool)
	for i := 0; i < n; i++ {
		go pathSupervisor(makeBoardWithPiece(n, i), 1, makeColsWithPiece(n, i), &solutionCount, done)
	}
	for n > 0 {
		<-done
		n--
	}

	return solutionCount
}

// makeBoard constructs an emptry NxN matrix
func makeBoard(n int) (board [][]int) {
	board = make([][]int, n)
	for i := 0; i < n; i++ {
		board[i] = make([]int, n)
	}

	return
}

// makeBoard constructs an emptry NxN matrix
func makeBoardWithPiece(n int, first int) (board [][]int) {
	board = make([][]int, n)
	for i := 0; i < n; i++ {
		board[i] = make([]int, n)
	}
	board[0][first] = 1
	return
}

func makeColsWithPiece(n int, first int) (cols []int) {
	for i := 0; i < n; i++ {
		if i != first {
			cols = append(cols, i)
		}
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

func pathSupervisor(board [][]int, row int, cols []int, count *int, done chan bool) {
	search(board, row, cols, count)
	done <- true
}

func search(board [][]int, row int, cols []int, count *int) {
	if len(cols) == 0 {
		*count++
		return
	}

	for _, col := range cols {
		if !hasMajorDiagonalConflitctAt(board, row, col) && !hasMinorDiagonalConflictAt(board, row, col) {
			board[row][col] = 1
			search(board, row+1, filterCols(cols, col), count)
			board[row][col] = 0
		}
	}

	return
}
