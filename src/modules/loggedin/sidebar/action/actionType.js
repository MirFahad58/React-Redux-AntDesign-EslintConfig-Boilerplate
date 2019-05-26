import { createApiActionTypes } from "../../../../constants/constants";

let main = "GLOBAL";

export const SET_NAV_NAME = `${main}SET_NAV_NAME`;
export const SET_ACTIVE_NAV = `${main}SET_ACTIVE_NAV`;
export const SET_DETIAL_DATA = `${main}SET_DETIAL_DATA`;
export const SET_FILTER_DATA = `${main}SET_FILTER_DATA`;

export const SET_DRIVER_ADDED_PUSH_TO_ALL = `${main}SET_DRIVER_ADDED_PUSH_TO_ALL`;
export const SET_VEHICLE_ADDED_PUSH_TO_ALL = `${main}SET_VEHICLE_ADDED_PUSH_TO_ALL`;
export const SET_CLIENT_ADDED_PUSH_TO_ALL = `${main}SET_CLIENT_ADDED_PUSH_TO_ALL`;
export const SET_BROKER_ADDED_PUSH_TO_ALL = `${main}SET_BROKER_ADDED_PUSH_TO_ALL`;
export const SET_TRIP_REQUEST_ADDED_PUSH_TO_ALL = `${main}SET_TRIP_REQUEST_ADDED_PUSH_TO_ALL`;
export const SET_TRIP_ADDED_PUSH_TO_ALL = `${main}SET_TRIP_ADDED_PUSH_TO_ALL`;



export const ON_GET_GLOBAL_DATA = createApiActionTypes(
  main,
  "ON_GET_GLOBAL_DATA"
);
export const ON_GET_LOG_DATA = createApiActionTypes(main, "ON_GET_LOG_DATA");
export const ON_ALL_DRIVERS_INFO_GET = createApiActionTypes(
  main,
  "ON_ALL_DRIVERS_INFO_GET"
);
export const ON_ALL_VEHICLES_INFO_SET = createApiActionTypes(
  main,
  "ON_ALL_VEHICLES_INFO_SET"
);

export const ON_ALL_CLIENT_INFO_SET = createApiActionTypes(
  main,
  "ON_ALL_CLIENT_INFO_SET"
);

export const ON_ALL_BROKER_INFO_SET = createApiActionTypes(
  main,
  "ON_ALL_BROKER_INFO_SET"
);

export const ON_GET_ALL_TRIP_REQUEST_SET = createApiActionTypes(
  main,
  "ON_GET_ALL_TRIP_REQUEST_SET"
);
export const ON_GET_ALL_TRIP_UPCOMING = createApiActionTypes(
  main,
  "ON_GET_ALL_TRIP_UPCOMING"
);
export const ON_GET_ALL_TRIP_ONGOING = createApiActionTypes(
  main,
  "ON_GET_ALL_TRIP_ONGOING"
);


export const uploadSingleImage = createApiActionTypes(
  main,
  "uploadSingleImage"
);

export const ON_GET_PUSH_NOTI_TOKEN = createApiActionTypes(
  main, "ON_GET_PUSH_NOTI_TOKEN"
);