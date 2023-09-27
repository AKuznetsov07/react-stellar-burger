import { BaseApi } from "./BaseApi";
export class AuthApi extends BaseApi {
    constructor(options) {
        super(options);
    }

    async _fetchWithRefresh(url, options) {
        try {
            const res = await fetch(url, options);
            return await this._checkResult(res);
        } catch (err) {
            if (err.message === "jwt expired") {
                const refreshData = await this._refreshToken(); //��������� �����
                if (!refreshData.success) {
                    return Promise.reject(refreshData);
                }
                localStorage.setItem("refreshToken", refreshData.refreshToken);
                localStorage.setItem("accessToken", refreshData.accessToken);
                options.headers.authorization = refreshData.accessToken;
                const res = await fetch(url, options); //��������� ������
                return await this._checkResult(res);
            } else {
                return Promise.reject(err);
            }
        }
    }
    ///auth/login
    login(emailStr, passwordStr) {
        console.log("api login");
        return this._request(`${this._config.baseUrl}/auth/login`, {
            method: "POST",
            headers: this._config.headers,
            body: JSON.stringify({
                email: emailStr,
                password: passwordStr
            }),
        })
        //.then(res => {
        //    localStorage.setItem("refreshToken", res.accessToken);
        //    localStorage.setItem("accessToken", res.refreshToken);
        //});
    }

    ///auth/register
    sendRegisterUser(email, password, name) {
        console.log("api sendRegisterUser");
        return this._fetchWithRefresh(`${this._config.baseUrl}/auth/register`, {
            method: "POST",
            headers: this._config.headers,
            body: JSON.stringify({
                "email": email,
                "password": password,
                "name": name
            })
        })
        //    .then(res => {
        //    localStorage.setItem("refreshToken", res.accessToken);
        //    localStorage.setItem("accessToken", res.refreshToken);
        //});
    }

    ///auth/logout
    logout() {
        return this._fetchWithRefresh(`${this._config.baseUrl}/auth/logout`, {
            method: "POST",
            headers: this._config.headers,
            body: JSON.stringify({
                "token": localStorage.getItem('refreshToken')
            }),
        });
    }

    ///auth/token
    refreshConnection() {
        return this._fetchWithRefresh(`${this._config.baseUrl}/auth/token`, {
            method: "POST",
            headers: this._config.headers,
            body: JSON.stringify({
                ...this._config.headers,
                "token": localStorage.getItem('refreshToken')
            }),
        });
    }
    _refreshToken() {
        return this._request(`${this._config.baseUrl}/auth/token`, {
            method: "POST",
            headers: this._config.headers,
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken"),
            }),
        }).then((res) => this._checkResult(res));
    }

    ///auth/user
    getUser() {
        return this._fetchWithRefresh(`${this._config.baseUrl}/auth/user`, {
            method: "GET",
            headers: this._config.headers,
            body: JSON.stringify({
                "token": localStorage.getItem('accessToken')
            }),
        });
    }
    updateUser(email, password, name) {
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

    ////password-reset
    sendResetPasswordMail(email) {
        return this._fetchWithRefresh(`${this._config.baseUrl}/password-reset`, {
            method: "POST",
            headers: this._config.headers,
            body: JSON.stringify({ "email": email }),
        });
    }

    ////password-reset/reset
    sendChangePassword(newPassword, changePassToken) {
        return this._fetchWithRefresh(`${this._config.baseUrl}/password-reset/reset`, {
            method: "POST",
            headers: this._config.headers,
            body: JSON.stringify({ "password": newPassword, "token": changePassToken }),
        });
    }

}

//POST https://norma.nomoreparties.space/api/auth/login - �������� ��� �����������.
//POST https://norma.nomoreparties.space/api/auth/register - �������� ��� ����������� ������������.
//POST https://norma.nomoreparties.space/api/auth/logout - �������� ��� ������ �� �������.
//POST https://norma.nomoreparties.space/api/auth/token - �������� ���������� ������.

//GET https://norma.nomoreparties.space/api/auth/user - �������� ��������� ������ � ������������.
//PATCH https://norma.nomoreparties.space/api/auth/user - �������� ���������� ������ � ������������.

//��������� ���������� � ��������� ������ - � ��� ���� �������� � �������� ������, ����� ��� ������ �������� �� ��� �������� �������� ������ ������ �� ������� ���� endpoint:
//GET https://norma.nomoreparties.space/api/orders/{����� ������}
