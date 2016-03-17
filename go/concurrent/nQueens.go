package nQueens

//Count will take a board matrix and return a solution count
func Count(n int) int {
	var i int
	routineCount := 0
	solutionCount := 0
	routineCh := make(chan int)
	solutionCh := make(chan int)
	routineCount++
	go search(makeBoard(n), 0, makeCols(n), routineCh, solutionCh)
	for routineCount > 0 {
		select {
		case _ = <-solutionCh:
			solutionCount++
		case i = <-routineCh:
			routineCount = routineCount + i
		}
	}

	return solutionCount
}

// makeBoard constructs an NxN matrix with 1 piece in row 0
func makeBoard(n int) (board [][]int) {
	board = make([][]int, n)
	for i := 0; i < n; i++ {
		board[i] = make([]int, n)
	}
	return
}

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

// func pathSupervisor(board [][]int, row int, cols []int, routineCh chan bool, solutionCh chan int) {
// 	search(board, row, cols, solutionCh)
// 	routineCh <- true
// }

func search(board [][]int, row int, cols []int, routineCh, solutionCh chan int) {
	if len(cols) == 0 {
		solutionCh <- 1
	} else {
		for _, col := range cols {
			if !hasMajorDiagonalConflitctAt(board, row, col) && !hasMinorDiagonalConflictAt(board, row, col) {
				board[row][col] = 1
				routineCh <- 1
				go search(copyBoard(board), row+1, filterCols(cols, col), routineCh, solutionCh)
				board[row][col] = 0
			}
		}
	}

	routineCh <- -1
}
