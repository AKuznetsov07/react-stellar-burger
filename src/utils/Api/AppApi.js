import { apiConfig } from "../constants";
import { AuthApi } from "./AuthApi";
class AppApi extends AuthApi {
    constructor(options) {
        super(options);
    }

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

}


export const webApi = new AppApi(apiConfig)