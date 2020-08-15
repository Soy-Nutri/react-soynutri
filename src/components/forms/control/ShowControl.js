import React from "react";
import styled from "styled-components";

import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";
//redux
import { getPatientInfo } from "../../../redux/ducks/patientsDucks";
import {
  getControlAdmin,
  getBiochemicalAdmin,
} from "../../../redux/ducks/patientsCarnetDucks";
import { useDispatch, useSelector } from "react-redux";

//Table
import TableC from "../../patients/Control/tableControl";
import TableB from "../../patients/Control/tableBiochemical";

import Grid from "@material-ui/core/Grid";

const SeeControlStyled = styled.div`
  /* .card {
    min-width: 500px;
  }
  .container {
    display: flex;
    justify-content: center; 
  }*/
  hr {
    border: 1px solid grey;
  }
`;

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

export default function SeeControl({ match, history }) {
  const dispatch = useDispatch();
  const patientInfo = useSelector((state) => state.patients.patientInfo);
  const carnet = useSelector((store) => store.carnet.control);
  const biochemical = useSelector((store) => store.carnet.biochemical);

  React.useEffect(() => {
    dispatch(getPatientInfo(match.params.rut));
    dispatch(getControlAdmin(match.params.rut));
    dispatch(getBiochemicalAdmin(match.params.rut));
  }, [dispatch, match.params.rut]);

  return (
    <SeeControlStyled>
      <Container maxWidth="md">
        {patientInfo ? (
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
        ) : (
          <Skeleton
            variant="rect"
            height={380}
            style={{ borderRadius: "5px" }}
          />
        )}
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
        <h2>Análisis bioquímicos</h2>
        {biochemical.length === 0 ? (
          <Skeleton variant="rect" height={100} />
        ) : biochemical[0] === "error" ? (
          <Grid container direction="row" justify="center" alignItems="center">
            <h3>Este usuario no cuenta con análisis bioquímicos aún.</h3>
          </Grid>
        ) : (
          <TableB biochemical={biochemical} />
        )}
      </Container>
    </SeeControlStyled>
  );
}
