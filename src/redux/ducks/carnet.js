import axios from "axios";

// Types
const GET_CONTROL = "GET_CONTROL";

const initialState = {
  control: [],
};

// Reducer
export default function controlReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONTROL:
      return { ...state, control: action.payload };
    default:
      return state;
  }
}

// Action creators
export const getControl = (rut) => (dispatch) => {
  axios
    .get(`/patientsCarnet/getCarnet/patient/${rut}`)
    .then((res) => {
      dispatch({ type: GET_CONTROL, payload: res.data.carnet });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: GET_CONTROL, payload: [] });
    });
};
