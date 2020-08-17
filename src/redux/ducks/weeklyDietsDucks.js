import axios from "axios";


// Types
const ADD_WEEKLY_DIET = "ADD_WEEKLY_DIET";
const ADD_ERROR_WEEKLY_DIET = "ADD_ERROR_WEEKLY_DIET";
const CLEAR_ERRORS = "CLEAR_ERRORS";
const GET_WEEKLY_DIETS = "GET_WEEKLY_DIETS";
const GET_ERROR_WEEKLY_DIETS = "GET_ERROR_WEEKLY_DIETS";
const DELETE_ERROR = "DELETE_ERROR";

const CLEAR_DELETE_ERRORS = "CLEAR_DELETE_ERRORS";

const initialState = {
  weeklyDiets: null,
  errors: null,
  getweeklyDiets: [],
  deleteErrors:null
};

// Reducer
export default function weeklyDietsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_WEEKLY_DIET:
      return { ...state, weeklyDiets: action.payload };
    case ADD_ERROR_WEEKLY_DIET:
      return { ...state, errors: action.payload };
    case GET_WEEKLY_DIETS:
      return { ...state, getweeklyDiets: action.payload };
    case GET_ERROR_WEEKLY_DIETS:
      return { ...state, errors: action.payload };
    case DELETE_ERROR:
      return{...state,deleteErrors:action.payload};
    case CLEAR_ERRORS:
      return { ...state, errors: null };
    case CLEAR_DELETE_ERRORS:
      return { ...state, deleteErrors: null };
    default:
      return state;
  }
}

//Tengo que hacer para obtener las horas

//export const getPatients = () => (dispatch) => {
//  axios
//    .get("/patients/getId")
//    .then((res) => {
//     dispatch({ type: GET_PATIENTS, payload: res.data });
//    })
//    .catch((error) => console.log(error));
//};

//Añadir weekly diet

export const addWeeklyDiet = (weeklyDiets) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  axios
    .post("/patientsWeeklyDiets/addWeeklyDiet", weeklyDiets)
    .then((res) => {
      dispatch({ type: ADD_WEEKLY_DIET, payload: res.data });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: ADD_ERROR_WEEKLY_DIET,
        payload: "Paciente no encontrado",
      });
    });
};

// Ver controles

export const getWeeklyDiets = (rut) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  console.log("este es el rut" +rut);
  axios
    .get(`/patientsWeeklyDiets/getWeeklyDiets/${rut}/${"admin"}`)
    .then((res) => {
      if (res.data.Weekly_Diets.length === 0) {
        dispatch({ type: GET_WEEKLY_DIETS, payload: "error" });
      } else {
        let date = res.data.Weekly_Diets[0];
        for (let i = 0; i < res.data.Weekly_Diets.length; i++) {
          if (res.data.Weekly_Diets[i].date > date.date) {
            date = res.data.Weekly_Diets[i];
          }
        }
        console.log("SOY EL DATE",date);
        dispatch({ type: GET_WEEKLY_DIETS, payload: date });
      }
    })

    .catch((error) => {
      console.log(error);
      dispatch({
        type: GET_ERROR_WEEKLY_DIETS,
        payload: "Error inesperado!",
      });
    });
};

export const getAllWeeklyDiets = (rut) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  console.log( )
  axios
    .get(`/patientsWeeklyDiets/getWeeklyDiets/${rut}/${"admin"}`)
    .then((res) => {
      console.log("soy el res data de all weekly" +res.data.Weekly_Diets.length);
      for (let i = 0; i < res.data.Weekly_Diets.length; i++) {
       
        
            if (res.data.Weekly_Diets.length === 0) {
              dispatch({ type: GET_WEEKLY_DIETS, payload: "error tiene largo 0" });
            } else {
              dispatch({ type: GET_WEEKLY_DIETS, payload: res.data.Weekly_Diets });
            }
        
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_ERROR_WEEKLY_DIETS,
        payload: "Error inesperado!",
      });
    });
};
//modificar weeklydiet

export const modifyWeeklyDiet = (weeklyDiets) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  console.log("ESTE  WeeklyDiets");
  console.log(weeklyDiets);

  axios

    .put("/patientsWeeklyDiets/modifyWeeklyDiets", weeklyDiets)
    .then((res) => {

      console.log("dsps de modify" +res.data);
      dispatch(getWeeklyDiets(weeklyDiets.rut));
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: ADD_ERROR_WEEKLY_DIET,
        payload: "Paciente no encontrado o minuta no encontrada",
      });
    });
};

export const deleteWeeklyDiet = (rut,fecha) =>async (dispatch) => {
  // delete changes the state to inactive
  dispatch({ type: CLEAR_DELETE_ERRORS });
  var a = {"rut":rut,"date":fecha};
 
  axios
    .post("/patientsWeeklyDiets/deleteWeekOfWeeklyDiets",a)
    .then((res) => {
      if(res.data.messaje !=="Delete Week." ){
        console.log("que error es3"+ res.data);  
        dispatch({
          type:DELETE_ERROR,
          PAYLOAD:"Error inesperado!",
        });
      }else{
        
        dispatch(getAllWeeklyDiets(rut))
      }
      
    })
    .catch((error) => {
      console.log("que error es"+ error);
      dispatch({
          type:DELETE_ERROR,
          PAYLOAD:"Error inesperado!",
      });
    });
};
