import axios from "axios";

// Types
const ADD_PATIENT = "ADD_PATIENT";
const ADD_PATIENT_ERROR = "ADD_PATIENT_ERROR";
const CLEAR_ERRORS = "CLEAR_ERRORS";
const GET_PATIENTS = "GET_PATIENTS";

const initialState = {
  newPatient: null,
  errors: null,
  patientsData: [],
};

// Reducer
export default function patientsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PATIENT:
      return { ...state, newPatient: action.payload };
    case ADD_PATIENT_ERROR:
      return { ...state, errors: action.payload };
    case CLEAR_ERRORS:
      return { ...state, errors: null };
    case GET_PATIENTS:
      return { ...state, patientsData: action.payload };
    default:
      return state;
  }
}

// Action creators
export const addPatient = (patientData) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  axios
    .post("/patientsAuth/signup", patientData)
    .then(() => {
      dispatch({ type: ADD_PATIENT, payload: patientData });
    })
    .catch((error) => {
      if (error.response.request.status === 409) {
        // rut already in use
        dispatch({
          type: ADD_PATIENT_ERROR,
          payload: "Este rut ya está registrado!",
        });
      }
    });
};

export const getPatients = () => (dispatch) => {
  axios
    .get("/patients/getId")
    .then((res) => {
      dispatch({ type: GET_PATIENTS, payload: res.data });
    })
    .catch((error) => console.log(error));
};
