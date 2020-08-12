import axios from "axios";

// Types
const ADD_CONTROL = "ADD_CONTROL";
const CLEAR_ERRORS = "CLEAR_ERRORS";
const ADD_CONTROL_ERROR = "ADD_CONTROL_ERROR";

const initialState = {
  control: null,
  errors: null,
};

// Reducer
export default function patientsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTROL:
      return { ...state, control: action.payload };
    case ADD_CONTROL_ERROR:
      return { ...state, errors: action.payload };
    case CLEAR_ERRORS:
      return { ...state, errors: null };
    default:
      return state;
  }
}

/* ACTION CREATORS */

// add a control
export const addControl = (control) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  control.date = new Date(Date.now()).toISOString();
  axios
    .post("/patientsCarnet/addControl", control)
    .then((res) => {
      dispatch({
        type: ADD_CONTROL,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: ADD_CONTROL_ERROR,
        payload: "Error inesperado!",
      });
    });
};

// view controls
export const getControls = (rut) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  axios
    .get(`/patientsCarnet/getCarnet/admin/${rut}`)
    .then((res) => {
      dispatch({
        type: ADD_CONTROL,
        payload: res.data.carnet,
      });
    })
    .catch((error) => {
      dispatch({
        type: ADD_CONTROL_ERROR,
        payload: "Error inesperado!",
      });
    });
};

// modify control
export const modifyControl = (control, rut, date) => (dispatch) => {
  control.rut = rut;
  control.date = date;
  dispatch({ type: CLEAR_ERRORS });
  axios
    .put("/patientsCarnet/modifyControl", control)
    .then((res) => {
      dispatch({
        type: ADD_CONTROL,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: ADD_CONTROL_ERROR,
        payload: "Error inesperado!",
      });
    });
};
