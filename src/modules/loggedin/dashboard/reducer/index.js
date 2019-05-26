import { SET_REQUEST_MODAL_VISIBLE, ON_TRIP_REQUEST_ADD,ON_TRIP_ADD,ON_GET_TRIP_REQUEST_DETAIL_DATA, ON_TRIP_REQUEST_EDIT, SET_REQUEST_DETAIL_NULL } from "../action/actionType";
import { message } from "antd";

export default (
  state = { requestModalVisible: false , loading:false ,loading2:false, newTripRequest:"",newTrip:"", tripRequestDetail:false},
  action
) => {
  switch (action.type) {
    case SET_REQUEST_MODAL_VISIBLE:
      return { ...state, requestModalVisible: action.payload, loading:false, loading2:false };
    case SET_REQUEST_DETAIL_NULL:
      return { ...state, tripRequestDetail:action.payload };

    case ON_TRIP_REQUEST_ADD[0]:
      return { ...state, loading: true };
    case ON_TRIP_REQUEST_ADD[1]:
      return { ...state, loading: false, newTripRequest: action.payload.data };
    case ON_TRIP_REQUEST_ADD[2]:
      message.error(action.error.response?action.error.response.data.message:"Server is not Responding")
      return { ...state, loading: false, err:'' };

    case ON_TRIP_REQUEST_EDIT[0]:
      return { ...state, loading: true };
    case ON_TRIP_REQUEST_EDIT[1]:
      return { ...state, loading: false, newTripRequest: action.payload.data };
    case ON_TRIP_REQUEST_EDIT[2]:
      message.error(action.error.response?action.error.response.data.message:"Server is not Responding")
      return { ...state, loading: false, err:'' };
      
    case ON_TRIP_ADD[0]:
      return { ...state, loading: true };
    case ON_TRIP_ADD[1]:
      return { ...state, loading: false, newTrip: action.payload.data };
    case ON_TRIP_ADD[2]:
      message.error(action.error.response?action.error.response.data.message:"Server is not Responding")
      return { ...state, loading: false, err:'' };

    case ON_GET_TRIP_REQUEST_DETAIL_DATA[0]:
      return { ...state, loading2: true };
    case ON_GET_TRIP_REQUEST_DETAIL_DATA[1]:
      return { ...state, loading2: false, tripRequestDetail: action.payload.data };
    case ON_GET_TRIP_REQUEST_DETAIL_DATA[2]:
      message.error(
        action.error.response
          ? action.error.response.data.message
          : "server is not responding"
      );
      return { ...state, loading2: false, tripRequestDetail: false };

    default:
      return state;
  }
};
