import axios from "axios";

// Types
const ADD_WEEKLY_DIET = "ADD_WEEKLY_DIET";
const ADD_ERROR_WEEKLY_DIET = "ADD_ERROR_WEEKLY_DIET";
const CLEAR_ERRORS = "CLEAR_ERRORS";
const GET_WEEKLY_DIETS = "GET_WEEKLY_DIETS";
const GET_ERROR_WEEKLY_DIETS = "GET_ERROR_WEEKLY_DIETS";
const DELETE_ERROR = "DELETE_ERROR";

const CLEAR_DELETE_ERRORS = "CLEAR_DELETE_ERRORS";

const initialState = {
  weeklyDiets: null,
  errors: null,
  getweeklyDiets: [],
  deleteErrors: null,
};

// Reducer
export default function weeklyDietsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_WEEKLY_DIET:
      return { ...state, weeklyDiets: action.payload };
    case ADD_ERROR_WEEKLY_DIET:
      return { ...state, errors: action.payload };
    case GET_WEEKLY_DIETS:
      return { ...state, getweeklyDiets: action.payload };
    case GET_ERROR_WEEKLY_DIETS:
      return { ...state, errors: action.payload };
    case DELETE_ERROR:
      return { ...state, deleteErrors: action.payload };
    case CLEAR_ERRORS:
      return { ...state, errors: null };
    case CLEAR_DELETE_ERRORS:
      return { ...state, deleteErrors: null };
    default:
      return state;
  }
}

//Añadir weekly diet

export const addWeeklyDiet = (weeklyDiets) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  axios
    .post("/patientsWeeklyDiets/addWeeklyDiet", weeklyDiets)
    .then((res) => {
      dispatch({ type: ADD_WEEKLY_DIET, payload: res.data });
    })
    .catch((error) => {
      dispatch({
        type: ADD_ERROR_WEEKLY_DIET,
        payload: "Paciente no encontrado",
      });
    });
};

// Ver controles

export const getWeeklyDiets = (rut) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: GET_WEEKLY_DIETS, payload: [] });
  axios
    .get(`/patientsWeeklyDiets/getWeeklyDiets/${rut}/${"admin"}`)
    .then((res) => {
      if (res.data.Weekly_Diets.length === 0) {
        dispatch({ type: GET_WEEKLY_DIETS, payload: "error" });
      } else {
        let date = res.data.Weekly_Diets[0];
        for (let i = 0; i < res.data.Weekly_Diets.length; i++) {
          if (res.data.Weekly_Diets[i].date > date.date) {
            date = res.data.Weekly_Diets[i];
          }
        }

        dispatch({ type: GET_WEEKLY_DIETS, payload: date });
      }
    })

    .catch((error) => {
      dispatch({
        type: GET_ERROR_WEEKLY_DIETS,
        payload: "Error inesperado!",
      });
    });
};

export const getAllWeeklyDiets = (rut) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: GET_WEEKLY_DIETS, payload: [] });

  axios
    .get(`/patientsWeeklyDiets/getWeeklyDiets/${rut}/${"admin"}`)
    .then((res) => {
      if (res.data.Weekly_Diets.length === 0) {
        dispatch({ type: GET_WEEKLY_DIETS, payload: ["error"] });
      } else {
        dispatch({ type: GET_WEEKLY_DIETS, payload: res.data.Weekly_Diets });
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_ERROR_WEEKLY_DIETS,
        payload: "Error inesperado!",
      });
    });
};
//modificar weeklydiet

export const modifyWeeklyDiet = (weeklyDiets) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  axios

    .put("/patientsWeeklyDiets/modifyWeeklyDiets", weeklyDiets)
    .then((res) => {
      dispatch(getWeeklyDiets(weeklyDiets.rut));
    })
    .catch((error) => {
      dispatch({
        type: ADD_ERROR_WEEKLY_DIET,
        payload: "Paciente no encontrado o minuta no encontrada",
      });
    });
};

export const deleteWeeklyDiet = (rut, fecha) => async (dispatch) => {
  // delete changes the state to inactive
  dispatch({ type: CLEAR_DELETE_ERRORS });
  var a = { rut: rut, date: fecha };

  axios
    .post("/patientsWeeklyDiets/deleteWeekOfWeeklyDiets", a)
    .then((res) => {
      if (res.data.messaje !== "Delete Week.") {
        dispatch({
          type: DELETE_ERROR,
          PAYLOAD: "Error inesperado!",
        });
      } else {
        dispatch(getAllWeeklyDiets(rut));
      }
    })
    .catch((error) => {
      dispatch({
        type: DELETE_ERROR,
        PAYLOAD: "Error inesperado!",
      });
    });
};
