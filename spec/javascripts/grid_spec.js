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
});

describe("Grids cell knowledge", function() {
  var g;
  beforeEach(function() {
    g = new gol.Grid(5, 4);
  });

  var loop = function(lam) {
    for(row = 0; row < g.rows(); row++) {
      for(col = 0; col < g.columns(); col++) {
        lam(row, col);
      }
    } 
  }

  it("should start off with cells at each coord", function() {
    loop(function(row, col) {
      expect(g.cellAt(row, col)).toBeDefined();
    });
  });

  it("should have all dead cells initially", function() {
    loop(function(row, col) {
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

      loop(function(row, col) {
        if(row === col) {
          expect(g.cellAt(row, col).alive()).toBeTruthy();
        } else {
          expect(g.cellAt(row, col).alive()).toBeFalsy();
        }
      });
    });
  });
});


