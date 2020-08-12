import axios from "axios";

// Types
const ADD_PATIENT = "ADD_PATIENT";
const ADD_PATIENT_ERROR = "ADD_PATIENT_ERROR";
const CLEAR_ERRORS = "CLEAR_ERRORS";
const GET_PATIENTS = "GET_PATIENTS";
const GET_PATIENT_INFO = "GET_PATIENT_INFO";
const CLEAR_PATIENT_INFO = "CLEAR_PATIENT_INFO";
const PATIENT_MODIFIED = "PATIENT_MODIFIED";
const GET_PATIENT_INFO_PATIENT = "GET_PATIENT_INFO_PATIENT";
const MODIFY_PASSWORD = "MODIFY_PASSWORD";


const initialState = {
  newPatient: null,
  errors: null,
  patientsData: [],
  patientInfo: null,
  modifiedPatient: false,
  passwordModified: false,
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
    case GET_PATIENT_INFO:
      return { ...state, patientInfo: action.payload };
    case CLEAR_PATIENT_INFO:
      return { ...state, patientInfo: null };
    case PATIENT_MODIFIED:
      return { ...state, modifiedPatient: true };
    case GET_PATIENT_INFO_PATIENT:
      return { ...state, patientInfo: action.payload };
    case DELETE_PATIENT:
      return { ...state };
    case MODIFY_PASSWORD:
      return { ...state, passwordModified: true };
    default:
      return state;
  }
}

/* ACTION CREATORS */

// add a patient
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

// get a list of patient with basic info
export const getPatientsList = () => (dispatch) => {
  axios
    .get("/patients/getId")
    .then((res) => {
      dispatch({ type: GET_PATIENTS, payload: res.data });
    })
    .catch((error) => console.log(error));
};

// delete a patient by rut
export const deletePatient = (rut) => async (dispatch) => {
  // delete changes the state to inactive
  axios
    .post("/patients/deletePerfil", rut)
    .then(() => {})
    .catch((error) => console.log(error.response));
  await new Promise((r) => setTimeout(r, 2000));
  window.location.href = "/";
};

// get all info of a patient by rut (required by the admin)
export const getPatientInfo = (rut) => (dispatch) => {
  dispatch({ type: CLEAR_PATIENT_INFO });
  axios
    .get(`/patients/getPerfil/${rut}/admin`)
    .then((res) => {
      dispatch({ type: GET_PATIENT_INFO, payload: res.data });
    })
    .catch((error) => console.log(error));
};


// modify a patient
export const modifyPatient = (data) => (dispatch) => {
  axios
    .post(`/patients/modifyPerfil`, data)
    .then(() => dispatch({ type: PATIENT_MODIFIED }))
    .catch((error) => console.log(error.message));

// get all info of a patient by rut (required by the patient)
export const getPatientInfoPatient = (rut) => (dispatch) => {
  axios
    .get(`/patients/getPerfil/${rut}/patient`)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: GET_PATIENT_INFO_PATIENT, payload: res.data });
    })
    .catch((error) => console.log(error));
};

// Modify password patient
export const modifyPassword = (data) => (dispatch) => {
  axios
    .post("/patientsAuth/changePassword", data)
    .then((res) => {
      dispatch({ type: MODIFY_PASSWORD });
    })
    .catch((error) => console.log(error));
};
