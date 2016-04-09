/**
 * Created by Ruslan on 20-Mar-16.
 */
'use strict';

class Screen {
  constructor(options) {
    this._el = options.element;
    this._screenResult = this._el.querySelector('[data-component="screen-result"]');
  }

  showResult(value){
    if(value.length < 8){
      this._screenResult.style.fontSize = '32pt';
    }
    if(value.length > 8){
      this._screenResult.style.fontSize = '22pt';
    }
    if(value.length > 13){
      this._screenResult.style.fontSize = '12pt';
    }

    value = this._setComas(value);
    this._screenResult.innerHTML = value;
  }

  _setComas(numberStr){
    let indexOfDot = numberStr.indexOf('.');

    if(indexOfDot > -1 && indexOfDot != numberStr.length - 1){
      let absNumberStr = numberStr.slice(0, indexOfDot);
      let afterComaStr = numberStr.slice(indexOfDot, numberStr.length - 1);

      absNumberStr = absNumberStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,');

      numberStr = absNumberStr + afterComaStr;
    }
    else {
      numberStr = numberStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,');
    }

    return numberStr;
  }
}