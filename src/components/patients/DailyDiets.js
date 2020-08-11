import React from "react";
import styled from "styled-components";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getDailyDiets } from "../../redux/ducks/dailyDiets";

import Table from "./DailyDiets/table";

import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";

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

export default function DailyDiets() {
  const dispatch = useDispatch();
  const dailyDiets = useSelector((store) => store.dailyDiets.dailyDiets);

  React.useEffect(() => {
    const getInfoDailyDiets = () => {
      dispatch(getDailyDiets(localStorage.rut));
    };
    getInfoDailyDiets();
  }, [dispatch]);

  console.log(dailyDiets);
  let dates = [];
  let diets = {};
  for (let i = 0; i < dailyDiets.length; i++) {
    dates.push(dailyDiets[i].date);
    diets[dailyDiets[i].date] = dailyDiets[i];
  }
  console.log(dates);
  console.log(diets);

  return (
    <DailyDietsStyled style={{ margin: 50 }}>
      <h1>{localStorage.name}</h1>
      <h2>
        Rut: {formateaRut(localStorage.rut)} Edad: {Edad(localStorage.date)}{" "}
        años
      </h2>
      <h2>Plan de alimentación</h2>
      {dailyDiets.length === 0 ? (
        <Skeleton variant="rect" height={600} />
      ) : dailyDiets[0] === "error" ? (
        <Grid container direction="row" justify="center" alignItems="center">
          <h3>Este usuario no cuenta con planes de alimentación aún.</h3>
        </Grid>
      ) : (
        // <Table dates={dates} diets={diets} />
        <h1>Aquí irá la tabla.</h1>
      )}
    </DailyDietsStyled>
  );
}
