package nQueens

import "testing"

// func TestMakeBoard(t *testing.T) {
// 	testBoard := make([][]int, 5)
// 	for i := 0; i < 5; i++ {
// 		testBoard[i] = make([]int, 5)
// 	}
// 	cases := []struct {
// 		n    int
// 		want [][]int
// 	}{
// 		{5, testBoard},
// 	}
// 	for _, c := range cases {
// 		got := makeBoard(c.n)
// 		if len(got) != 5 {
// 			println("bad board ", got)
// 			t.Errorf("makeBoard(%d) not valid output", c.n)
// 		} else {
// 			println("Board is len 5")
// 		}
//
// 	}
// }

func TestCount(t *testing.T) {
	cases := []struct {
		n, want int
	}{
		// {1, 1},
		// {2, 0},
		// {3, 0},
		// {4, 2},
		// {5, 10},
		// {6, 4},
		// {7, 40},
		// {8, 92},
		// {9, 352},
		// {10, 724},
		// {11, 2680},
		// {12, 14200},
		// {13, 73712},
		// {14, 365596},
		// {15, 2279184},
		{16, 14772512},
		// {17, 95815104},
		// {18, 666090624},
	}
	for _, c := range cases {
		got := Count(c.n)
		if got != c.want {
			t.Errorf("Count(%d) == %d, want %d", c.n, got, c.want)
		}
	}
}
