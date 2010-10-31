describe("Cells", function() {
  it("calculate their next state based on their neighbors", function() {
    var mock = new gol.Cell();
    spyOn(mock, 'alive').andReturn(false);
    var grid = [mock, mock, mock, 
                mock, null, mock, 
                mock, mock, mock];
    grid.columns = function() {
      return 3;
    };
    grid.rows = function() {
      return 3;
    };

    var cell = new gol.Cell(4, grid);

    cell.evolve();

    expect(mock.alive.callCount).toEqual(8);
    expect(cell.alive()).toBeFalsy();
  });
  
});  

