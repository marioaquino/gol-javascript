var gol = gol || {};

gol.Grid = function(r, c) {
  r = r || 0;
  c = c || 0;

  var grid = new Array(r);

  var resize = function(r, c) {
    grid.length = r;
    for(row = 0; row < r; row++) {
      grid[row] = grid[row] || new Array(c);
      grid[row].length = c;

      for(col = 0; col < c; col++) {
        grid[row][col] = grid[row][col] || new gol.Cell();
      }
    }
  };

  var each = function(lam) {
    for(row = 0; row < r; row++) {
      for(col = 0; col < c; col++) {
        if(lam) {
          lam(row, col, grid[row][col]);
        }
      }
    }
  };

  resize(r, c); //Initialize the grid

  this.rows = function(){ 
    return grid.length;
  };

  this.setRows = function(rowCount) {
    resize(rowCount, this.columns());
  };

  this.columns = function(){ 
    return grid.length === 0 ? 0 : grid[0].length;
  };

  this.setColumns = function(columnCount) {
    resize(this.rows(), columnCount);
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

  this.step = function() {
    each(function(row, col, cell) {
      cell.kill();
    });
  };
};

