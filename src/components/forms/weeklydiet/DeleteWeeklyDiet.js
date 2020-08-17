import React from "react";
import styled from "styled-components";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import MenuItem from "@material-ui/core/MenuItem";

import Skeleton from "@material-ui/lab/Skeleton";

import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

// import Snackbar from "@material-ui/core/Snackbar";
// import MuiAlert from "@material-ui/lab/Alert";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

//import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

import TableDelete from "./TableDeleteWeeklyDiet";
//Redux
import { getPatientInfo } from "../../../redux/ducks/patientsDucks";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteWeeklyDiet,
  getAllWeeklyDiets,
  getWeeklyDiets,
} from "../../../redux/ducks/weeklyDietsDucks";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DeleteWeeklyDietStyled = styled.div`
  /* Hidde spinner number input Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Hidde spinner number input Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
  /* ------- */
  margin-bottom: 2em;
  .form {
    margin-left: 1em;
    margin-right: 1em;
  }
  .form-button {
    margin-top: 1em;
  }

  .title {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1em;
    font-family: yellowtail;
    font-size: 3.5em;
    /* color: var(--mainPurple); */
  }

  @media screen and (min-width: 600px) {
    .MuiGrid-root.margin.MuiGrid-item.MuiGrid-grid-md-1,
    .MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-1 {
      display: none;
    }
    .texto {
      margin-right: 0.2px;
    }
    .semana {
      margin-top: 15px;
      margin-left: 15px;
    }
    .hola {
      margin-left: 0px;
    }
    .lunch-picker {
      margin-right: 0.1px;
    }

    .grid-invisible {
      display: none;
    }
  }
  @media screen and (min-width: 960px) {
    .grid-invisible {
      display: block;
    }
  }
`;

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const useStyles = makeStyles((theme) => ({
  //falta hacerlo responsive
  root: {
    marginLeft: 350,
    marginTop: 20,
    width: "100%",
    maxWidth: 1000,
  },
}));

function formateaRut(rut) {
  var actual = rut.replace(/^0+/, "");
  if (actual !== "" && actual.length > 1) {
    var sinPuntos = actual.replace(/\./g, "");
    var actualLimpio = sinPuntos.replace(/-/g, "");
    var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
    var rutPuntos = "";
    var i = 0;
    var j = 1;
    for (i = inicio.length - 1; i >= 0; i--) {
      var letra = inicio.charAt(i);
      rutPuntos = letra + rutPuntos;
      if (j % 3 === 0 && j <= inicio.length - 1) {
        rutPuntos = "." + rutPuntos;
      }
      j++;
    }
    var dv = actualLimpio.substring(actualLimpio.length - 1);
    rutPuntos = rutPuntos + "-" + dv;
  }
  return rutPuntos;
}

function Edad(FechaNacimiento) {
  var fechaNace = new Date(FechaNacimiento);
  var fechaActual = new Date();

  var mes = fechaActual.getMonth();
  var dia = fechaActual.getDate();
  var año = fechaActual.getFullYear();

  fechaActual.setDate(dia);
  fechaActual.setMonth(mes);
  fechaActual.setFullYear(año);

  let edad = Math.floor(
    (fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365
  );

  return edad;
}

//mientras cambie el dia y no aprete el boton se vayan cambiando los datos de los formularios
// os ino tendria que rellenar un dia obligatoriamente ajajedsaxD

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

function getFecha(date) {
  let newDate = new Date(date);
  let month = (newDate.getMonth() + 1).toString();
  let day = (newDate.getDate() + 1).toString();
  let year = newDate.getFullYear().toString();
  let dayS = day.length > 1 ? day : `0${day}`;
  let monthS = month.length > 1 ? month : `0${month}`;
  return `${dayS}/${monthS}/${year}`;
}

export default function DeleteWeeklyDiet({ match }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const [date, setDate] = React.useState("");
  const [rowsEmpty, setRowsEmpty] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const weeklyDiets = useSelector((store) => store.weeklyDiets.getweeklyDiets);
  const patientInfo = useSelector((state) => state.patients.patientInfo);

  React.useEffect(() => {
    dispatch(getPatientInfo(match.params.rut));
    dispatch(getAllWeeklyDiets(match.params.rut));
  }, [dispatch, match]);

  //console.log("soy el weekly diets "+ weeklyDiets.length);
  const weeklyDietError = useSelector((store) => store.weeklyDiets.errors);
  console.log("Error");
  console.log(weeklyDietError);

  var rows = [];

  if (weeklyDiets && weeklyDiets.length > 0) {
    for (let i = 0; i < weeklyDiets.length; i++) {
      rows.push({
        date: getFecha(weeklyDiets[i].date),
        action: "delete",
        dateF: weeklyDiets[i].date,
      });
    }
  }

  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const searchPatientsWeekly = () => {
    dispatch(getAllWeeklyDiets(match.params.rut));
  };

  const handleChange = (event) => {
    setDate(event.target.value);
    // console.log("soy el dia" + event.target.value.date );
    // dispatch(deleteWeeklyDiet( ))
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const cleanControl = () => {
    setRowsEmpty(true);
    setOpenSnackbar(true);
  };

  //const theme = useTheme();

  return (
    <DeleteWeeklyDietStyled>
      <div>
        <Grid container justify="center">
          <Typography className="title" variant="h5" color="primary">
            Eliminar minuta semanal
          </Typography>
        </Grid>

        {patientInfo && patientInfo.names ? (
          <Grid container alignItems="center">
            <Grid item xs={12} container justify="center">
              <Typography className="name" variant="h5">
                <div>
                  <h1>
                    {patientInfo.names} {patientInfo.father_last_name}{" "}
                    {patientInfo.mother_last_name}
                  </h1>
                  <h2>
                    Rut: {formateaRut(patientInfo.rut)} Edad:{" "}
                    {Edad(patientInfo.birth_date)} años
                  </h2>
                </div>
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Grid container justify="center">
            <Grid item container>
              <Grid item xs={false} sm={3}></Grid>

              <Grid item xs={12} sm={6}>
                <Skeleton
                  variant="rect"
                  height={100}
                  style={{ borderRadius: "5px" }}
                />
              </Grid>
              <Grid item xs={false} sm={3}></Grid>
            </Grid>
          </Grid>
        )}
        {(weeklyDietError && weeklyDietError.length === 0) ||
        weeklyDiets[0] === "error" ||
        rowsEmpty ? (
          <Grid container direction="row" justify="center" alignItems="center">
            <h2>Este usuario no tiene minutas aún.</h2>
          </Grid>
        ) : weeklyDiets && weeklyDiets.length > 0 ? (
          <Grid container justify="center">
            <h4>Selecciona una de las dietas semanales para eliminar</h4>{" "}
            <br></br>
            <Grid
              container
              justify="center"
              className="table"
              style={{ marginTop: 20 }}
            >
              <Grid item xs={11} md={9} lg={6}>
                <TableDelete
                  rowsShow={rows}
                  rut={match.params.rut}
                  cleanControl={cleanControl}
                />
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid container justify="center" style={{ marginTop: 20 }}>
            <Grid item container>
              <Grid item xs={false} sm={3}></Grid>

              <Grid item xs={12} sm={6}>
                <Skeleton
                  variant="rect"
                  height={200}
                  style={{ borderRadius: "5px" }}
                />
              </Grid>
              <Grid item xs={false} sm={3}></Grid>
            </Grid>
          </Grid>
        )}
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Minuta diaria eliminada con éxito.
        </Alert>
      </Snackbar>
    </DeleteWeeklyDietStyled>
  );
}
