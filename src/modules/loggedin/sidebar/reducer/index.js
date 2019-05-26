import {
  SET_NAV_NAME,
  SET_ACTIVE_NAV,
  SET_DETIAL_DATA,
  SET_FILTER_DATA,
  ON_GET_GLOBAL_DATA,
  ON_GET_LOG_DATA,
  SET_DRIVER_ADDED_PUSH_TO_ALL,
  ON_ALL_DRIVERS_INFO_GET,
  ON_ALL_VEHICLES_INFO_SET,
  ON_ALL_CLIENT_INFO_SET,
  ON_ALL_BROKER_INFO_SET,
  SET_VEHICLE_ADDED_PUSH_TO_ALL,
  SET_CLIENT_ADDED_PUSH_TO_ALL,
  SET_BROKER_ADDED_PUSH_TO_ALL,
  ON_GET_ALL_TRIP_REQUEST_SET,
  SET_TRIP_REQUEST_ADDED_PUSH_TO_ALL,
  ON_GET_ALL_TRIP_UPCOMING,
  ON_GET_ALL_TRIP_ONGOING,
  SET_TRIP_ADDED_PUSH_TO_ALL,
  uploadSingleImage,
  ON_GET_PUSH_NOTI_TOKEN
} from "../action/actionType";
import { message } from "antd";

export default (
  state = {
    err: "",
    globalData: {},
    logData: {},
    loading: false,
    loading2:false,
    loading5:false,
    navName: { first: "Dashboard", second: "", third: "" },
    activeNav: [],
    detail: { type: "", id: "" },
    filters: {
      open:false,
      type:"Trips",
      tripId:false,
      status:false,
      driverId:false,
      vehicleId:false,
      brokerId:false,
      clientId:false,
    },
    allDrivers: [],
    allVehicles: [],
    allClients: [],
    allBrokers:[],
    allTripRequests:[],
    allUpcomingTrips:[],
    allOngoingTrips:[],
    uploadImage:""
  },
  action
) => {
  switch (action.type) {
    case SET_NAV_NAME:
      return { ...state, navName: action.payload };
    case SET_ACTIVE_NAV:
      return { ...state, activeNav: action.payload };
    case SET_DETIAL_DATA:
      return { ...state, detail: action.payload };
    case SET_FILTER_DATA:
      return { ...state, filters: action.payload };

    case SET_DRIVER_ADDED_PUSH_TO_ALL:
      return { ...state, allDrivers: [ ...state.allDrivers, action.payload] };

    case SET_VEHICLE_ADDED_PUSH_TO_ALL:
      return { ...state, allVehicles: [...state.allVehicles, action.payload] };

    case SET_CLIENT_ADDED_PUSH_TO_ALL:
      return { ...state, allClients: [...state.allClients,action.payload] };

    case SET_BROKER_ADDED_PUSH_TO_ALL:
      return { ...state, allBrokers: [...state.allBrokers,action.payload ]};

    case SET_TRIP_REQUEST_ADDED_PUSH_TO_ALL:
      return { ...state, allTripRequests: [...state.allTripRequests,action.payload ]};

    case SET_TRIP_ADDED_PUSH_TO_ALL:
      return { ...state, allUpcomingTrips: [...state.allUpcomingTrips,action.payload ]};

    case ON_GET_GLOBAL_DATA[0]:
      return { ...state, loading: true };
    case ON_GET_GLOBAL_DATA[1]:
      return { ...state, loading: false, globalData: action.payload.data };
    case ON_GET_GLOBAL_DATA[2]:
      message.error(
        action.error.response
          ? action.error.response.data.message
          : "server is not responding"
      );
      return { ...state, loading: false, err: "" };

    case ON_GET_LOG_DATA[0]:
      return { ...state };
    case ON_GET_LOG_DATA[1]:
      return { ...state, logData: action.payload.data };
    case ON_GET_LOG_DATA[2]:
      // message.error(
      //   action.error.response
      //     ? action.error.response.data.message
      //     : "server is not responding"
      // );
      return { ...state, err: "" };

    case ON_ALL_DRIVERS_INFO_GET[0]:
      return { ...state, loading2: true };
    case ON_ALL_DRIVERS_INFO_GET[1]:
      return { ...state, loading2: false, allDrivers: action.payload.data };
    case ON_ALL_DRIVERS_INFO_GET[2]:
      // message.error(
      //   action.error.response
      //     ? action.error.response.data.message
      //     : "server is not responding"
      // );
      return { ...state, loading2: false,allDrivers:[], err: "not fount" };

    case ON_ALL_VEHICLES_INFO_SET[0]:
      return { ...state, loading2: true };
    case ON_ALL_VEHICLES_INFO_SET[1]:
      return { ...state, loading2: false, allVehicles: action.payload.data };
    case ON_ALL_VEHICLES_INFO_SET[2]:
      // message.error(
      //   action.error.response
      //     ? action.error.response.data.message
      //     : "server is not responding"
      // );
      return { ...state, loading2: false, allVehicles: [], err: "not found" };

    case ON_ALL_CLIENT_INFO_SET[0]:
      return { ...state, loading2: true };
    case ON_ALL_CLIENT_INFO_SET[1]:
      return { ...state, loading2: false, allClients: action.payload.data };
    case ON_ALL_CLIENT_INFO_SET[2]:
      // message.error(
      //   action.error.response
      //     ? action.error.response.data.message
      //     : "server is not responding"
      // );
      return { ...state, loading2: false, allClients: [], err: "not found" };

    case ON_ALL_BROKER_INFO_SET[0]:
      return { ...state, loading2: true };
    case ON_ALL_BROKER_INFO_SET[1]:
      return { ...state, loading2: false, allBrokers: action.payload.data };
    case ON_ALL_BROKER_INFO_SET[2]:
      // message.error(
      //   action.error.response
      //     ? action.error.response.data.message
      //     : "server is not responding"
      // );
      return { ...state, loading2: false, allBrokers: [], err: "not found" };

    case ON_GET_ALL_TRIP_REQUEST_SET[0]:
      return { ...state, loading2: true };
    case ON_GET_ALL_TRIP_REQUEST_SET[1]:
      return { ...state, loading2: false, allTripRequests: action.payload.data };
    case ON_GET_ALL_TRIP_REQUEST_SET[2]:
      // message.error(
      //   action.error.response
      //     ? action.error.response.data.message
      //     : "server is not responding"
      // );
      return { ...state, loading2: false, allTripRequests: [], err: "not found" };

    case ON_GET_ALL_TRIP_UPCOMING[0]:
      return { ...state, loading2: true };
    case ON_GET_ALL_TRIP_UPCOMING[1]:
      return { ...state, loading2: false, allUpcomingTrips: action.payload.data };
    case ON_GET_ALL_TRIP_UPCOMING[2]:
      // message.error(
      //   action.error.response
      //     ? action.error.response.data.message
      //     : "server is not responding"
      // );
      return { ...state, loading2: false, allUpcomingTrips: [], err: "not found" };

    case ON_GET_ALL_TRIP_ONGOING[0]:
      return { ...state, loading2: true };
    case ON_GET_ALL_TRIP_ONGOING[1]:
      return { ...state, loading2: false, allOngoingTrips: action.payload.data };
    case ON_GET_ALL_TRIP_ONGOING[2]:
      // message.error(
      //   action.error.response
      //     ? action.error.response.data.message
      //     : "server is not responding"
      // );
      return { ...state, loading2: false, allOngoingTrips: [], err: "not found" };

    case uploadSingleImage[0]:
      return { ...state, loading2: true };
    case uploadSingleImage[1]:
      return { ...state, loading2: false, uploadImage:action.payload.data };
    case uploadSingleImage[2]:
      // message.error(
      //   action.error.response
      //     ? action.error.response.data.message
      //     : "server is not responding"
      // );
      return { ...state, loading2: false,  err: "not found" };

      case ON_GET_PUSH_NOTI_TOKEN[0]:
      return { ...state, loading5: true };
    case ON_GET_PUSH_NOTI_TOKEN[1]:
      return { ...state, loading5: false };
    case ON_GET_PUSH_NOTI_TOKEN[2]:
      // message.error(
      //   action.error.response
      //     ? action.error.response.data.message
      //     : "server is not responding"
      // );
      return { ...state, loading5: false };
      
    default:
      return state;
  }
};
