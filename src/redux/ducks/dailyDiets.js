import axios from "axios";

// Types
const GET_DAILY_DIETS = "GET_DAILY_DIETS";

const initialState = {
  dailyDiets: [],
};

// Reducer
export default function controlReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DAILY_DIETS:
      return { ...state, dailyDiets: action.payload };
    default:
      return state;
  }
}

// Action creators
export const getDailyDiets = (rut) => (dispatch) => {
  axios
    .get(`/patientsDailyDiets/getDailyDiet/patient/${rut}`)
    .then((res) => {
      dispatch({ type: GET_DAILY_DIETS, payload: res.data.daily_diets });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: GET_DAILY_DIETS, payload: ["error"] });
    });
};
