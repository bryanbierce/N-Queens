// polyfill from https://github.com/dmihal/Subworkers
importScripts('subworkers.js');

var solutionCount = 0;
var stable;
var horses;

onmessage = function(e) {
  if(e.data.type === 'start') startSubRoutines(e.data.n);
};

function startSubRoutines(n){
  var board = makeEmptyMatrix(n);
  var cols = makeColsArray(n);
  stable = cols.map(function(){ return false; });
  horses = stable.map(function(){ return new Worker('./recursiveWorker.js'); });

  for(var i = 0; i < cols.length; i++) {
    var col = cols[i];
    board[0][col] = !board[0][col];
    horses[i].onmessage = receiveMessage;
    horses[i].postMessage({
      board: board,
      cols: cols.filter(function(item, index){ return index !== i; }),
      row: 1,
      horse: i
    });
    board[0][col] = !board[0][col];
  }
}


function receiveMessage(e) {
  switch(e.data.type) {
    case 'count':
      countSolution();
      break;
    case 'stable':
      stableHorse(e.data.horse);
      break;
    default:
      console.log('I didn\'t prepare for ', data.type);
  }
}

function countSolution() {
  solutionCount++;
}

function stableHorse(horse) {
  stable[horse] = 'returned';
  if(checkStable()) {
    postMessage({ solutionCount: solutionCount });
    self.close();
  }
}

function checkStable() {
  return stable.reduce(function(memo, horse) {
    if(horse !== 'returned') {
      memo = false;
    }
    return memo;
  }, true);
}

function makeColsArray(n) {
  var arr = [];
  for(var i = 0; i < n; i++) {
    arr.push(i);
  }
  return arr;
};

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
