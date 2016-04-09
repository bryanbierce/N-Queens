package nQueens

//Count will take a board matrix and return a solution count
func Count(n int) int {
	solutionCount := 0
	doneCh := make(chan bool)
	countCh := make(chan int)
	for i := 0; i < n; i++ {
		go pathSupervisor(makeBoardWithPiece(n, i), 1, makeColsWithPiece(n, i), doneCh, countCh)
	}
	for n > 0 {
		select {
		case _ = <-countCh:
			solutionCount++
		case _ = <-doneCh:
			n--
		}
	}

	return solutionCount
}

// makeBoard constructs an NxN matrix with 1 piece in row 0
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

func filterCols(cols []int, col int) []int {
	newCols := make([]int, len(cols)-1)
	for i, v := range cols {
		if v != col {
			newCols[i] = v
		}
	}
	return newCols
}

func pathSupervisor(board [][]int, row int, cols []int, doneCh chan bool, countCh chan int) {
	search(board, row, cols, countCh)
	doneCh <- true
}

func search(board [][]int, row int, cols []int, countCh chan int) {
	if len(cols) == 0 {
		countCh <- 1
		return
	}

	for _, col := range cols {
		if !hasMajorDiagonalConflitctAt(board, row, col) && !hasMinorDiagonalConflictAt(board, row, col) {
			board[row][col] = 1
			search(board, row+1, filterCols(cols, col), countCh)
			board[row][col] = 0
		}
	}

	return
}

// For the speed effect test
func copyBoard(oldBoard [][]int) (newBoard [][]int) {
	length := len(oldBoard)
	newBoard = make([][]int, length)
	for i := 0; i < length; i++ {
		newBoard[i] = make([]int, length)
		for j := 0; j < length; j++ {
			newBoard[i][j] = oldBoard[i][j]
		}
	}
	return
}
