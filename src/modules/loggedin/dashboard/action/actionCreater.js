import { SET_REQUEST_MODAL_VISIBLE,ON_TRIP_REQUEST_ADD,ON_TRIP_ADD,ON_GET_TRIP_REQUEST_DETAIL_DATA, ON_TRIP_REQUEST_EDIT, SET_REQUEST_DETAIL_NULL } from "./actionType";

export const ON_CHANGE_REQUEST_MODAL_VISIBLE = visible => ({
  type: SET_REQUEST_MODAL_VISIBLE,
  payload: visible
});
export const ON_CHANGE_REQUEST_DETAIL_NULL = data => ({
  type: SET_REQUEST_DETAIL_NULL,
  payload: data
});
export const onTripRequestAdd = data => dispatch =>
  dispatch({
    types: ON_TRIP_REQUEST_ADD,
    payload: {
      client: "default",
      request: {
        url: "/trip/request",
        method: "post",
        data: {
          ...data
        }
      }
    }
  });
export const onTripRequestEdit = data => dispatch =>
  dispatch({
    types: ON_TRIP_REQUEST_EDIT,
    payload: {
      client: "default",
      request: {
        url: "/trip/request",
        method: "put",
        data: {
          ...data
        }
      }
    }
  });

export const onTripAdd = data => dispatch =>
  dispatch({
    types: ON_TRIP_ADD,
    payload: {
      client: "default",
      request: {
        url: "/trip",
        method: "post",
        data: {
          ...data
        }
      }
    }
  });

export const onGetDetailTripRequestData = data => dispatch =>
  dispatch({
    types: ON_GET_TRIP_REQUEST_DETAIL_DATA,
    payload: {
      client: "default",
      request: {
        url: "/trip/request/single?id="+data.id+"&userId="+data.userId+"&accountType=Transporter",
        method: "get"
      }
    }
  });