import axios from "axios";

// Types
const ADD_PATIENT = "ADD_PATIENT";

const initialState = {
  newPatient: {},
};

// Reducer
export default function patientsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PATIENT:
      return { ...state, newPatient: action.payload };
    default:
      return state;
  }
}

// Action creators
export const addPatient = (patientData) => (dispatch) => {
  axios
    .post("/patientsAuth/signup", patientData)
    .then(dispatch({ type: ADD_PATIENT, payload: patientData }))
    .catch((error) => console.log(error));
};
