import {
  WS_CONNECTION_START,
  WS_CONNECTION_AUTH_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_DISCONNECT,
} from "../action-types";

export const wsOpenConnection = (uri) => {
  return {
      type: WS_CONNECTION_START,
      payload: uri
  };
};
export const wsOpenAuthConnection = (uri) => {
    console.log('wsOpenAuthConnection')
    const token = localStorage.getItem("accessToken");
    //console.log(token)
    const clearToken = token.replace('Bearer ', '')
    //console.log(clearToken);
    console.log(`${uri}?token=${clearToken}`)
  return {
      type: WS_CONNECTION_AUTH_START,
      payload: `${uri}?token=${clearToken}`
  };
};

export const wsConnectionSuccess = () => {

  return {
      type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetMessage = (message) => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  };
};

export const wsSendMessage = (message) => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message,
  };
};
export const wsCloseConnection = (closeCode, message) => {
  return {
    type: WS_DISCONNECT,
    payload: { code: closeCode, reasonMessage: message },
  };
};
