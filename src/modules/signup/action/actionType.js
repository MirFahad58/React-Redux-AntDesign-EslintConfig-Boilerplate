import { createApiActionTypes } from "../../../constants/constants";

let main = "SIGNUP";
export const ON_SIGNUP_REQUEST = createApiActionTypes(main, "SET_SIGNUP_REQUEST");
export const ON_SIGNIN_REQUEST = createApiActionTypes(main, "SET_SIGNIN_REQUEST");
export const ON_AUTH_REQUEST = createApiActionTypes(main, "SET_AUTH_REQUEST");
export const ON_CODE_REQUEST = createApiActionTypes(main, "ON_CODE_REQUEST");


export const ON_SET_CODE_TIMER = `${main}/ON_SET_CODE_TIMER`;
export const ON_SET_LOADING_FALSE = `${main}/ON_SET_LOADING_FALSE`;


