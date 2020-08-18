import React, { useState } from "react";
import styled from "styled-components";

import { useForm, Controller } from "react-hook-form";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import WatchLaterIcon from "@material-ui/icons/WatchLater";

import DateFnsUtils from "@date-io/date-fns";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";

import { useDispatch, useSelector } from "react-redux";
import {
  modifyDailyDiets,
  getDailyDietsAdmin,
} from "../../../redux/ducks/patientsDailyDietsDuck";
import { getPatientInfo } from "../../../redux/ducks/patientsDucks";

import MuiAlert from "@material-ui/lab/Alert";
import Skeleton from "@material-ui/lab/Skeleton";
import Snackbar from "@material-ui/core/Snackbar";

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

const ModifyDailyDietStyled = styled.div`
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

export default function ModifyDailyDiet({ match }) {
  const { register, errors, handleSubmit, control } = useForm();
  const dispatch = useDispatch();
  const dailyDiets = useSelector((state) => state.dailyDiets.dailyDietsAdmin);
  const patientInfo = useSelector((state) => state.patients.patientInfo);
  const res = useSelector((state) => state.dailyDiets.modifyRes);

  React.useEffect(() => {
    dispatch(getDailyDietsAdmin(match.params.rut));
    dispatch(getPatientInfo(match.params.rut));
  }, [dispatch, match]);

  const onSubmit = (data, e) => {
    //console.log("Eliminando.");
  };

  const reqmsg = "Campo obligatorio";

  const [breakfastTime, setBreakfastTime] = useState(
    new Date("January 1 2020 09:30").getTime()
  );
  const [lunchTime, setLunchTime] = useState(
    new Date("January 1 2020 12:30").getTime()
  );
  const [collationTime, setCollationTime] = useState(
    new Date("January 1 2020 16:00").getTime()
  );
  const [dinnerTime, setDinnerTime] = useState(
    new Date("2020 January 1 19:30").getTime()
  );

  const handleBreakfastTime = (date) => {
    setBreakfastTime(date);
  };
  const handleLunchTime = (date) => {
    setLunchTime(date);
  };
  const handleCollationTime = (date) => {
    setCollationTime(date);
  };
  const handleDinnerTime = (date) => {
    setDinnerTime(date);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });

  const [date, setDate] = React.useState("");

  const [dailyPatient, setDailyPatient] = React.useState({
    breakfastMeal: "",
    breakfastTime: "",
    dinnerMeal: "",
    dinnerTime: "",
    lunchMeal: "",
    lunchTime: "",
    snackMeal: "",
    snackTime: "",
    calories: "",
    extra_info: "",
    goals: "",
    post_training: "",
    proteins: "",
    date: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleChange = (event) => {
    setDate(event.target.value.date);
    setDailyPatient({
      breakfastMeal: event.target.value.breakfast.meal,
      breakfastTime: event.target.value.breakfast.time,
      dinnerMeal: event.target.value.dinner.meal,
      dinnerTime: event.target.value.dinner.time,
      lunchMeal: event.target.value.lunch.meal,
      lunchTime: event.target.value.lunch.time,
      snackMeal: event.target.value.snack.meal,
      snackTime: event.target.value.snack.time,
      calories: event.target.value.calories,
      extra_info: event.target.value.extra_info,
      goals: event.target.value.goals,
      post_training: event.target.value.post_training,
      proteins: event.target.value.proteins,
      date: event.target.value.date,
    });

    setBreakfastTime(
      new Date(`2020 January 1 ${event.target.value.breakfast.time}`).getTime()
    );
    setLunchTime(
      new Date(`2020 January 1 ${event.target.value.lunch.time}`).getTime()
    );
    setCollationTime(
      new Date(`2020 January 1 ${event.target.value.snack.time}`).getTime()
    );
    setDinnerTime(
      new Date(`2020 January 1 ${event.target.value.dinner.time}`).getTime()
    );
  };

  const handleClickDelete = () => {
    setDate("");
    setDailyPatient({
      breakfastMeal: "",
      breakfastTime: "",
      dinnerMeal: "",
      dinnerTime: "",
      lunchMeal: "",
      lunchTime: "",
      snackMeal: "",
      snackTime: "",
      calories: "",
      extra_info: "",
      goals: "",
      post_training: "",
      proteins: "",
      date: "",
    });
  };

  const handleModifyDay = (event) => {
    //tiempos
    let breakfast_time = document.getElementById("breakfast_time").value;
    let lunch_time = document.getElementById("lunch_time").value;
    let snack_time = document.getElementById("snack_time").value;
    let dinner_time = document.getElementById("dinner_time").value;
    //campos
    let breakfast = document.getElementById("breakfast").value;
    let lunch = document.getElementById("lunch").value;
    let snack = document.getElementById("snack").value;
    let post_training = document.getElementById("post_training").value;
    let dinner = document.getElementById("dinner").value;
    let goals = document.getElementById("goals").value;
    let calories = document.getElementById("calories").value;
    let proteins = document.getElementById("proteins").value;
    let extra_info = document.getElementById("extra_info").value;

    let newDaily = {};
    newDaily.rut = match.params.rut;
    newDaily.date = date.substring(0, 10);
    newDaily.breakfast_time = breakfast_time;
    newDaily.breakfast = breakfast;
    newDaily.lunch_time = lunch_time;
    newDaily.lunch = lunch;
    newDaily.snack_time = snack_time;
    newDaily.snack = snack;
    newDaily.post_training = post_training;
    newDaily.dinner_time = dinner_time;
    newDaily.dinner = dinner;
    newDaily.calories = calories;
    newDaily.proteins = proteins;
    newDaily.goals = goals;
    newDaily.extra_info = extra_info;

    dispatch(modifyDailyDiets(newDaily));

    setOpenSnackbar(true);
    handleClickDelete();
  };

  return (
    <ModifyDailyDietStyled>
      <Grid container alignItems="center">
        <Typography className="title" variant="h5" color="primary">
          Modificar pauta diaria
        </Typography>
      </Grid>

      {dailyDiets && dailyDiets[0] === "error" ? (
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid container direction="row" justify="center" alignItems="center">
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
                height={180}
                width={500}
                style={{ borderRadius: "5px" }}
              />
            )}
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <h3>Este usuario no tiene pautas diarias aún.</h3>
          </Grid>
        </Grid>
      ) : dailyDiets && dailyDiets.length > 0 && dailyPatient.date === "" ? (
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid container direction="row" justify="center" alignItems="center">
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
                height={180}
                width={500}
                style={{ borderRadius: "5px" }}
              />
            )}
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <h3>Selecione una fecha para editar</h3>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={date}
              onChange={handleChange}
              style={{ marginLeft: 20 }}
            >
              {dailyDiets.map((item) => (
                <MenuItem value={item} key={item.date}>
                  {getFecha(item.date)}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      ) : dailyPatient.date === "" ? (
        <Grid container direction="row" justify="center" alignItems="center">
          <Skeleton
            variant="rect"
            height={180}
            width={500}
            style={{ borderRadius: "5px" }}
          />
        </Grid>
      ) : (
        ""
      )}

      {dailyPatient.date !== "" && (
        <form
          autoComplete="off"
          className="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container justify="center" spacing={isMobile ? 0 : 2}>
            <Grid item xs={12} sm={8} md={4} lg={4}>
              <TextField
                defaultValue={match.params.rut}
                disabled
                name="rut"
                type="text"
                label="Rut (Sin puntos ni guión)"
                variant="outlined"
                margin="dense"
                fullWidth
                error={errors.rut}
                helperText={errors.rut ? errors.rut.message : ""}
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
            </Grid>
          </Grid>

          <Grid container justify="center" spacing={isMobile ? 0 : 2}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item xs={12} sm={4} md={2} lg={2}>
                <Controller
                  as={
                    <KeyboardTimePicker
                      id="breakfast_time"
                      label="Hora de desayuno"
                      inputVariant="outlined"
                      keyboardIcon={<WatchLaterIcon />}
                      margin="dense"
                      ampm={false}
                      fullWidth
                      onChange={handleBreakfastTime}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  }
                  name="breakfast_time"
                  defaultValue={breakfastTime}
                  control={control}
                />
              </Grid>

              <Grid item xs={12} sm={4} md={2} lg={2} className="lunch-picker">
                <Controller
                  as={
                    <KeyboardTimePicker
                      id="lunch_time"
                      label="Hora de almuerzo"
                      inputVariant="outlined"
                      keyboardIcon={<WatchLaterIcon />}
                      margin="dense"
                      ampm={false}
                      fullWidth
                      onChange={handleLunchTime}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  }
                  name="lunch_time"
                  defaultValue={lunchTime}
                  control={control}
                />
              </Grid>

              <Grid item xs={12} sm={4} md={2} lg={2}>
                <Controller
                  as={
                    <KeyboardTimePicker
                      id="snack_time"
                      label="Hora de colación"
                      inputVariant="outlined"
                      keyboardIcon={<WatchLaterIcon />}
                      margin="dense"
                      ampm={false}
                      fullWidth
                      onChange={handleCollationTime}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  }
                  name="snack_time"
                  defaultValue={collationTime}
                  control={control}
                />
              </Grid>

              <Grid item xs={12} sm={4} md={2} lg={2}>
                <Controller
                  as={
                    <KeyboardTimePicker
                      id="dinner_time"
                      label="Hora de la cena"
                      inputVariant="outlined"
                      keyboardIcon={<WatchLaterIcon />}
                      margin="dense"
                      ampm={false}
                      fullWidth
                      onChange={handleDinnerTime}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  }
                  name="dinner_time"
                  defaultValue={dinnerTime}
                  control={control}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid container justify="center" spacing={isMobile ? 0 : 2}>
            <Grid
              item
              xs={false}
              md={2}
              lg={2}
              className="grid-invisible"
            ></Grid>

            <Grid item xs={12} sm={8} md={4} lg={4}>
              <TextField
                defaultValue={dailyPatient.breakfastMeal}
                id="breakfast"
                name="breakfast"
                type="text"
                label="Desayuno"
                variant="outlined"
                margin="dense"
                fullWidth
                multiline
                rows={5}
                inputProps={{ style: { fontSize: "0.8em" } }}
                error={errors.breakfast}
                helperText={errors.breakfast ? errors.breakfast.message : ""}
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
            </Grid>

            <Grid item xs={12} sm={8} md={4} lg={4}>
              <TextField
                defaultValue={dailyPatient.lunchMeal}
                id="lunch"
                name="lunch"
                type="text"
                label="Almuerzo"
                variant="outlined"
                margin="dense"
                fullWidth
                multiline
                rows={5}
                inputProps={{ style: { fontSize: "0.8em" } }}
                error={errors.lunch}
                helperText={errors.lunch ? errors.lunch.message : ""}
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
            </Grid>

            <Grid
              item
              xs={false}
              md={2}
              lg={2}
              className="grid-invisible"
            ></Grid>
            <Grid
              item
              xs={false}
              md={2}
              lg={2}
              className="grid-invisible"
            ></Grid>

            <Grid item xs={12} sm={8} md={4} lg={4}>
              <TextField
                defaultValue={dailyPatient.snackMeal}
                id="snack"
                name="snack"
                type="text"
                label="Colación"
                variant="outlined"
                margin="dense"
                fullWidth
                multiline
                rows={2}
                inputProps={{ style: { fontSize: "0.8em" } }}
                error={errors.collation}
                helperText={errors.collation ? errors.collation.message : ""}
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
            </Grid>

            <Grid item xs={12} sm={8} md={4} lg={4}>
              <TextField
                defaultValue={dailyPatient.post_training}
                id="post_training"
                name="post_training"
                type="text"
                label="Post entreno"
                variant="outlined"
                margin="dense"
                fullWidth
                multiline
                rows={2}
                inputProps={{ style: { fontSize: "0.8em" } }}
                error={errors.post_training}
                helperText={
                  errors.post_training ? errors.post_training.message : ""
                }
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
            </Grid>

            <Grid
              item
              xs={false}
              md={2}
              lg={2}
              className="grid-invisible"
            ></Grid>
            <Grid
              item
              xs={false}
              md={2}
              lg={2}
              className="grid-invisible"
            ></Grid>

            <Grid item xs={12} sm={8} md={4} lg={4}>
              <TextField
                defaultValue={dailyPatient.dinnerMeal}
                id="dinner"
                name="dinner"
                type="text"
                label="Cena"
                variant="outlined"
                margin="dense"
                fullWidth
                multiline
                rows={5}
                inputProps={{ style: { fontSize: "0.8em" } }}
                error={errors.dinner}
                helperText={errors.dinner ? errors.dinner.message : ""}
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
            </Grid>

            <Grid item xs={12} sm={8} md={4} lg={4}>
              <TextField
                defaultValue={dailyPatient.goals}
                id="goals"
                name="goals"
                type="text"
                label="Metas"
                variant="outlined"
                margin="dense"
                fullWidth
                multiline
                rows={5}
                inputProps={{ style: { fontSize: "0.8em" } }}
                error={errors.goals}
                helperText={errors.goals ? errors.goals.message : ""}
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
            </Grid>

            <Grid
              item
              xs={false}
              sm={false}
              md={2}
              lg={2}
              className="grid-invisible"
            ></Grid>

            <Grid
              item
              xs={false}
              md={2}
              lg={2}
              className="grid-invisible"
            ></Grid>

            <Grid item xs={12} sm={8} md={4} lg={4}>
              <TextField
                defaultValue={dailyPatient.calories}
                id="calories"
                name="calories"
                type="text"
                label="Calorias de la dieta (Kcal)"
                variant="outlined"
                margin="dense"
                fullWidth
                inputProps={{ style: { fontSize: "0.8em" } }}
                error={errors.dinner}
                helperText={errors.dinner ? errors.dinner.message : ""}
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
            </Grid>

            <Grid item xs={12} sm={8} md={4} lg={4}>
              <TextField
                defaultValue={dailyPatient.proteins}
                id="proteins"
                name="proteins"
                type="text"
                label="Proteina de la dieta (gr/prot/d)"
                variant="outlined"
                margin="dense"
                fullWidth
                inputProps={{ style: { fontSize: "0.8em" } }}
                error={errors.goals}
                helperText={errors.goals ? errors.goals.message : ""}
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
            </Grid>

            <Grid
              item
              xs={false}
              sm={false}
              md={2}
              lg={2}
              className="grid-invisible"
            ></Grid>

            <Grid item xs={12} sm={8} md={4} lg={4}>
              <TextField
                defaultValue={dailyPatient.extra_info}
                id="extra_info"
                name="extra_info"
                type="text"
                label="Motivación"
                variant="outlined"
                margin="dense"
                fullWidth
                multiline
                rows={2}
                inputProps={{ style: { fontSize: "0.8em" } }}
                error={errors.post_training}
                helperText={
                  errors.post_training ? errors.post_training.message : ""
                }
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Button
              className="form-button"
              variant="outlined"
              type="submit"
              color="primary"
              onClick={handleModifyDay}
            >
              Guardar cambios
            </Button>
          </Grid>
          <Grid container justify="center">
            <Button
              className="form-button"
              variant="outlined"
              type="submit"
              color="primary"
              onClick={handleClickDelete}
            >
              Cancelar
            </Button>
          </Grid>
        </form>
      )}
      {res === "error" ? (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            Ha ocurrido un error, verifique los datos antes de continuar.
          </Alert>
        </Snackbar>
      ) : res === "ok" ? (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            Pauta diaria modificada con éxito.
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
    </ModifyDailyDietStyled>
  );
}
