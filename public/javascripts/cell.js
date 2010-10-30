var gol = gol || {};

gol.Cell = function(){
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
