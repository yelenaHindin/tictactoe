      var gameField = new GameField.GameField();

      window.onload = function()  {
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


        field.addEventListener("click", function(evt) {
          var cellId = evt.srcElement.id;
          var x = parseInt(cellId[4]);
          var y = parseInt(cellId[5]);
          //console.log("x = ", x, "y = ", y);

          if (gameField.get(x, y) == GameField.Values.EMPTY) {
            gameField.set(GameField.Values.O, x, y);
            winner = gameField.gameOver();
            if (winner !== undefined) {
                gameAlerts.innerHTML = "Player " + winner.toString() + " won";
               gameField = new GameField.GameField();
               return;
            }

            var step = gameField.computeStep();
            gameField.set(GameField.Values.X, step[0], step[1]);
            winner = gameField.gameOver();
            if (winner !== undefined) {
                gameAlerts.innerHTML = "Player " + winner.toString() + " won";
               gameField = new GameField.GameField();
               return;
            }
          }
        });
      }
