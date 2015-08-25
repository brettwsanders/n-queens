/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  var rooksGraph = new Graph();

  for (var row = 0; row < n; row++) {
    for (var column = 0; column < n; column++) {
      var positionNode = new Node([row, column]);
      rooksGraph.nodes.push(positionNode);
    };
  };

  rooksGraph.nodes.forEach(function(node){
    var nodeColumn = node.position[1];
    var nodeRow = node.position[0];
    // debugger;
    for (var nodeIndex = 0; nodeIndex < rooksGraph.nodes.length; nodeIndex++) {
      var currentComparison = rooksGraph.nodes[nodeIndex];
      // debugger;
      if ((currentComparison.position[0] === nodeRow || currentComparison.position[1] === nodeColumn) && !(nodeRow !== currentComparison.position[0] && nodeColumn !== currentComparison.position[1])) {
        node.edges.push(currentComparison);
      } else if (nodeRow === currentComparison.position[0] && nodeColumn === currentComparison.position[1]) {
        /* Do nothing! */
      } else {
        node.safeEdges.push(currentComparison);
      }
    };
  });

  var allAnswers = []
  /* Iteration Traversal */
  for (var i = 0; i < rooksGraph.nodes.length; i++) {

    debugger;

    var allAnswersFromThisstartingNode = [];

    var recursiveTraversal = function(node, placedPositions, invalidEdges) {
    

      /* Base Case */
      if (placedPositions.length === n) {
        allAnswersFromThisstartingNode.push(placedPositions);
        // placedPositions = [];
        return;
      }
      placedPositions.push(node);

      /* If no where to go */
      var placeToGo = false;
      for (var k = 0; k < node.safeEdges.length; k++) {
        if (invalidEdges[JSON.stringify(node.safeEdges[k].position)] === undefined) {
          placeToGo = true;
        }
      };

      if (placeToGo == false) {
        return false;
      };

      node.edges.forEach(function(edge) {
        if (invalidEdges.hasOwnProperty(JSON.stringify(edge.position))) {
          /* Don't add */
        } else {
          invalidEdges[JSON.stringify(edge.position)] = "invalid";
        }
      })
      

      node.safeEdges.forEach(function(safeEdge) {
        var isSafe = false;
  
        if (invalidEdges[JSON.stringify(safeEdge.position)] === undefined) {
          isSafe = true;
        }
        
        // debugger;
        if (isSafe) {
          /* Recurse */
          recursiveTraversal(safeEdge, placedPositions, invalidEdges);
        }
        
      });
    }


    // debugger;
    recursiveTraversal(rooksGraph.nodes[i], [], {});
    allAnswers = allAnswers.concat(allAnswersFromThisstartingNode);
  };

  /* Build a board from all answers */

  console.log(allAnswers);
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

var Node = function(position) {
  this.position = position;
  this.edges = [];
  this.safeEdges = [];

  this.setEdges = function(passedEdges) {
    var indexToSplice;
    var that = this;
    var copyOfPassedEdges = passedEdges.slice();
    copyOfPassedEdges.forEach(function(copiedEdge, indexOfCopy) {
        if (JSON.stringify(copiedEdge.position) === JSON.stringify(that.position)) {
          indexToSplice = indexOfCopy;
        }
    });
    copyOfPassedEdges.splice(indexToSplice, 1);
    this.edges.concat(copyOfPassedEdges);
  };
};

var Graph = function() {
  this.nodes = [];
  this.size = 0;
  this.add = function(position) {
    var node = new Node(position);
    this.nodes.push(node);
    this.size++;
  };
};

function testingFunction() {
  findNRooksSolution(3);
}

testingFunction();


