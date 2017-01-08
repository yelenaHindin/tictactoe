  var gameField = new GameField.GameField();
  
  
  window.onload = function()  {
    document.getElementById("clearFieldBtn").addEventListener('click', function(){
        gameField.clearField();
        gameAlerts.innerHTML = "";
        document.getElementById("clearFieldBtn").disabled = true;
    }); 
      
    document.getElementById("clearFieldBtn").disabled = true;
      
    gameField.addListener(function(v, x, y) {
       var cellId = "cell" + x + y;
       var cell = document.getElementById(cellId);
       switch (v) {
       case GameField.Values.EMPTY:
          cell.innerHTML = ' ';
          break;
       case GameField.Values.X:
          cell.innerHTML = "<img src='../img/img-x.png' id='img-x'/>";
          break;
       case GameField.Values.O:
          cell.innerHTML = "<img src='../img/img-o.png' id='img-o'/>";
          break;
       }
    }, this);

      function testEndGame(winner){
         if(winner === GameField.Values.EMPTY){
            gameAlerts.innerHTML = "Teco";              
        } else if (winner !== undefined) {
            gameAlerts.innerHTML = "Player " + winner.toString() + " won";
        } else {
            return;
        }
          document.getElementById("clearFieldBtn").disabled = false;
      }
      
    field.addEventListener("click", function(evt) {
      var cellId = evt.srcElement.id;
      var x = parseInt(cellId[4]);
      var y = parseInt(cellId[5]);
      //console.log("x = ", x, "y = ", y);

      if (gameField.get(x, y) == GameField.Values.EMPTY) {
        gameField.set(GameField.Values.O, x, y);
        winner = gameField.gameOver();
       testEndGame(winner);
          
        if(winner === undefined){
            var step = gameField.computeStep();
            gameField.set(GameField.Values.X, step[0], step[1]);
            winner = gameField.gameOver();
           testEndGame(winner);
        }
      }
    });
  }
