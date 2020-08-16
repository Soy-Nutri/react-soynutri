import axios from "axios";

// Types
const ADD_CONTROL = "ADD_CONTROL";
const CLEAR_ERRORS = "CLEAR_ERRORS";
const ADD_CONTROL_ERROR = "ADD_CONTROL_ERROR";
const DELETE_ERROR = "DELETE_ERROR";
const CLEAR_DELETE_ERRORS = "CLEAR_DELETE_ERRORS";

const initialState = {
  control: null,
  errors: null,
  deleteErrors: null,
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
    case DELETE_ERROR:
      return { ...state, deleteErrors: action.payload };
    case CLEAR_DELETE_ERRORS:
      return { ...state, deleteErrors: null };
    default:
      return state;
  }
}

/* ACTION CREATORS */

// add a control
export const addControl = (control) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  control.date = new Date(Date.now()).toISOString().substring(0, 10);
  console.log(control.date);
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
export const modifyControl = (control, rut, date) => (dispatch, getState) => {
  control.rut = rut;
  control.date = date;
  dispatch({ type: CLEAR_ERRORS });
  axios
    .put("/patientsCarnet/modifyControl", control)
    .then((res) => {
      if (res.data.message !== "Change data.") {
        dispatch({
          type: ADD_CONTROL_ERROR,
          payload: "Error inesperado!",
        });
      } else {
        dispatch(getControls(rut));
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_CONTROL_ERROR,
        payload: "Error inesperado!",
      });
    });
};

// delete control
export const deleteControl = (rut, date) => async (dispatch) => {
  dispatch({ type: CLEAR_DELETE_ERRORS });
  const params = { rut, date: date.toString().substring(0, 10) };
  //console.log(params);
  axios
    .post("/patientsCarnet/deleteControl", params)
    .then((res) => {
      if (res.data.messaje !== "The controls was delete.") {
        dispatch({
          type: DELETE_ERROR,
          payload: "Error inesperado!",
        });
      } else {
        dispatch(getControls(rut));
      }
    })
    .catch((error) => {
      dispatch({
        type: DELETE_ERROR,
        payload: "Error inesperado!",
      });
    });
};
