import React from "react";
import styled from "styled-components";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getWeeklyDiets } from "../../redux/ducks/patientsWeeklyDietsDucks";

import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";

import Table from "./WeeklyDiets/table";

const WeeklyDietsStyled = styled.div``;

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

export default function WeeklyDiets() {
  const dispatch = useDispatch();
  const weeklyDiets = useSelector(
    (store) => store.patientWeeklyDiets.weeklyDiets
  );

  React.useEffect(() => {
    const getInfoWeeklyDiets = () => {
      dispatch(getWeeklyDiets(localStorage.rut));
    };
    getInfoWeeklyDiets();
  }, [dispatch]);

  weeklyDiets
    .sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    })
    .reverse();

  return (
    <WeeklyDietsStyled style={{ margin: 50 }}>
      <h1>{localStorage.name}</h1>
      <h2>
        Rut: {formateaRut(localStorage.rut)} Edad: {Edad(localStorage.date)}{" "}
        años
      </h2>
      <h2>Minuta semanal</h2>
      {weeklyDiets.length === 0 ? (
        <Skeleton
          variant="rect"
          height={600}
          style={{ marginLeft: 10, marginRight: 10 }}
        />
      ) : weeklyDiets[0] === "error" ? (
        <Grid container direction="row" justify="center" alignItems="center">
          <h3>Este usuario no cuenta con una minuta semanal aún.</h3>
        </Grid>
      ) : (
        <Table weeklyDiets={weeklyDiets} />
      )}
    </WeeklyDietsStyled>
  );
}
