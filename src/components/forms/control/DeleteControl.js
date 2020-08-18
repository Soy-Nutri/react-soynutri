import React, { useState } from "react";
import styled from "styled-components";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getControls } from "../../../redux/ducks/controlDucks";
import { getPatientInfo } from "../../../redux/ducks/patientsDucks";

import Skeleton from "@material-ui/lab/Skeleton";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import TableDelete from "./TableDeleteControl";
import { getId } from "../../../redux/ducks/patientsDucks";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

const ModifyControlStyled = styled.div`
  margin-bottom: 2em;
  .form {
    margin-left: 1em;
    margin-right: 1em;
  }
  .form-button {
    margin-top: 1em;
    margin-left: auto;
    margin-right: auto;
  }

  .title {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1em;
    font-family: yellowtail;
    font-size: 3.5em;
    /* color: var(--mainPurple); */
  }

  .name {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1em;
    font-size: 1em;
    /* color: var(--mainPurple); */
  }
`;

function getFecha(date) {
  let newDate = new Date(date);
  let month = (newDate.getMonth() + 1).toString();
  let day = (newDate.getDate() + 1).toString();
  let year = newDate.getFullYear().toString();
  let dayS = day.length > 1 ? day : `0${day}`;
  let monthS = month.length > 1 ? month : `0${month}`;
  return `${dayS}/${monthS}/${year}`;
}

export default function ModifyControl({ match }) {
  const dispatch = useDispatch();
  const control = useSelector((state) => state.control.control);
  const controlErrors = useSelector((state) => state.control.errors);
  const patientInfo = useSelector((state) => state.patients.patientInfo);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [rowsEmpty, setRowsEmpty] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  React.useEffect(() => {
    dispatch(getControls(match.params.rut));
    dispatch(getPatientInfo(match.params.rut));
    dispatch(getId(match.params.rut));
  }, [dispatch, match]);

  var rows = [];

  if (control && control.length > 0) {
    for (let i = 0; i < control.length; i++) {
      rows.push({
        date: getFecha(control[i].date),
        action: "delete",
        dateF: control[i].date,
      });
    }
  }

  const cleanControl = () => {
    setRowsEmpty(true);
    setOpenSnackbar(true);
  };

  const exists = useSelector((state) => state.patients.exists);
  if (exists === "error") {
    window.location.href = "/error";
  }

  return (
    <ModifyControlStyled>
      <Grid container alignItems="center">
        <Typography className="title" variant="h5" color="primary">
          Eliminar control
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

      {(controlErrors && controlErrors.length > 0) || rowsEmpty ? (
        <Grid container direction="row" justify="center" alignItems="center">
          <h2>Este usuario no tiene controles aún.</h2>
        </Grid>
      ) : control && control.length > 0 ? (
        <Grid container direction="row" justify="center" alignItems="center">
          <h2>Selecione una fecha para eliminar control</h2>

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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Control eliminado con éxito.
        </Alert>
      </Snackbar>
    </ModifyControlStyled>
  );
}
