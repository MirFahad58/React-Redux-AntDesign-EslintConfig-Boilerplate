import { createApiActionTypes } from "../../../../constants/constants";

let main = "DASHBOARD";

export const SET_REQUEST_MODAL_VISIBLE = `${main}/SET_REQUEST_MODAL_VISIBLE`;
export const SET_REQUEST_DETAIL_NULL = `${main}/SET_REQUEST_DETAIL_NULL`;


export const ON_TRIP_REQUEST_ADD = createApiActionTypes(main, "ON_TRIP_REQUEST_ADD");
export const ON_TRIP_REQUEST_EDIT = createApiActionTypes(main, "ON_TRIP_REQUEST_EDIT");
export const ON_TRIP_ADD = createApiActionTypes(main, "ON_TRIP_ADD");
export const ON_GET_TRIP_REQUEST_DETAIL_DATA = createApiActionTypes(main, "ON_GET_TRIP_REQUEST_DETAIL_DATA");


