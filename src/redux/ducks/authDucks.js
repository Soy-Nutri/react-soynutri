import axios from "axios";

const initialState = {
  rol: "",
  perfil: {},
  error: null,
};

// Actions | Types
const SET_USER = "SET_USER";
const SET_PROFILE = "SET_PROFILE";
const SET_LOGIN_ERROR = "SET_LOGIN_ERROR";
const CLEAR_LOGIN_ERROR = "CLEAR_LOGIN_ERROR";

// Reducer
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, rol: "hola" };
    case SET_PROFILE:
      return { ...state, perfil: action.payload };
    case SET_LOGIN_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_LOGIN_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}

// Actions creators
export const loginUser = (userData) => (dispatch) => {
  dispatch({ type: CLEAR_LOGIN_ERROR });
  if (userData.rut.substring(0, 1) === "#") {
    userData.rut = userData.rut.replace("#", "");
    axios
      .post("/adminAuth/login", userData)
      .then((res) => {
        setAuthorizationHeader(res.data.token);
        localStorage.setItem("rol", "/soynutri-adm");
        dispatch({
          type: SET_USER,
        });
        window.location.reload();
        window.location.href = "/";
      })
      .catch((error) => {
        if (
          error.response.request.status === 404 ||
          error.response.request.status === 409
        ) {
          dispatch({
            type: SET_LOGIN_ERROR,
            payload: "Usuario/contraseña erronea!",
          });
        } else {
          dispatch({
            type: SET_LOGIN_ERROR,
            payload: "Ha ocurrido un error inesperado!",
          });
        }
      });
  } else {
    axios
      .post("/patientsAuth/login", userData)
      .then((res) => {
        setAuthorizationHeader(res.data.token);
        localStorage.setItem("rol", "/paciente");
        localStorage.setItem(
          "nick",
          res.data.names[0] + res.data.father_last_name[0]
        );
        localStorage.setItem("rut", res.data.rut);
        localStorage.setItem("date", res.data.birth_date);
        localStorage.setItem(
          "name",
          `${res.data.names} ${res.data.father_last_name} ${res.data.mother_last_name}`
        );
        dispatch({
          type: SET_PROFILE,
          payload: res.data,
        });
        window.location.reload();
        window.location.href = "/";
      })
      .catch((error) => {
        if (error.response.request.status === 400) {
          dispatch({
            type: SET_LOGIN_ERROR,
            payload: "Tu cuenta está desactivada!",
          });
        } else if (
          error.response.request.status === 404 ||
          error.response.request.status === 409
        ) {
          dispatch({
            type: SET_LOGIN_ERROR,
            payload: "Usuario/contraseña erronea!",
          });
        } else {
          dispatch({
            type: SET_LOGIN_ERROR,
            payload: "Ha ocurrido un error inesperado!",
          });
        }
      });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  localStorage.removeItem("rol");
  localStorage.removeItem("nick");
  localStorage.removeItem("rut");
  localStorage.removeItem("date");
  localStorage.removeItem("name");
  delete axios.defaults.headers.common["Authorization"];
  window.location.reload();
  window.location.href = "/";
};

// helper functions
const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  // axios allow to 'save' the authorization instead of using a bunch of times
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
