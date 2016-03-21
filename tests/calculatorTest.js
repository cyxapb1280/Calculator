/**
 * Created by Ruslan on 21-Mar-16.
 */
describe('Class Calculator', function () {
  let calc = new Calculator({
    element: document.querySelector('[data-component="calculator"]')
  });
  
  describe('Symbols input', function () {

    describe('Add number', function () {

      it('input 1', function() {
        calc._addNumberToCurrentNumber('1');
        assert.equal(calc._currentNumberStr, '1');
      });

      it('input 12', function() {
        calc._addNumberToCurrentNumber('2');
        assert.equal(calc._currentNumberStr, '12');
      });

      it('input 123', function() {
        calc._addNumberToCurrentNumber('3');
        assert.equal(calc._currentNumberStr, '123');
      });

    });

    describe('Add dot', function () {
      calc._currentNumberStr = '0';

      it('input "." after 0', function() {
        calc._currentNumberStr = '0';
        calc._addDotToCurrentNumber();
        assert.equal(calc._currentNumberStr, '0.');
      });

      it('block input if "." already exist', function() {
        calc._addDotToCurrentNumber();
        assert.equal(calc._currentNumberStr, '0.');
      });

    });
  });

  describe('Unary operators', function () {
    
    describe('Plus-minus', function () {
      it('to -1', function() {
        calc._currentNumberStr = '1';
        calc._plusMinus();
        assert.equal(calc._currentNumberStr, '-1');
      });

      it('to +1', function() {
        calc._plusMinus();
        assert.equal(calc._currentNumberStr, '1');
      });
    });

    describe('Sqr', function () {
      it('sqr of 2 is 4', function() {
        calc._currentNumberStr = '2';
        calc._sqr();
        assert.equal(calc._currentNumberStr, '4');
      });

      it('sqr of -2 is 4', function() {
        calc._currentNumberStr = '-2';
        calc._sqr();
        assert.equal(calc._currentNumberStr, '4');
      });
    });

    describe('Sqrt', function () {
      it('sqrt of 4 is 2', function() {
        calc._currentNumberStr = '4';
        calc._sqrt();
        assert.equal(calc._currentNumberStr, '2');
      });

      it('sqrt of -4 is NaN', function() {
        calc._currentNumberStr = '-2';
        calc._sqrt();
        assert.equal(calc._currentNumberStr, 'NaN');
      });
    });

    describe('Fraction', function () {
      it('fraction of 4 is 0.25', function() {
        calc._currentNumberStr = '4';
        calc._fraction();
        assert.equal(calc._currentNumberStr, '0.25');
      });
    });

  });

  describe('Binary operators', function () {
    describe('Plus', function () {
      it('2 + 3 is 5', function() {
        calc._firstOperand = 2;
        calc._secondOperand = 3;
        calc._plus();
        assert.equal(calc._currentNumberStr, '5');
      });
    });

    describe('Minus', function () {
      it('2 - 3 is -1', function() {
        calc._minus();
        assert.equal(calc._currentNumberStr, '-1');
      });
    });

    describe('Multiply', function () {
      it('2 * 3 is 6', function() {
        calc._multiply();
        assert.equal(calc._currentNumberStr, '6');
      });
    });

    describe('Divide', function () {
      it('4 / 2 is 2', function() {
        calc._firstOperand = 4;
        calc._secondOperand = 2;
        calc._divide();
        assert.equal(calc._currentNumberStr, '2');
      });

      it('0 / 0 is NaN', function() {
        calc._firstOperand = 0;
        calc._secondOperand = 0;
        calc._divide();
        assert.equal(calc._currentNumberStr, 'NaN');
      });
    });
  });

  describe('Equal', function () {

  });

  describe('Percent', function () {

  });
});