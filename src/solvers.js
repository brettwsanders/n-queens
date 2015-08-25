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
  // debugger;
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

  /* Every possible board */
  var allAnswers = [];


  var recursiveTraversal = function(node, placedPositions, invalidEdges) {
      var correctBoardAtThisNode = placedPositions.slice();
      var allInvalidEdges = {};
      for (var key in invalidEdges) {
        allInvalidEdges[key] = invalidEdges[key];
      }
      /* Base Case */
      if (correctBoardAtThisNode.length === n) {
        var matchingMax = 0;
        var matchingPositions = 0;
        for (var u = 0; u < allAnswers.length; u++) {
          var correctBoard = allAnswers[u];
          for (var m = 0; m < n; m++) {
            for (var p = 0; p < n; p++) {
              if (JSON.stringify(correctBoardAtThisNode[p].position) === JSON.stringify(correctBoard[m].position)) {
                // debugger;
                matchingPositions++;
              }
            }
          }
          matchingMax = matchingPositions > matchingMax ? matchingPositions : matchingMax;
          matchingPositions = 0;
        }
        if (matchingMax < correctBoardAtThisNode.length) {
          // debugger;
          allAnswers.push(correctBoardAtThisNode);
          return;
          // recursiveTraversal(rooksGraph.nodes[i], [], {});
        }

        // correctBoardAtThisNode = [];
      } else {
        correctBoardAtThisNode.push(node);
        /* If no where to go */
        var placeToGo = false;
          for (var k = 0; k < node.safeEdges.length; k++) {
            if (allInvalidEdges[JSON.stringify(node.safeEdges[k].position)] === undefined) {
              placeToGo = true;
            }
          };

          if (placeToGo == false) {
            recursiveTraversal(node, correctBoardAtThisNode, allInvalidEdges);
          } else {
            node.edges.forEach(function(edge) {
              if (allInvalidEdges.hasOwnProperty(JSON.stringify(edge.position))) {
                /* Don't add */
              } else {
                allInvalidEdges[JSON.stringify(edge.position)] = "invalid";
              }
            })
          

            node.safeEdges.forEach(function(safeEdge) {
              var isSafe = false;
        
              if (allInvalidEdges[JSON.stringify(safeEdge.position)] === undefined) {
                isSafe = true;
              }
              
              // debugger;
              if (isSafe) {
                /* Recurse */
                recursiveTraversal(safeEdge, correctBoardAtThisNode, allInvalidEdges);
                
              }
              
            });

          }

        }
      
    }

  /* Iteration Traversal */
  for (var i = 0; i < rooksGraph.nodes.length; i++) {

    // debugger;

    
    


    // debugger;
    recursiveTraversal(rooksGraph.nodes[i], [], {});
    
  };

  /* Build a board from all answers */
  var formattedAnswers = [];
  for (var ty = 0; ty < allAnswers.length; ty++) {
    var formattedAnswer = [];
    var oneAnswer = allAnswers[ty];
    for (var oi = 0; oi < oneAnswer.length; oi++) {
      formattedAnswer.push(JSON.stringify(oneAnswer[oi].position));
    };
    formattedAnswers.push(formattedAnswer);
  };

  console.log(formattedAnswers);
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
  var queensGraph = new Graph();
  // debugger;
  for (var row = 0; row < n; row++) {
    for (var column = 0; column < n; column++) {
      var positionNode = new Node([row, column]);
      queensGraph.nodes.push(positionNode);
    };
  };

  queensGraph.nodes.forEach(function(node){
    var nodeColumn = node.position[1];
    var nodeRow = node.position[0];
    // debugger;
    for (var nodeIndex = 0; nodeIndex < queensGraph.nodes.length; nodeIndex++) {
      var currentComparison = queensGraph.nodes[nodeIndex];
      // debugger;
      var currentCompRow = currentComparison.position[0];
      var currentCompColumn = currentComparison.position[1];
      /* Diagonals */
      var nodeMajor = nodeColumn - nodeRow + n - 1;
      var currentMajor = currentCompColumn - currentCompRow + n - 1;
      var nodeMinor = nodeRow + nodeColumn;
      var currentMinor = currentCompRow + currentCompColumn;
      // debugger;
      if ( (nodeRow === currentCompRow && nodeColumn === currentCompColumn) || currentCompRow === nodeRow || currentCompColumn === nodeColumn || currentMajor === nodeMajor || currentMinor === nodeMinor ) {
        node.edges.push(currentComparison);
      } else {
        node.safeEdges.push(currentComparison);
      }
    };
  });

  /* Every possible board */
  var allAnswers = [];


  var recursiveTraversal = function(node, placedPositions, invalidEdges) {
      var correctBoardAtThisNode = placedPositions.slice();
      var allInvalidEdges = {};
      for (var key in invalidEdges) {
        allInvalidEdges[key] = invalidEdges[key];
      }
      /* Base Case */
      var keyOfLastPosition = correctBoardAtThisNode.length - 1 >= 0 ? correctBoardAtThisNode.length - 1 : undefined;
      var lastPositionPlaced = false;
      if (keyOfLastPosition !== undefined) {
         lastPositionPlaced = correctBoardAtThisNode[keyOfLastPosition].position;
      }
      

      if (correctBoardAtThisNode.length === n) {
        var matchingMax = 0;
        var matchingPositions = 0;
        for (var u = 0; u < allAnswers.length; u++) {
          var aSingleAnswerFromAllAnswers = allAnswers[u];
          for (var m = 0; m < n; m++) {
            for (var p = 0; p < n; p++) {
              if (JSON.stringify(correctBoardAtThisNode[p].position) === JSON.stringify(aSingleAnswerFromAllAnswers[m].position)) {
                // debugger;
                matchingPositions++;
              }
            }
          }
          matchingMax = matchingPositions > matchingMax ? matchingPositions : matchingMax;
          matchingPositions = 0;
        }
        if (matchingMax < correctBoardAtThisNode.length) {
          // debugger;
          allAnswers.push(correctBoardAtThisNode);
          return;
          // recursiveTraversal(queensGraph.nodes[i], [], {});
        }

        // correctBoardAtThisNode = [];
      } else if (JSON.stringify(node.position) === JSON.stringify(lastPositionPlaced)){
        return false;
      } else {
        correctBoardAtThisNode.push(node);
        allInvalidEdges[JSON.stringify(node.position)] = "invalid";
        /* If no where to go */
        var placeToGo = false;
          for (var k = 0; k < node.safeEdges.length; k++) {
            if (allInvalidEdges[JSON.stringify(node.safeEdges[k].position)] !== "invalid") {
              placeToGo = true;
            }
          };

          if (placeToGo == false) {
            recursiveTraversal(node, correctBoardAtThisNode, allInvalidEdges);
          } else {
            node.edges.forEach(function(edge) {
              if (allInvalidEdges.hasOwnProperty(JSON.stringify(edge.position))) {
                /* Don't add */
              } else {
                allInvalidEdges[JSON.stringify(edge.position)] = "invalid";
              }
            })
          

            node.safeEdges.forEach(function(safeEdge) {
              var isSafe = false;
        
              if (allInvalidEdges[JSON.stringify(safeEdge.position)] !== "invalid") {
                isSafe = true;
              }
              
              // debugger;
              if (isSafe) {
                /* Recurse */
                recursiveTraversal(safeEdge, correctBoardAtThisNode, allInvalidEdges);
                
              }
              
            });

          }

        }
      
    }

  /* Iteration Traversal */
  for (var i = 0; i < queensGraph.nodes.length; i++) {
    recursiveTraversal(queensGraph.nodes[i], [], {});
  };

  /* Build a board from all answers */
  var formattedAnswers = [];
  for (var ty = 0; ty < allAnswers.length; ty++) {
    var formattedAnswer = [];
    var oneAnswer = allAnswers[ty];
    for (var oi = 0; oi < oneAnswer.length; oi++) {
      formattedAnswer.push(JSON.stringify(oneAnswer[oi].position));
    };
    formattedAnswers.push(formattedAnswer);
  };

  console.log(formattedAnswers);
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution;
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

};

var Graph = function() {
  this.nodes = [];
  this.add = function(position) {
    var node = new Node(position);
    this.nodes.push(node);
    this.size++;
  };
};

function testingFunction() {
  // findNRooksSolution(4);
  findNQueensSolution(7);
}

testingFunction();


