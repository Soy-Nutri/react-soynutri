import axios from "axios";

// Types
const GET_DAILY_DIETS = "GET_DAILY_DIETS";
const ADD_DAILY_DIETS = "ADD_DAILY_DIETS";
const GET_DAILY_DIETS_ADMIN = "GET_DAILY_DIETS_ADMIN";
const DELETE_ERROR = "DELETE_ERROR";
const CLEAR_DELETE_ERRORS = "CLEAR_DELETE_ERRORS";
const CLEAR_ERRORS = "CLEAR_ERRORS";
const MODIFY_RES = "MODIFY_RES";

const initialState = {
  dailyDiets: [],
  dailyDietsAdmin: [],
  newDailyDiet: "",
  errors: null,
  deleteErrors: null,
  modifyRes: "",
};

// Reducer
export default function controlReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DAILY_DIETS:
      return { ...state, dailyDiets: action.payload };
    case GET_DAILY_DIETS_ADMIN:
      return { ...state, dailyDietsAdmin: action.payload };
    case ADD_DAILY_DIETS:
      return { ...state, newDailyDiet: action.payload };
    case CLEAR_ERRORS:
      return { ...state, errors: null };
    case DELETE_ERROR:
      return { ...state, deleteErrors: action.payload };
    case CLEAR_DELETE_ERRORS:
      return { ...state, deleteErrors: null };
    case MODIFY_RES:
      return { ...state, modifyRes: action.payload };
    default:
      return state;
  }
}

// Action creators
export const getDailyDiets = (rut) => (dispatch) => {
  axios
    .get(`/patientsDailyDiets/getDailyDiet/patient/${rut}`)
    .then((res) => {
      if (res.data.daily_diets.length === 0) {
        dispatch({ type: GET_DAILY_DIETS, payload: ["error"] });
      } else {
        dispatch({ type: GET_DAILY_DIETS, payload: res.data.daily_diets });
      }
    })
    .catch((error) => {
      dispatch({ type: GET_DAILY_DIETS, payload: ["error"] });
    });
};

// add daily diet
export const addDailyDiet = (dailyDietData) => (dispatch) => {
  axios
    .post("patientsDailyDiets/addDailyDiet", dailyDietData)
    .then((res) => {
      dispatch({ type: ADD_DAILY_DIETS, payload: "ok" });
    })
    .catch((error) => dispatch({ type: ADD_DAILY_DIETS, payload: "error" }));
};

// see daily diet
export const getDailyDietsAdmin = (rut) => (dispatch) => {
  axios
    .get(`/patientsDailyDiets/getDailyDiet/admin/${rut}`)
    .then((res) => {
      if (res.data.daily_diets.length === 0) {
        dispatch({ type: GET_DAILY_DIETS_ADMIN, payload: ["error"] });
      } else {
        dispatch({
          type: GET_DAILY_DIETS_ADMIN,
          payload: res.data.daily_diets,
        });
      }
    })
    .catch((error) => {
      dispatch({ type: GET_DAILY_DIETS_ADMIN, payload: ["error"] });
    });
};

// delete DailyDiets
export const deleteDailyDiets = (rut, date) => async (dispatch) => {
  dispatch({ type: CLEAR_DELETE_ERRORS });
  const params = { rut, date };

  axios
    .post("/patientsDailyDiets/deleteDailyDiet", params)
    .then((res) => {
      if (res.data.message !== "Se ha eliminado la pauta diaria.") {
        dispatch({
          type: DELETE_ERROR,
          payload: "Error inesperado!",
        });
      } else {
        dispatch(getDailyDietsAdmin(rut));
      }
    })
    .catch((error) => {
      dispatch({
        type: DELETE_ERROR,
        payload: "Error inesperado!",
      });
    });
};

// modify daily diet
export const modifyDailyDiets = (daily) => async (dispatch) => {
  axios
    .put(`/patientsDailyDiets/modifyDailyDiet`, daily)
    .then((res) => {
      if (res.data.message === "Pauta diaria modificada.") {
        dispatch({ type: MODIFY_RES, payload: "ok" });
      } else {
        dispatch({ type: MODIFY_RES, payload: "error" });
      }
    })
    .catch((error) => {
      dispatch({ type: MODIFY_RES, payload: "error" });
    });
};
