export class Event {

  constructor(type) {
    this._type = type;
    this._listeners = [];
  }

  addListener(listener) {
    this._listeners.push(listener);
    console.log(`[Event:${this._type}] added listener`)
  }

  removeListener(listener) {
    let index = this._listeners.indexOf(listener);
    if (index > -1) {
      this._listeners.splice(index, 1);
      console.log(`[Event:${this._type}] removed listener`);
    }
  }

  dispatch(data) {
    if (this._listeners.length === 0) {
      return false;
    }
    console.log(`[Event:${this._type}] dispatched to ${this._listeners.length} listeners`);
    this._listeners.forEach(listener => listener(data));
    return true;
  }

  hasListeners() {
    return this._listeners.length > 0;
  }

}
