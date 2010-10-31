var gol = gol || {};

gol.Cell = function(myIndex, grid){

  var neighbors = function() {
    var cols = grid.columns();
    var rows = grid.rows();
    var upRow = myIndex - cols;
    var downRow = myIndex + cols;
    var myColumn = myIndex % cols;
    var bounds = [upRow   - 1, upRow,   upRow   + 1,
                  myIndex - 1, /* me */ myIndex + 1,
                  downRow - 1, downRow, downRow + 1].filter(function(index) {
                    //in negative space?
                    if (index < 0) {
                      return false;
                    }

                    //is x coord outside the grid?
                    var row = Math.floor(index / cols);
                    if (row < 0 || row >= rows) {
                      return false;
                    }

                    var column = index % cols;
                    //More than one column away from each other
                    if (Math.abs(column - myColumn) > 1) {
                      return false;
                    }

                    return true;
                  });

    return bounds.map(function(neighborIndex) {
      return grid[neighborIndex];
    });
  };

  var status = false;

  this.alive = function() {
    return status;
  };

  this.evolve = function() {
    var liveNeighborsTotal = neighbors().reduce(function(total, cell) {
      return total + (cell.alive() ? 1 : 0);
    }, 0);
    var that = this;
    return function() {
      if (liveNeighborsTotal === 3) {
        that.revive();
      } else {
        that.kill();
      }
    };
  };
  
  this.revive = function() {
    status = true;
  };
  
  this.kill = function() {
    status = false;
  };
};
