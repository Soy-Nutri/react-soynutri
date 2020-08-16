import axios from "axios";

// Types
const GET_DAILY_DIETS = "GET_DAILY_DIETS";
const ADD_DAILY_DIETS = "ADD_DAILY_DIETS";
const GET_DAILY_DIETS_ADMIN = "GET_DAILY_DIETS_ADMIN";

const initialState = {
  dailyDiets: [],
  dailyDietsAdmin: [],
  newDailyDiet: "",
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
      console.log(error);
      dispatch({ type: GET_DAILY_DIETS, payload: ["error"] });
    });
};

// add daily diet
export const addDailyDiet = (dailyDietData) => (dispatch) => {
  axios
    .post("patientsDailyDiets/addDailyDiet", dailyDietData)
    .then((res) => {
      dispatch({ type: ADD_DAILY_DIETS, payload: res.data.message });
      console.log(res.data);
    })
    .catch((error) => console.log(error));
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
      console.log(error);
      dispatch({ type: GET_DAILY_DIETS_ADMIN, payload: ["error"] });
    });
};
