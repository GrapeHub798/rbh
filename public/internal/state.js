export class State {
    constructor() {
        this._data = {};
        this._listeners = {};
    }

    set(key, value) {
        this._data[key] = value;
        if (this._listeners[key]) {
            this._listeners[key].forEach(callback => callback(value));
        }
    }

    get(key) {
        return this._data[key];
    }

    addListener(key, callback) {
        if (!this._listeners[key]) {
            this._listeners[key] = [];
        }
        this._listeners[key].push(callback);
    }
}
