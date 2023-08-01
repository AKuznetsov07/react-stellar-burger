export class Api {
    constructor(options) {
        this._config = options;
    }


    _request(url, options) {
        return fetch(url, options).then(this._checkResult);
    }

    _checkResult(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getIngridients() {
        return this._request(`${this._config.baseUrl}/ingredients`, { headers: this._config.headers });
    }
    createOrder(orderDetails) {//TODO: Need to get real request.
        return this._request(`${this._config.baseUrl}/ingredients`, { headers: this._config.headers });
    }
}