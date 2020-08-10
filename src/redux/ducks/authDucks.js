import axios from "axios";

const initialState = {
  rol: "",
  perfil: {},
};

// Actions | Types
const SET_USER = "SET_USER";
const SET_PERFIL = "SET_PERFIL";

// Reducer
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, rol: "hola" };
    case SET_PERFIL:
      return { ...state, perfil: action.payload };
    default:
      return state;
  }
}

// Actions creators
export const loginUser = (userData) => (dispatch) => {
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
        return console.log(error);
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
          type: SET_PERFIL,
          payload: res.data,
        });
        window.location.reload();
        window.location.href = "/";
      })
      .catch((error) => {
        return console.log(error);
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
