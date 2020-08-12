import axios from "axios";
//Constantes
const generalInfo = {
  infoNutri: [],
};

const GET_GENERAL_INFO = "GET_GENERAL_INFO";
//Reducer
export default function generalInfoReducer(state = generalInfo, action) {
  switch (action.type) {
    case GET_GENERAL_INFO:
      return { ...state, infoNutri: action.payload };
    default:
      return state;
  }
}
//Acciones
export const getGeneralInfoAccion = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(
      "https://us-central1-back-f0378.cloudfunctions.net/api/generalInfo/getInfo"
    );
    dispatch({
      type: GET_GENERAL_INFO,
      payload: res.data,
    });
  } catch (error) {
    console.error();
  }
};
