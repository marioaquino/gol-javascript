describe("Grid initialization", function() {
  it('should start empty', function() {
    expect(new gol.Grid().rows()).toEqual(0);
    expect(new gol.Grid().columns()).toEqual(0);
  });

  it("can be initialized with rows and columns", function() {
    var g = new gol.Grid(4, 4);
    expect(g.rows()).toEqual(4);
    expect(g.columns()).toEqual(4);
  });

  function setAndExpect(r, c) {
    var g = new gol.Grid();
    g.setRows(r);
    g.setColumns(c);
    expect(g.rows()).toEqual(r);
    expect(g.columns()).toEqual(c);
  }

  it("should be resizable", function() {
    setAndExpect(6, 9);
    setAndExpect(4, 3);
  });

});

function loop(g, lam) {
  for(row = 0; row < g.rows(); row++) {
    for(col = 0; col < g.columns(); col++) {
      lam(row, col);
    }
  } 
}


describe("Grids cell knowledge", function() {
  var g;
  beforeEach(function() {
    g = new gol.Grid(5, 4);
  });

  it("should start off with cells at each coord", function() {
    loop(g, function(row, col) {
      expect(g.cellAt(row, col)).toBeDefined();
    });
  });

  it("should have all dead cells initially", function() {
    loop(g, function(row, col) {
      expect(g.cellAt(row,col).alive()).toBeFalsy();
    });
  });

  describe("Seeding the grid", function() {
    it("should allow you to seed the grid with live cells", function() {
      g.seed([
             [0, 0],
             [1, 1],
             [2, 2],
             [3, 3]
      ]);

      loop(g, function(row, col) {
        if(row === col) {
          expect(g.cellAt(row, col).alive()).toBeTruthy();
        } else {
          expect(g.cellAt(row, col).alive()).toBeFalsy();
        }
      });
    });
  });

});

describe("Evolving the grid", function() {
  var g;
  beforeEach(function() {
    g = new gol.Grid(4, 4);
  });

  it("should have all dead cells after evolving from all dead cells", function() {
    g.step();
    loop(g, function(row, col) {
      expect(g.cellAt(row, col).alive()).toBeFalsy();
    });
  });

  it("should have all dead cells after evolving from one live cell", function() {
    g.seed([[3, 3]]);
    g.step();
    loop(g, function(row, col) {
      expect(g.cellAt(row, col).alive()).toBeFalsy();
    });
  });
  
  it("should have all dead cells after evolving from two live cells", function() {
    g.seed([[2, 2], [2, 3]]);
    g.step();
    loop(g, function(row, col) {
      expect(g.cellAt(row, col).alive()).toBeFalsy();
    });
  });
  
  it("should have live cells in the corners after evolving from all live cells", function() {
    var seed = [], r, c, alive;
    loop(g, function(r, c) {
      seed.push([r, c]);
    });

    g.seed(seed);

    g.step();

    loop(g, function(row, col) {
      alive = g.cellAt(row, col).alive();
      if ((row === 0 || row === 3) && (col === 0 || col === 3)) { //0,0 0,3 3,0 3,3 corners
        expect(alive).toBeTruthy();
      } else {
        expect(alive).toBeFalsy();
      }
    });
  });
  
});


