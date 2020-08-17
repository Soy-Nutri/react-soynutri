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
//for patient
export const getControl = (rut) => (dispatch) => {
  axios
    .get(`/patientsCarnet/getCarnet/patient/${rut}`)
    .then((res) => {
      console.log("Control");
      if (res.data.carnet.length === 0) {
        dispatch({ type: GET_CONTROL, payload: ["error"] });
      } else {
        dispatch({ type: GET_CONTROL, payload: res.data.carnet });
      }
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
      if (res.data.biochemicals.length === 0) {
        dispatch({ type: GET_BIOCHEMICAL, payload: ["error"] });
      } else {
        dispatch({ type: GET_BIOCHEMICAL, payload: res.data.biochemicals });
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: GET_BIOCHEMICAL, payload: ["error"] });
    });
};

export const getControlAdmin = (rut) => (dispatch) => {
  axios
    .get(`/patientsCarnet/getCarnet/admin/${rut}`)
    .then((res) => {
      if (res.data.carnet.length === 0) {
        dispatch({ type: GET_CONTROL, payload: ["error"] });
      } else {
        dispatch({ type: GET_CONTROL, payload: res.data.carnet });
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: GET_CONTROL, payload: ["error"] });
    });
};

export const getBiochemicalAdmin = (rut) => (dispatch) => {
  axios
    .get(`/patientsCarnet/getBiochemical/admin/${rut}`)
    .then((res) => {
      if (res.data.biochemicals.length === 0) {
        dispatch({ type: GET_BIOCHEMICAL, payload: ["error"] });
      } else {
        dispatch({ type: GET_BIOCHEMICAL, payload: res.data.biochemicals });
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: GET_BIOCHEMICAL, payload: ["error"] });
    });
};
