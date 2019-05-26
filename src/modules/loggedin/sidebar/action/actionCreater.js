import {
  SET_NAV_NAME,
  SET_ACTIVE_NAV,
  SET_DETIAL_DATA,
  SET_FILTER_DATA,
  ON_GET_GLOBAL_DATA,
  ON_GET_LOG_DATA,
  ON_ALL_DRIVERS_INFO_GET,
  SET_DRIVER_ADDED_PUSH_TO_ALL,
  SET_VEHICLE_ADDED_PUSH_TO_ALL,
  ON_ALL_VEHICLES_INFO_SET,
  ON_ALL_CLIENT_INFO_SET,
  ON_ALL_BROKER_INFO_SET,
  SET_CLIENT_ADDED_PUSH_TO_ALL,
  SET_BROKER_ADDED_PUSH_TO_ALL,
  ON_GET_ALL_TRIP_REQUEST_SET,
  SET_TRIP_REQUEST_ADDED_PUSH_TO_ALL,
  SET_TRIP_ADDED_PUSH_TO_ALL,
  ON_GET_ALL_TRIP_UPCOMING,
  ON_GET_ALL_TRIP_ONGOING,
  uploadSingleImage,
  ON_GET_PUSH_NOTI_TOKEN
} from "./actionType";

export const ON_CHANGE_NAV_NAME = navName => ({
  type: SET_NAV_NAME,
  payload: navName
});

export const ON_CHANGE_ACTIVE_NAV = nav => ({
  type: SET_ACTIVE_NAV,
  payload: nav
});

export const ON_CHANGE_DETAIL_DATA = data => ({
  type: SET_DETIAL_DATA,
  payload: data
});

// this is for changing the filter data
export const ON_CHANGE_FILTER_DATA = data => ({
  type: SET_FILTER_DATA,
  payload: data
});

export const ON_DRIVER_ADDED_PUSH_TO_ALL = data => ({
  type: SET_DRIVER_ADDED_PUSH_TO_ALL,
  payload: data
});

export const ON_VEHICLE_ADDED_PUSH_TO_ALL = data => ({
  type: SET_VEHICLE_ADDED_PUSH_TO_ALL,
  payload: data
});

export const ON_CLIENT_ADDED_PUSH_TO_ALL = data => ({
  type: SET_CLIENT_ADDED_PUSH_TO_ALL,
  payload: data
});

export const ON_BROKER_ADDED_PUSH_TO_ALL = data => ({
  type: SET_BROKER_ADDED_PUSH_TO_ALL,
  payload: data
});

export const ON_TRIP_REQUEST_ADDED_PUSH_TO_ALL = data => ({
  type: SET_TRIP_REQUEST_ADDED_PUSH_TO_ALL,
  payload: data
});
export const ON_TRIP_ADDED_PUSH_TO_ALL = data => ({
  type: SET_TRIP_ADDED_PUSH_TO_ALL,
  payload: data
});

export const onGetGlobalData = data => dispatch =>
  dispatch({
    types: ON_GET_GLOBAL_DATA,
    payload: {
      client: "default",
      request: {
        url: "/global?id=" + data.id + "&accountType=" + data.accountType,
        method: "get"
      }
    }
  });
export const onGetLogData = data => dispatch =>
  dispatch({
    types: ON_GET_LOG_DATA,
    payload: {
      client: "default",
      request: {
        url: "/portal/dashboard/log?id=" + data.id,
        method: "get"
      }
    }
  });

export const onAllDriversInfoGet = data => dispatch =>
  dispatch({
    types: ON_ALL_DRIVERS_INFO_GET,
    payload: {
      client: "default",
      request: {
        url: "/portal/driver?id=" + data.id,
        method: "get"
      }
    }
  });

export const onAllVehiclesInfoGet = data => dispatch =>
  dispatch({
    types: ON_ALL_VEHICLES_INFO_SET,
    payload: {
      client: "default",
      request: {
        url: "/vehicle?id=" + data.id+"&accountType=Transporter",
        method: "get"
      }
    }
  });

export const onAllClientsInfoGet = data => dispatch =>
  dispatch({
    types: ON_ALL_CLIENT_INFO_SET,
    payload: {
      client: "default",
      request: {
        url: "portal/client?id=" + data.id,
        method: "get"
      }
    }
  });

export const onAllBrokersInfoGet = data => dispatch =>
  dispatch({
    types: ON_ALL_BROKER_INFO_SET,
    payload: {
      client: "default",
      request: {
        url: "portal/broker?id=" + data.id,
        method: "get"
      }
    }
  });

  
// to get all trip request on Dashboard and etc
export const onAllTripRequestInfoGet = data => dispatch =>
  dispatch({
    types: ON_GET_ALL_TRIP_REQUEST_SET,
    payload: {
      client: "default",
      request: {
        url: "trip/request?id=" + data.id+ "&skip=0&limit=500&accountType=Transporter&type=All",
        method: "get"
      }
    }
  });


export const onAllTripUcomingInfoGet = data => dispatch =>
  dispatch({
    types: ON_GET_ALL_TRIP_UPCOMING,
    payload: {
      client: "default",
      request: {
        url: "/trip/?id=" + data.id+ "&skip=0&limit=500&status=Upcoming&accountType=Transporter",
        method: "get"
      }
    }
  });

export const onAllTripOngoingInfoGet = data => dispatch =>
  dispatch({
    types: ON_GET_ALL_TRIP_ONGOING,
    payload: {
      client: "default",
      request: {
        url: "/trip/?id=" + data.id+ "&skip=0&limit=500&status=Ongoing&accountType=Transporter",
        method: "get"
      }
    }
  });
  

export const uploadSingleImageAction = data => dispatch =>
  dispatch({
    types: uploadSingleImage,
    payload: {
      client: "default",
      request: {
        url: "/image",
        config: { headers: {'Content-Type': 'multipart/form-data' }},
        method: "post",
        data:data
        
      }
    }
  });

  export const onGetPushNotiToken = data => dispatch =>
  dispatch({
    types: ON_GET_PUSH_NOTI_TOKEN,
    payload: {
      client: "default",
      request: {
        url: "/portal/user",
        method: "put",
        data:{
          ...data
        }
        
      }
    }
  });
  