import { webApi } from "../../utils/Api/AppApi.js";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const getUser = () => {
  return (dispatch) => {
    return webApi.getUser().then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    return webApi.login(email, password).then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      const user = { ...res.user, password: password };
      dispatch(setUser(user));
      dispatch(setAuthChecked(true));
    });
  };
};

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch((e) => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    return webApi.logout().then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
    });
  };
};

export const registerUser = (email, password, name) => {
  return (dispatch) => {
    return webApi.sendRegisterUser(email, password, name).then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    });
  };
};

export const updateUser = (user) => {
  return (dispatch) => {
    return webApi.updateUser(user).then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const sendResetPasswordMail = (email) => {
  return (dispatch) => {
    return webApi.sendResetPasswordMail(email);
  };
};

export const sendChangePassword = (newPassword, tokenFromMail) => {
  return (dispatch) => {
    return webApi.sendChangePassword(newPassword, tokenFromMail);
  };
};
