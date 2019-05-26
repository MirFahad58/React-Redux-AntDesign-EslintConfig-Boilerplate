
import { ON_SIGNUP_REQUEST, ON_SIGNIN_REQUEST,ON_AUTH_REQUEST, ON_CODE_REQUEST,ON_SET_LOADING_FALSE,ON_SET_CODE_TIMER} from "./actionType";

export const onUserSignUp = (data) => dispatch =>
  dispatch({
    types: ON_SIGNUP_REQUEST,
    payload: {
      client: "default",
      request: {
        url: "/portal/signup",
        method: "post", 
        data : {
          ...data
        }
      }
    }
  });
export const onUserSignIn = (data) => dispatch =>
  dispatch({
    types: ON_SIGNIN_REQUEST,
    payload: {
      client: "default",
      request: {
        url: "/portal/login",
        method: "post", 
        data : {
          ...data
        }
      }
    }
  });

export const onUserAuthenticate = (data) => dispatch =>
  dispatch({
    types: ON_AUTH_REQUEST,
    payload: {
      client: "default",
      request: {
        url: "/portal/verification",
        method: "post", 
        data : {
          ...data
        }
      }
    }
  });
export const onUserRequsestCode = (data) => dispatch =>
  dispatch({
    types: ON_CODE_REQUEST,
    payload: {
      client: "default",
      request: {
        url: "/portal/verification/request",
        method: "put", 
        data : {
          ...data
        }
      }
    }
  });

export const ON_CHANGE_CODE_TIMER = visible => ({
  type: ON_SET_CODE_TIMER,
  payload: visible
});
export const SET_LOADING_FALSE = data => ({
  type: ON_SET_LOADING_FALSE,
  payload: data
});