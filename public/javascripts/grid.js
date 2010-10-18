var gol = gol || {};

gol.Grid = function(r, c) {
  r = r || 0;
  c = c || 0;

  var grid = new Array(r);

  var each = function(lam) {
    for(row = 0; row < r; row++) {
      if (!grid[row]) {
        grid[row] = new Array(c);
      }

      for(col = 0; col < c; col++) {
        if(!grid[row][col]) {
          grid[row][col] = new gol.Cell();
        }

        if(lam) {
          lam(row, col);
        }
      }
    }
  };

  each(); //Initialize the grid

  this.rows = function(){ 
    return grid.length;
  };

  this.columns = function(){ 
    return grid.length === 0 ? 0 : grid[0].length;
  };

  this.cellAt = function(row, col){
    return grid[row][col];
  };

  this.seed = function(liveCells) {
    for(i = 0; i < liveCells.length; i++) {
      var coord = liveCells[i];
      this.cellAt(coord[0], coord[1]).revive();
    }
  };
};

