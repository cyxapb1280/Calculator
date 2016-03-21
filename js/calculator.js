/**
 * Created by Ruslan on 20-Mar-16.
 */
class Calculator {
  constructor(options){
    this._el = options.element;
    this._currentNumberStr = '0';
    this._currentBinaryOperation = '';
    this._firstOperand = 0;
    this._secondOperand = 0;
    this._waitingForSecondOperand = false;
    this._currentNumberIsAnswer = false;

    this._screen = new Screen({
      element: this._el.querySelector('[data-component="screen"]')
    });

    this._keyboard = new Keyboard({
      element: this._el.querySelector('[data-component="keyboard"]')
    });

    this._keyboard.on('keyPressed', this._onKeyPressed.bind(this));
  }

  _onKeyPressed (event) {
    let keyValue = event.detail;

    if(+keyValue || keyValue === '0'){
      this._addNumberToCurrentNumber(keyValue);
      this._updateScreen();
      return;
    }

    switch (keyValue){
      case 'c':
        this._clear();
        break;
      case 'ce':
        this._clearEntry();
        break;
      case 'back-space':
        this._backSpace();
        break;
      case 'dot':
        this._addDotToCurrentNumber()
        break;
      case 'sqrt':
        this._sqrt();
        break;
      case 'sqr':
        this._sqr();
        break;
      case 'fraction':
        this._fraction();
        break;
      case 'plus-minus':
        this._plusMinus();
        break;
      case 'equal':
        this._equal();
        break;
      case 'percent':
        this._percent();
        break;
      default:
        this._processBinaryOperator(keyValue);
        break;
    }

    this._updateScreen();

  }

  _addDotToCurrentNumber() {
    if(this._currentNumberStr.indexOf('.') === -1){
      this._currentNumberStr += '.';
    }
  }

  _addNumberToCurrentNumber(number){
    let nextNumber = +(this._currentNumberStr + number);

    if(this._currentNumberStr === '0' || this._waitingForSecondOperand || this._currentNumberIsAnswer){
      this._currentNumberStr = number;
      this._waitingForSecondOperand = false;
      this._currentNumberIsAnswer = false;
    } else {
      this._currentNumberStr = nextNumber.toString();
    }

  }

  _updateScreen() {
    this._screen.showResult(this._currentNumberStr);
  }

  _processBinaryOperator(operator) {
    if(this._currentBinaryOperation){
      this._calculateCurrentBinaryOperation();
    }

    this._currentBinaryOperation = operator;
    this._firstOperand = +this._currentNumberStr;
    this._waitingForSecondOperand = true;
  }

  _calculateCurrentBinaryOperation() {
    this._secondOperand = +this._currentNumberStr;
    switch (this._currentBinaryOperation){
      case 'plus':
        this._plus();
        break;
      case 'minus':
        this._minus();
        break;
      case 'divide':
        this._divide();
        break;
      case 'multiply':
        this._multiply();
        break;
    }
    this._currentNumberIsAnswer = true;
  }

  _clear() {
    this._currentNumberStr = '0';
    this._currentOperation = '';
    this._firstOperand = 0;
    this._secondOperand = 0;
  }

  _clearEntry() {
    this._currentNumberStr = '0';
  }

  _backSpace() {
    let str = this._currentNumberStr;

    if(str.length === 1){
      str = '0';
    }

    if(str !== '0'){
      str = str.substr(0, str.length - 1);
    }

    this._currentNumberStr = str;
  }

  _sqrt() {
    var number = +this._currentNumberStr;
    number = Math.sqrt(number);
    this._currentNumberStr = number.toString();
  }

  _sqr(){
    var number = +this._currentNumberStr;
    number = Math.pow(number, 2);
    this._currentNumberStr = number.toString();
  }

  _fraction(){
    var number = +this._currentNumberStr;
    number = 1 / number;
    this._currentNumberStr = number.toString();
  }

  _plusMinus(){
    var number = +this._currentNumberStr;
    number = -number;
    this._currentNumberStr = number.toString();
  }

  _plus(){
    let result = this._firstOperand + this._secondOperand;
    this._currentNumberStr = result.toString();
  }

  _minus(){
    let result = this._firstOperand - this._secondOperand;
    this._currentNumberStr = result.toString();
  }

  _divide(){
    let result = this._firstOperand / this._secondOperand;
    this._currentNumberStr = result.toString();
  }

  _multiply(){
    let result = this._firstOperand * this._secondOperand;
    this._currentNumberStr = result.toString();
  }

  _equal(){
    if(this._currentBinaryOperation){
      this._calculateCurrentBinaryOperation();
      this._currentBinaryOperation = '';
    }
  }

  _percent(){
    this._currentNumberStr = this._firstOperand * +this._currentNumberStr / 100;
    if(this._currentBinaryOperation){
      this._calculateCurrentBinaryOperation();
    }
  }
}