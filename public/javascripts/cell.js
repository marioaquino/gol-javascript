var gol = gol || {};

(function() {

	  console.log('creating neighbors function');
	  function neighbors() {
	    var cols = this.grid.columns();
		var self = this;
	    var rows = this.grid.rows();
	    var upRow = this.myIndex - cols;
	    var downRow = this.myIndex + cols;
	    var myColumn = this.myIndex % cols;
	    var bounds = [upRow   - 1, upRow,   upRow   + 1,
	                  this.myIndex - 1, /* me */ this.myIndex + 1,
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
	      return self.grid[neighborIndex];
	    });
	  };


	console.log('creating gol.Cell function');
	gol.Cell = function(myIndex, grid){
         this.myIndex = myIndex;
         this.grid = grid;
         this.status = false;
	};

	console.log('creating cell.alive function');
	gol.Cell.prototype.alive = function() {
	  return this.status;
	};

	console.log('creating cell.evolve function');
	gol.Cell.prototype.evolve = function() {
	  var liveNeighborsTotal = neighbors.call(this).reduce(function(total, cell) {
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

	console.log('creating cell.revive function');
	gol.Cell.prototype.revive = function() {
	  this.status = true;
	};

	console.log('creating cell.kill function');
	gol.Cell.prototype.kill = function() {
	  this.status = false;
	};
	
}());

