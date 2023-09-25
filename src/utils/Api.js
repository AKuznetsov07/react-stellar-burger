import { apiConfig } from "./constants";
class Api {
  constructor(options) {
    this._config = options;
  }

  _request(url, options) {
    return fetch(url, options).then((res) => this._checkResult(res));
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Exception: ${res.status}`);
  }
    /////
    _refreshToken(){
        return fetch(`${this._config.baseUrl}/auth/token`, {
            method: "POST",
            headers: this._config.headers,
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken"),
            }),
        }).then((res) => this._checkResult(res));
    }
    async _fetchWithRefresh(url, options){
        try {
            const res = await fetch(url, options);
            return await this._checkResult(res);
        } catch (err) {
            if (err.message === "jwt expired") {
                const refreshData = await this._refreshToken(); //обновляем токен
                if (!refreshData.success) {
                    return Promise.reject(refreshData);
                }
                localStorage.setItem("refreshToken", refreshData.refreshToken);
                localStorage.setItem("accessToken", refreshData.accessToken);
                options.headers.authorization = refreshData.accessToken;
                const res = await fetch(url, options); //повторяем запрос
                return await this._checkResult(res);
            } else {
                return Promise.reject(err);
            }
        }
    }
  /////

  getIngredients() {
      return this._fetchWithRefresh(`${this._config.baseUrl}/ingredients`, {
      headers: this._config.headers,
    });
  }
  createOrder(orderDetails) {
    return this._request(`${this._config.baseUrl}/orders`, {
      method: "POST",
      headers: this._config.headers,
      body: JSON.stringify({ ingredients: orderDetails }),
    });
  }
    sendResetPassword(email) {
        return this._fetchWithRefresh(`${this._config.baseUrl}/password-reset`, {
            method: "POST",
            headers: this._config.headers,
            body: JSON.stringify({ "email": email }),
        });
    }
    sendChangePassword(newPassword, token) {
        return this._fetchWithRefresh(`${this._config.baseUrl}/password-reset/reset`, {
            method: "POST",
            headers: this._config.headers,
            body: JSON.stringify({ "password": newPassword, "token": token }),
        });
    }
    sendRegisterUser(email, password, name) {
        return this._fetchWithRefresh(`${this._config.baseUrl}/auth/register`, {
            method: "POST",
            headers: this._config.headers,
            body: JSON.stringify({
                "email": email,
                "password": password,
                "name": name
            }),
        }).then(res => {
            localStorage.setItem("refreshToken", res.accessToken);
            localStorage.setItem("accessToken", res.refreshToken);
        });
    }
    Authtorize(email, password) {
        return this._fetchWithRefresh(`${this._config.baseUrl}/auth/login`, {
            method: "POST",
            headers: this._config.headers,
            body: JSON.stringify({
                "email": email,
                "password": password
            }),
        }).then(res => {
                localStorage.setItem("refreshToken", res.accessToken);
                localStorage.setItem("accessToken", res.refreshToken);
            });
    }
    RefreshConnection() {
        return this._fetchWithRefresh(`${this._config.baseUrl}/auth/token`, {
            method: "POST",
            headers: this._config.headers,
            body: JSON.stringify({
                ...this._config.headers,
                "token": localStorage.getItem('refreshToken')
            }),
        });
    }
    Disconnect() {
        return this._fetchWithRefresh(`${this._config.baseUrl}/auth/login`, {
            method: "POST",
            headers: this._config.headers,
            body: JSON.stringify({
                ...this._config.headers,
                "token": localStorage.getItem('refreshToken')
            }),
        });
    }

    GetUser() {
        return this._fetchWithRefresh(`${this._config.baseUrl}/auth/user`, {
            method: "GET",
            headers: this._config.headers,
            body: JSON.stringify({
                "token": localStorage.getItem('accessToken')
            }),
        });
    }
    UpdateUser(email, password, name) {
        return this._fetchWithRefresh(`${this._config.baseUrl}/auth/user`, {
            method: "PATCH",
            headers: this._config.headers,
            body: JSON.stringify({
                "email": email,
                "password": password,
                "name": name,
                "token": localStorage.getItem('accessToken')
            }),
        });
    }
}


//POST https://norma.nomoreparties.space/api/auth/login - эндпоинт для авторизации.
//POST https://norma.nomoreparties.space/api/auth/register - эндпоинт для регистрации пользователя.
//POST https://norma.nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.
//POST https://norma.nomoreparties.space/api/auth/token - эндпоинт обновления токена.

//GET https://norma.nomoreparties.space/api/auth/user - эндпоинт получения данных о пользователе.
//PATCH https://norma.nomoreparties.space/api/auth/user - эндпоинт обновления данных о пользователе.

//Небольшое дополнение к проектной работе - у нас есть страница с деталями заказа, чтобы при прямом переходе на эту страницу получить данные заказа на сервере есть endpoint:
//GET https://norma.nomoreparties.space/api/orders/{номер заказа}


export const webApi = new Api(apiConfig)