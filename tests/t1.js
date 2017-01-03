var GameField = require('../src/GameField.js');
var should = require('should');

describe('Sanity', function() {
    it('Initialization', function() {
        var gameField = new Gamefield.Gamefield();
    });

    it('Set/get', function() {
        var gameField = new Gamefield.Gamefield();
        gameField.get(0, 0).should.be.equal(GameField.Values.EMPTY);

        gameField.set(GameField.Values.X, 0, 0);
        gameField.get(GameField.Values.X, 0, 0).should.be.equal(GameField.Values.X);
    });
});
