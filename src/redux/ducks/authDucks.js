import axios from "axios";

// Actions | Types
const SET_USER = "SET_USER";

const initialState = {
  rol: "",
};

// Reducer
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, rol: "hola" };
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
    axios.post("/patientsAuth/login", userData).then((res) => {
      setAuthorizationHeader(res.data.token);
      localStorage.setItem("rol", "/paciente");
      window.location.reload();
      window.location.href = "/";
    });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  localStorage.removeItem("rol");
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
