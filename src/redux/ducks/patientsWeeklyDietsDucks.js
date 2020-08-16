import axios from "axios";

// Types
const GET_WEEKLY_DIETS = "GET_WEEKLY_DIETS";

const initialState = {
  weeklyDiets: [],
};

// Reducer
export default function controlReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WEEKLY_DIETS:
      return { ...state, weeklyDiets: action.payload };
    default:
      return state;
  }
}

// Action creators
export const getWeeklyDiets = (rut) => (dispatch) => {
  axios
    .get(`/patientsWeeklyDiets/getWeeklyDiets/${rut}/patient`)
    .then((res) => {
      if (res.data.Weekly_Diets.length === 0) {
        dispatch({ type: GET_WEEKLY_DIETS, payload: ["error"] });
      } else {
        dispatch({ type: GET_WEEKLY_DIETS, payload: res.data.Weekly_Diets });
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: GET_WEEKLY_DIETS, payload: ["error"] });
    });
};
