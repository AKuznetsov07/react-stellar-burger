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
            const user = { ...res.user, password: password }
            dispatch(setUser(user));
            dispatch(setAuthChecked(true));
        });
    };
};

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
                .catch(() => {
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

//export const POST_RESET_PASS_REQUEST = "POST_RESET_PASS_REQUEST";
//export const POST_RESET_PASS_SUCCESS = "POST_RESET_PASS_SUCCESS";
//export const POST_RESET_PASS_FAILED = "POST_RESET_PASS_FAILED";

//export const POST_CHANGE_PASS_REQUEST = "POST_CHANGE_PASS_REQUEST";
//export const POST_CHANGE_PASS_SUCCESS = "POST_CHANGE_PASS_SUCCESS";
//export const POST_CHANGE_PASS_FAILED = "POST_CHANGE_PASS_FAILED";

//export const POST_CREATE_USER_REQUEST = "POST_CREATE_USER_REQUEST";
//export const POST_CREATE_USER_SUCCESS = "POST_CREATE_USER_SUCCESS";
//export const POST_CREATE_USER_FAILED = "POST_CREATE_USER_FAILED";

//export function sendResetPasswordRequest(email) {
//    return function (dispatch) {
//        dispatch({ type: POST_RESET_PASS_REQUEST });
//        webApi
//            .sendResetPassword(email)
//            .then((res) => {
//                dispatch({ type: POST_RESET_PASS_SUCCESS });
//            })
//            //.then(() => clearOrder(dispatch))
//            .catch((e) => {
//                dispatch({ type: POST_RESET_PASS_FAILED });
//                console.error("Post email to reset password request failed.");
//                console.error(e);
//            });
//    };
//}
//export function sendChangePasswordRequest(newPassword, token) {
//    return function (dispatch) {
//        dispatch({ type: POST_CHANGE_PASS_REQUEST });
//        webApi
//            .sendChangePassword(newPassword, token)
//            .then((res) => {
//                //openModal(res.order.number);
//                dispatch({ type: POST_CHANGE_PASS_SUCCESS });
//            })
//            //.then(() => clearOrder(dispatch))
//            .catch((e) => {
//                dispatch({ type: POST_CHANGE_PASS_FAILED });
//                console.error("Failed to change password.");
//                console.error(e);
//            });
//    };
//}

//export function sendRegisterUserRequest(email, password, name) {
    
//    return function (dispatch) {
//        dispatch({ type: POST_CREATE_USER_REQUEST });
//        webApi
//            .sendRegisterUser(email, password, name)
//            .then((res) => {
//                //openModal(res.order.number);
//                dispatch({ type: POST_CREATE_USER_SUCCESS });
//            })
//            //.then(() => clearOrder(dispatch))
//            .catch((e) => {
//                dispatch({ type: POST_CREATE_USER_FAILED });
//                console.error("Failed to create user.");
//                console.error(e);
//            });
//    };
//}