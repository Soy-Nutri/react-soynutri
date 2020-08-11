import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from "./ducks/authDucks";
import patientsReducer from "./ducks/patientsDucks";
import generalInfoReducer from "./ducks/generalInfoDucks";
import carnetReducer from "./ducks/carnet";

const rootReducer = combineReducers({
  auth: authReducer,
  patients: patientsReducer,
  generalInfo: generalInfoReducer,
  carnet: carnetReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}
