var gol = gol || {};

gol.Cell = function(i, g){
  var index = i;
  var grid = g;
  var status = false;
  this.alive = function() {
    return status;
  }
  
  this.revive = function() {
    status = true;
  }

  this.kill = function() {
    status = false;
  }
}
