var GameField = require('../src/GameField.js');
var should = require('should');

describe('Sanity', function() {
    var gameField;

    beforeEach('Set gameField', function() {
        gameField = new GameField.GameField();
    });


    it('Set/get', function() {
        var v = gameField.get(0, 0);
        (v !== undefined).should.be.true();
        v.should.be.equal(GameField.Values.EMPTY);

        gameField.set(GameField.Values.X, 0, 0);
        gameField.get(0, 0).should.be.equal(GameField.Values.X);
    });

    it('Listener', function() {
        var callbackState;

        function callback(v, x, y) {
            callbackState = {v: v, x: x, y: y };
        }

        gameField.addListener(callback, this);

        gameField.set(GameField.Values.X, 1, 2);

        callbackState.v.should.be.equal(GameField.Values.X);
        callbackState.x.should.be.equal(1);
        callbackState.y.should.be.equal(2);
    });
});
