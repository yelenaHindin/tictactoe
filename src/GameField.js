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

if (process) {
    module.exports = GameField;
}
