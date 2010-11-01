describe("Cell", function() {
  var dead, alive, cell;
  var grid = [];
  grid.columns = function() {
    return 3;
  };
  grid.rows = function() {
    return 3;
  };

  beforeEach(function() {
    dead = new gol.Cell();
    spyOn(dead, 'alive').andReturn(false);

    alive = new gol.Cell();
    spyOn(alive, 'alive').andReturn(true);

    cell = new gol.Cell(4, grid);
  });

  afterEach(function() { 
    grid.length = 0; 
  });

  function evolveAndAssert(aliveBefore, aliveAfter) {
    var nextState = cell.evolve();

    expect(dead.alive.callCount + alive.alive.callCount).toEqual(8);
    expect(cell.alive()).toEqual(aliveBefore);

    nextState();

    expect(cell.alive()).toEqual(aliveAfter);
  }

  it("remains dead if all neighbors are dead", function() {
    grid.push(dead, dead, dead, 
              dead, null, dead, 
              dead, dead, dead);

    evolveAndAssert(false, false);
  });

  it("comes to life if there are three live neighbors", function() {
    grid.push(alive, alive, alive, 
              dead,  null,  dead, 
              dead,  dead,  dead);

    evolveAndAssert(false, true);
  });
});

