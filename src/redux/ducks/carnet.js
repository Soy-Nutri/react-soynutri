import axios from "axios";

// Types
const GET_CONTROL = "GET_CONTROL";
const GET_BIOCHEMICAL = "GET_BIOCHEMICAL";

const initialState = {
  control: [],
  biochemical: [],
};

// Reducer
export default function controlReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONTROL:
      return { ...state, control: action.payload };
    case GET_BIOCHEMICAL:
      return { ...state, biochemical: action.payload };
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
      dispatch({ type: GET_CONTROL, payload: ["error"] });
    });
};

export const getBiochemical = (rut) => (dispatch) => {
  axios
    .get(`/patientsCarnet/getBiochemical/patient/${rut}`)
    .then((res) => {
      dispatch({ type: GET_BIOCHEMICAL, payload: res.data.biochemicals });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: GET_BIOCHEMICAL, payload: ["error"] });
    });
};
