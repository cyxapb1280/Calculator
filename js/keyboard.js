/**
 * Created by Ruslan on 20-Mar-16.
 */
class Keyboard {
  constructor(options) {
    this._el = options.element;

    this._el.addEventListener('click', this._onKeyClick.bind(this));
  }

  on(eventName, handler) {
    this._el.addEventListener(eventName, handler);
  }

  _onKeyClick (event) {
    var keyValue = event.target.dataset.keyValue;
    this._trigger('keyPressed', keyValue);
  }

  _trigger(eventName, data, options) {
    options = options || {}

    if (data !== undefined && data !== null) {
      options.detail = data;
    }

    let event = new CustomEvent(eventName, options);

    this._el.dispatchEvent(event);
  }
}