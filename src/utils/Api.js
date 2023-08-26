export class Api {
    constructor(options) {
        this._config = options;
    }


    _request(url, options, setProgressState) {
        return fetch(url, options).then(res => this._checkResult(res, setProgressState));
    }

    _checkResult(res, setProgressState) {
        if (res.ok) {
            setProgressState(false);
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getIngridients(setProgressState) {
        setProgressState(true);
        return this._request(`${this._config.baseUrl}/ingredients`, { headers: this._config.headers }, setProgressState);
    }
    createOrder(orderDetails, setProgressState) {
        setProgressState(true);
        return this._request(`${this._config.baseUrl}/orders`, { method:"POST",headers: this._config.headers, body: JSON.stringify({ ingredients: orderDetails }) }, setProgressState);
    }
}