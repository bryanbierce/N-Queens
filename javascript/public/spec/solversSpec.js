describe('solvers', function() {

  describe('countNQueensSolutions()', function() {

    it('finds the number of valid solutions for n of 0-8', function() {
      // var board = makeEmptyMatrix(5);
      // var startTime = Date.now();
      // var solutions = plainCountNQueens(board);
      // console.log('It took ', Date.now() - startTime, ' to find ', solutions, ' solutions.');




      /*               Worker w/ SubRoutines       */

      var countWorker = new Worker('src/countNQueens-worker.js');

      var startTime = Date.now();
      countWorker.postMessage({n: 8, type: 'start'});

      countWorker.onmessage = function(e) {
        if(e.data.solutionCount !== undefined){
          console.log(Date.now() - startTime, 'ms for solution');
        }
      }

    });

  });

});
