var gol = gol || {};

gol.Grid = function(r, c) {
  r = r || 0;
  c = c || 0;

  var cells = [];

  var that = this;

  cells.columns = function() { //hack?
    return that.columns();
  };

  cells.rows = function() {
    return that.rows();
  };

  var resize = function(rowCount, colCount) {
    cells.length = rowCount * colCount;
    for(var i = 0; i < cells.length; i++) {
      cells[i] = cells[i] || new gol.Cell(i, cells);
    }
  };

  var coordToIndex = function(x, y, columnCount) {
    return (columnCount * x) + y;
  };

  resize(r, c); //Initialize the cells

  this.rows = function(){ 
    return r;
  };

  this.setRows = function(rowCount) {
    r = rowCount;
    resize(rowCount, this.columns());
  };

  this.columns = function(){ 
    return c;
  };

  this.setColumns = function(columnCount) {
    c = columnCount;
    resize(this.rows(), columnCount);
  };

  this.cellAt = function(row, col) {
    var index = coordToIndex(row, col, this.columns());
    return cells[index];
  };

  this.seed = function(liveCells) {
    var that = this;
    liveCells.forEach(function(coord) {
      that.cellAt(coord[0], coord[1]).revive();
    });
  };

  this.step = function() {
    cells.map(function(cell) {
      return cell.evolve();
    }).map(function(nextState) {
      nextState.call();
    });
  };
};

