import React from "react";
import styled from "styled-components";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getDailyDietsAdmin } from "../../../redux/ducks/patientsDailyDietsDuck";

import Table from "../../patients/DailyDiets/table";

import Grid from "@material-ui/core/Grid";
import SkeletonTable from "../../patients/DailyDiets/skeleton";
import Skeleton from "@material-ui/lab/Skeleton";
import { getPatientInfo } from "../../../redux/ducks/patientsDucks";
import Typography from "@material-ui/core/Typography";

import Container from "@material-ui/core/Container";
import { getId } from "../../../redux/ducks/patientsDucks";

const DailyDietsStyled = styled.div``;

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

export default function DailyDiets({ match }) {
  const dispatch = useDispatch();
  const dailyDiets = useSelector((store) => store.dailyDiets.dailyDietsAdmin);
  const patientInfo = useSelector((state) => state.patients.patientInfo);

  React.useEffect(() => {
    const getInfoDailyDiets = () => {
      dispatch(getPatientInfo(match.params.rut));
      dispatch(getDailyDietsAdmin(match.params.rut));
      dispatch(getId(match.params.rut));
    };
    getInfoDailyDiets();
  }, [dispatch, match.params.rut]);
  const exists = useSelector((state) => state.patients.exists);
  if (exists === "error") {
    window.location.href = "/error";
  }

  let dates = [];
  let diets = {};
  if (dailyDiets.length > 0 && dailyDiets[0] !== "error") {
    for (let i = 0; i < dailyDiets.length; i++) {
      dates.push(dailyDiets[i].date);
      diets[dailyDiets[i].date.toString()] = dailyDiets[i];
    }
  }
  dates.sort().reverse();

  return (
    <DailyDietsStyled style={{ margin: 50 }}>
      <Container maxWidth="md" style={{ marginBottom: 20 }}>
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
          <div>
            <Typography component="div" variant={"h2"} style={{ width: 400 }}>
              <Skeleton />
            </Typography>
            <Typography component="div" variant={"h3"} style={{ width: 350 }}>
              <Skeleton />
            </Typography>
          </div>
        )}
        <h2>Plan de alimentación</h2>
        {dailyDiets.length === 0 ? (
          <SkeletonTable variant="rect" height={600} />
        ) : dailyDiets[0] === "error" ? (
          <Grid container direction="row" justify="center" alignItems="center">
            <h3>Este usuario no cuenta con planes de alimentación aún.</h3>
          </Grid>
        ) : (
          <Table dates={dates} diets={diets} />
        )}
      </Container>
    </DailyDietsStyled>
  );
}
