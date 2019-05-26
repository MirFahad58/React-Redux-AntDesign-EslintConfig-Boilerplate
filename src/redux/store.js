import axios from "axios";
import { applyMiddleware, createStore } from "redux";
import { multiClientMiddleware } from "redux-axios-middleware";
import { createLogger } from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import appReducer from "./reducer";

const middleware = [];

const defaultClient = axios.create({
  baseURL:"http://192.168.1.12:8000",
  // process.env.NODE_ENV==="production"?process.env.PROD_URL:process.env.DEV_URL,
  responseType: "json"
});
//
defaultClient.interceptors.request.use(async config => {
  const authToken = await localStorage.getItem("TRUKKR_TOKEN");
  const authToken2 = await localStorage.getItem("TRUKKR_AUTH_TOKEN");
  if (authToken) {
    Object.assign(config, {
      headers: {
        Authorization: `${authToken}`
      }
    });
  } else if (authToken2) {
    Object.assign(config, {
      headers: {
        Authorization: `${authToken2}`
      }
    });
  }

  return config;
});

const clients = {
  default: {
    client: defaultClient
  }
};

const axiosMiddleware = multiClientMiddleware(clients, {
  returnRejectedPromiseOnError: true
});
middleware.push(thunk);
middleware.push(axiosMiddleware);

const persistConfig = {
  version: 0,
  key: "root",
  // whitelist: ["session", "permissions"],
  storage
};

const loggerConfig = {
  duration: true,
  diff: true
};

const loggerMiddleware = createLogger(loggerConfig);

middleware.push(loggerMiddleware);

const persistedReducer = persistReducer(persistConfig, appReducer);

const reduxStore = createStore(
  persistedReducer,
  applyMiddleware(...middleware)
);
const persistor = persistStore(reduxStore);

export default reduxStore;
export { persistor };

