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
}


GameField.GameField.prototype.set = function(v, x, y) {
    this.field[y][x] = v;
}

GameField.GameField.prototype.get = function(x, y) {
    return this.field[y][x];
}


GameField.GameField.prototype.gameOver = function() {
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



}

if (process) {
    module.exports = GameField;
}
