import axios from "axios";

// Types
const ADD_PATIENT = "ADD_PATIENT";
const SET_ERROR = "SET_ERROR";
const CLEAR_ERROR = "CLEAR_ERROR";
const GET_PATIENTS = "GET_PATIENTS";
const GET_PATIENT_INFO = "GET_PATIENT_INFO";
const CLEAR_PATIENT_INFO = "CLEAR_PATIENT_INFO";
const PATIENT_MODIFIED = "PATIENT_MODIFIED";
const GET_PATIENT_INFO_PATIENT = "GET_PATIENT_INFO_PATIENT";
const MODIFY_PASSWORD = "MODIFY_PASSWORD";
const FILTER_PATIENT = "FILTER_PATIENT";
const GET_STATISTICS = "GET_STATISTICS";

const initialState = {
  newPatient: null,
  errors: null,
  patientsData: [],
  patientsDataFiltered: [],
  patientInfo: null,
  modifiedPatient: false,
  passwordModified: false,
  statistics: null,
};

/* REDUCER */
export default function patientsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PATIENT:
      return { ...state, newPatient: action.payload };
    case SET_ERROR:
      return { ...state, errors: action.payload };
    case CLEAR_ERROR:
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
    case MODIFY_PASSWORD:
      return { ...state, passwordModified: true };
    case FILTER_PATIENT:
      let list = state.patientsData;
      const patientsDataFiltered = list.filter((patient) =>
        patient.names
          .concat(patient.father_last_name)
          .concat(patient.mother_last_name)
          .concat(patient.rut)
          .toLowerCase()
          .includes(action.payload.toLowerCase())
      );
      return { ...state, patientsDataFiltered };
    case GET_STATISTICS:
      return { ...state, statistics: action.payload };
    default:
      return state;
  }
}

/* ACTION CREATORS */

// add a patient
export const addPatient = (patientData) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  axios
    .post("/patientsAuth/signup", patientData)
    .then(() => {
      dispatch({ type: ADD_PATIENT, payload: patientData });
    })
    .catch((error) => {
      if (error.response.request.status === 409) {
        // rut already in use
        dispatch({
          type: SET_ERROR,
          payload: "Este rut ya está registrado!",
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: "Ha ocurrido un error inesperado!",
        });
      }
    });
};

// get a list of patient with basic info
export const getPatientsList = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  axios
    .get("/patients/getId")
    .then((res) => {
      dispatch({ type: GET_PATIENTS, payload: res.data });
    })
    .catch(() => {
      dispatch({
        type: SET_ERROR,
        payload: "Ha ocurrido un error inesperado!",
      });
    });
};

// delete a patient by rut
export const deletePatient = (rut) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  // delete changes the state to inactive
  axios
    .post("/patients/deletePerfil", rut)
    .then(() => {})
    .catch((error) => {
      if (error.response.request.status === 404) {
        dispatch({
          type: SET_ERROR,
          payload: "No se ha encontrado al paciente solicitado!",
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: "Ha ocurrido un error inesperado!",
        });
      }
    });
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
    .catch((error) => {
      if (error.response.request.status === 404) {
        dispatch({
          type: SET_ERROR,
          payload: "No se ha encontrado al paciente solicitado!",
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: "Ha ocurrido un error inesperado!",
        });
      }
    });
};

// modify a patient
export const modifyPatient = (data) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  axios
    .post(`/patients/modifyPerfil`, data)
    .then(() => dispatch({ type: PATIENT_MODIFIED }))
    .catch((error) => {
      if (error.response.request.status === 404) {
        dispatch({
          type: SET_ERROR,
          payload: "No se encuentra el paciente!",
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: "Ha ocurrido un error inesperado!",
        });
      }
    });
  await new Promise((r) => setTimeout(r, 2000));
};

// get all info of a patient by rut (required by the patient)
export const getPatientInfoPatient = (rut) => (dispatch) => {
  axios
    .get(`/patients/getPerfil/${rut}/patient`)
    .then((res) => {
      dispatch({ type: GET_PATIENT_INFO_PATIENT, payload: res.data });
    })
    .catch((error) => {
      if (error.response.request.status === 404) {
        dispatch({
          type: SET_ERROR,
          payload: "No se ha encontrado al paciente solicitado!",
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: "Ha ocurrido un error inesperado!",
        });
      }
    });
};

// Modify patient password
export const modifyPassword = (data) => (dispatch) => {
  axios
    .post("/patientsAuth/changePassword", data)
    .then((res) => {
      dispatch({ type: MODIFY_PASSWORD });
    })
    .catch((error) => {
      if (error.response.request.status === 404) {
        dispatch({
          type: SET_ERROR,
          payload: "No se ha encontrado al paciente solicitado!",
        });
      } else if (error.response.request.status === 409) {
        dispatch({
          type: SET_ERROR,
          payload: "Usuario/contraseña erronea!",
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: "Ha ocurrido un error inesperado!",
        });
      }
    });
};

// when it is searching a patient
export const filterPatient = (data) => (dispatch) => {
  dispatch({ type: FILTER_PATIENT, payload: data });
};

// get statistics to admin dashboard
export const getStatistics = () => (dispatch) => {
  axios
    .get("/patients/getStatistics")
    .then((res) => dispatch({ type: GET_STATISTICS, payload: res.data }))
    .catch(() =>
      dispatch({
        type: SET_ERROR,
        payload: "Ha ocurrido un error inesperado!",
      })
    );
};
