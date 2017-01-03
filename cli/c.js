var GameField = require('../src/GameField.js');
var readline = require('readline');


var gameField = new GameField.GameField();

function printField(field)
{
    for (var y = 0; y < 3; y++) {
        for (var x = 0; x < 3; x++) {
            switch (field.get(x, y)) {
            case GameField.Values.EMPTY:
                process.stdout.write('.');
                break;
            case GameField.Values.X:
                process.stdout.write('X');
                break;
            case GameField.Values.O:
                process.stdout.write('O');
                break;
            default:
                process.stdout.write('?');
                break;
            }
        }
        process.stdout.write("\n");
    }
}


var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

printField(gameField);
rl.setPrompt("ttt> ");
rl.prompt();



rl.on('line', function(line) {
    var splitInput = line.split(" ");
    if (splitInput.length != 3) {
        console.log("Unexpected argument");
        printField(gameField);
        rl.prompt();
        return;
    }

    if (isNaN(splitInput[1]) || isNaN(splitInput[2])) {
        console.log("Invalid integer");
        printField(gameField);
        rl.prompt();
        return;
    }

    var x = parseInt(splitInput[1]);
    var y = parseInt(splitInput[2]);

    var winner = undefined;

    switch (splitInput[0]) {
    case 'O':
        gameField.set(GameField.Values.O, x, y);
        winner = gameField.gameOver();
        if (winner !== undefined) {
            console.log(winner.toString(), " won");
            gameField = new GameField.GameField();
            break;
        }
        var step = gameField.computeStep();
        gameField.set(GameField.Values.X, step[0], step[1]);
        winner = gameField.gameOver();
        if (winner !== undefined) {
            console.log(winner.toString(), " won");
            gameField = new GameField.GameField();
            break;
        }
        break;
    case 'C':
        gameField = new GameField.GameField();
        break;
    default:
        console.log("Unknown command");
        break;
    }
    printField(gameField);
    rl.prompt();
});
