import React from "react";
import styled from "styled-components";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  getControl,
  // getBiochemical,
} from "../../redux/ducks/patientsCarnetDucks";

//Table
import TableC from "./Control/tableControl";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";

const ControlsStyled = styled.div``;

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

export default function Controls() {
  const dispatch = useDispatch();
  const carnet = useSelector((store) => store.carnet.control);
  //const biochemical = useSelector((store) => store.carnet.biochemical);

  React.useEffect(() => {
    const getCarnet = () => {
      dispatch(getControl(localStorage.rut));
      //dispatch(getBiochemical(localStorage.rut));
    };
    getCarnet();
  }, [dispatch]);

  return (
    <ControlsStyled style={{ margin: 50 }}>
      <h1>{localStorage.name}</h1>
      <h2>
        Rut: {formateaRut(localStorage.rut)} Edad: {Edad(localStorage.date)}{" "}
        años
      </h2>
      <h2>Carnet de control</h2>
      {carnet.length === 0 ? (
        <Skeleton variant="rect" height={600} />
      ) : carnet[0] === "error" ? (
        <Grid container direction="row" justify="center" alignItems="center">
          <h3>Este usuario no cuenta con controles aún.</h3>
        </Grid>
      ) : (
        <TableC carnet={carnet} />
      )}
      {/* <h2>Análisis bioquímicos</h2>
      {biochemical.length === 0 ? (
        <Skeleton variant="rect" height={100} />
      ) : biochemical[0] === "error" ? (
        <Grid container direction="row" justify="center" alignItems="center">
          <h3>Este usuario no cuenta con análisis bioquímicos aún.</h3>
        </Grid>
      ) : (
        <TableB biochemical={biochemical} />
      )} */}
    </ControlsStyled>
  );
}
