import {
  ON_SIGNUP_REQUEST,
  ON_SIGNIN_REQUEST,
  ON_AUTH_REQUEST,
  ON_CODE_REQUEST,
  ON_SET_CODE_TIMER,
  ON_SET_LOADING_FALSE
} from "../action/actionType";
import { message } from "antd";

export default (
  state = { content: "", loading: false, err: "", success: true, codeTimer: 0 },
  action
) => {
  switch (action.type) {
    case ON_SIGNUP_REQUEST[0]:
      return { ...state, loading: true };
    case ON_SIGNUP_REQUEST[1]:
      return {
        ...state,
        loading: false,
        success: true,
        content: action.payload.data,
        err: ""
      };
    case ON_SIGNUP_REQUEST[2]:
      message.error(
        action.error.response
          ? action.error.response.data?action.error.response.data.message?action.error.response.data.message:"Server is Not Responding":"Server is Not Responding"
          : "Server is not Responding"
      );
      return { ...state, loading: false, success: false, err: "" };

    case ON_SIGNIN_REQUEST[0]:
      return { ...state, loading: true };
    case ON_SIGNIN_REQUEST[1]:
      return {
        ...state,
        loading: false,
        success: true,
        content: action.payload.data,
        err: ""
      };
    case ON_SIGNIN_REQUEST[2]:
      message.error(
        action.error.response
          ? action.error.response.data?action.error.response.data.message?action.error.response.data.message:"Server is Not Responding":"Server is Not Responding"
          : "Server is not Responding"
      );
      return { ...state, loading: false, success: false, err: "" };

    case ON_AUTH_REQUEST[0]:
      return { ...state, loading: true };
    case ON_AUTH_REQUEST[1]:
      return {
        ...state,
        loading: false,
        success: true,
        content: action.payload.data,
        err: ""
      };
    case ON_AUTH_REQUEST[2]:
      message.error(
        action.error.response
          ? action.error.response.data?action.error.response.data.message?action.error.response.data.message:"Server is Not Responding":"Server is Not Responding"
          : "Server is not Responding"
      );
      return { ...state, loading: false, success: false, err: "" };

    case ON_CODE_REQUEST[0]:
      return { ...state, loading: true };
    case ON_CODE_REQUEST[1]:
      return {
        ...state,
        loading: false,
        success: true,
        content: action.payload.data,
        err: "",
        codeTimer: 60
      };
    case ON_CODE_REQUEST[2]:
      message.error(
        action.error.response
          ? action.error.response.data?action.error.response.data.message?action.error.response.data.message:"Server is Not Responding":"Server is Not Responding"
          : "Server is not Responding"
      );
      return {
        ...state,
        loading: false,
        success: false,
        err: action.error.response.data?action.error.response.data.message?action.error.response.data.message:"Server is Not Responding":"Server is Not Responding"
      };

    case ON_SET_LOADING_FALSE:
      return { ...state, loading: false };

    case ON_SET_CODE_TIMER:
      return { ...state, codeTimer: action.payload, loading: false };

    default:
      return state;
  }
};
