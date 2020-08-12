import axios from "axios";

// Types
const ADD_PATIENT_WEEKLY_DIET = "ADD_PATIENT_WEEKLY_DIET";
const ADD_PATIENT_ERROR_WEEKLY_DIET = "ADD_PATIENT_ERROR_WEEKLY_DIET";
const CLEAR_ERRORS = "CLEAR_ERRORS";
const GET_PATIENT_WEEKLY_DIET = "GET_PATIENT_WEEKLY_DIET";

const initialState = {
  newWeeklyDietPatient: null,
  errors: null,
  patientsData: [],
};

// Reducer
export default function weeklyDiets(state = initialState, action) {
  switch (action.type) {
    case ADD_PATIENT_WEEKLY_DIET:
      return { ...state, newPatientWeeklyDiet: action.payload };
    case ADD_PATIENT_ERROR_WEEKLY_DIET:
      return { ...state, errors: action.payload };
    case CLEAR_ERRORS:
      return { ...state, errors: null };
    case GET_PATIENT_WEEKLY_DIET:
      return { ...state, patientsWeeklyDietData: action.payload };
    default:
      return state;
  }
  
}




//Tengo que hacer para obtener las horas


//export const getPatients = () => (dispatch) => {
//  axios
//    .get("/patients/getId")
//    .then((res) => {
//     dispatch({ type: GET_PATIENTS, payload: res.data });
//    })
//    .catch((error) => console.log(error));
//};


//tengo que añadir primero una weekly diet

export const addWeeklyDiet = (weeklyPatientData) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  axios
    .post("/patientsWeeklyDiets/addWeeklyDiet", weeklyPatientData)
    .then(() => {
      dispatch({ type: ADD_PATIENT_WEEKLY_DIET, payload: weeklyPatientData });
    })
    .catch((error) => {
      if (error.response.request.status === 400) {
        // rut already in use
        dispatch({
          type: ADD_PATIENT_ERROR_WEEKLY_DIET,
          payload: "Paciente no encontrado",
        });
      }
    });
};


export const modifyWeeklyDiet = (weeklyPatientData) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  axios
    .post("/patientsWeeklyDiets/modifyWeeklyDiets", weeklyPatientData)
    .then(() => {
      dispatch({ type: ADD_PATIENT_WEEKLY_DIET, payload: weeklyPatientData });
    })
    .catch((error) => {
      if (error.response.request.status === 404) {
        // rut already in use
        dispatch({
          type: ADD_PATIENT_ERROR_WEEKLY_DIET,
          payload: "Paciente no encontrado o minuta no encontrada",
        });
      }
    });
};

export const deleteWeeklyDiet = (rut) => (dispatch) => {
  // delete changes the state to inactive
  axios
    .delete("/patientsWeeklyDiets/deleteWeeklyDiet", rut)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => console.log(error.response));
};
