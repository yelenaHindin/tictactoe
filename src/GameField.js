var GameField = {}

GameField.Values = {
    EMPTY: 1,
    X: 2,
    O: 3
};

GameField.GameField = function() {
    this.field = [];
    this.field[0] = [ GameField.Values.EMPTY, GameField.Values.EMPTY, GameField.Values.EMPTY];
    this.field[1] = [ GameField.Values.EMPTY, GameField.Values.EMPTY, GameField.Values.EMPTY];
    this.field[2] = [ GameField.Values.EMPTY, GameField.Values.EMPTY, GameField.Values.EMPTY];

    this.listeners = [];
}

GameField.GameField.prototype.copy = function()
{
    var cp = new GameField.GameField();

    for (var y = 0; y < 3; y++) {
        for (var x = 0; x < 3; x++) {
            cp.field[y][x] = this.field[y][x];
        }
    }

    return cp;
}

GameField.GameField.prototype.clearField = function(){
    for (var y = 0; y < 3; y++) {
        for (var x = 0; x < 3; x++) {
            this.set(GameField.Values.EMPTY, x, y);
        }
    }
}

GameField.GameField.prototype.set = function(v, x, y) {
    this.field[y][x] = v;

    this.listeners.forEach(e => e.listener.call(e.thisArg, v, x, y));
}

GameField.GameField.prototype.get = function(x, y) {
    return this.field[y][x];
}


GameField.GameField.prototype.gameOver = function() {
    var fieldIsFull = true;

    for (var y = 0; y < 3; y++) {
        for (var x = 0; x < 3; x++) {
            if (this.field[y][x] == GameField.Values.EMPTY) {
                fieldIsFull = false;
            }
        }
    }

    if (fieldIsFull) {
        return GameField.Values.EMPTY;
    }

    for (var y = 0; y < 3; y++) {
        if (this.field[y][0] != GameField.Values.EMPTY &&
            this.field[y][0] == this.field[y][1] &&
            this.field[y][0] == this.field[y][2]) {
            return this.field[y][0];
        }
    }

    for (var x = 0; x < 3; x++) {
        if (this.field[0][x] != GameField.Values.EMPTY &&
            this.field[0][x] == this.field[1][x] &&
            this.field[0][x] == this.field[2][x]) {
            return this.field[0][x];
        }
    }

    if (this.field[1][1] == GameField.Values.EMPTY)
        return undefined;

    if (this.field[0][0] == this.field[1][1] &&
        this.field[0][0] == this.field[2][2]) {
        return this.field[1][1];
    }

    if (this.field[0][2] == this.field[1][1] &&
        this.field[2][0] == this.field[1][1]) {
        return this.field[1][1];
    }

    return undefined;
}

GameField.GameField.prototype.computeStep = function() {

    if (this.field[1][1] == GameField.Values.EMPTY)
        return [1, 1];

    var copy = this.copy();


    for (var y = 0; y < 3; y++) {
        for (var x = 0; x < 3; x++) {
            if (copy.get(x, y) == GameField.Values.EMPTY) {
                copy.set(GameField.Values.X, x, y);
                if (copy.gameOver()) {
                    return [x, y];
                    }
                copy = this.copy();
            }
        }
    }

    for (var y = 0; y < 3; y++) {
        for (var x = 0; x < 3; x++) {
            if (copy.get(x, y) == GameField.Values.EMPTY) {
                copy.set(GameField.Values.O, x, y);
                if (copy.gameOver()) {
                    return [x, y];
                }
                copy = this.copy();
            }
        }
    }

    for (var y = 0; y < 3; y++) {
        for (var x = 0; x < 3; x++) {
            if (this.get(x, y) == GameField.Values.EMPTY) {
                return [x, y];
            }
        }
    }

    throw new Error("Should not get here");
}


GameField.GameField.prototype.addListener = function(l, thisArg) {
    this.listeners.push({listener: l, thisArg: thisArg});
}


if (typeof process !== 'undefined' && process) {
    module.exports = GameField;
}
