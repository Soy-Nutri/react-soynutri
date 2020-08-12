import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from "./ducks/authDucks";
import patientsReducer from "./ducks/patientsDucks";
import carnetReducer from "./ducks/patientsCarnetDucks";
import dailyDietsReducer from "./ducks/patientsDailyDietsDuck";
import patientWeeklyDietsReducer from "./ducks/patientsWeeklyDietsDucks";
import generalInfoReducer from "./ducks/generalInfoDucks";

const rootReducer = combineReducers({
  auth: authReducer,
  patients: patientsReducer,
  carnet: carnetReducer,
  dailyDiets: dailyDietsReducer,
  patientWeeklyDiets: patientWeeklyDietsReducer,
  generalInfo: generalInfoReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}
