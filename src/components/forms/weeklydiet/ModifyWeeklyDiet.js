import React from "react";
import styled from "styled-components";

import { useForm, Controller } from "react-hook-form";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
/*
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
*/

import WatchLaterIcon from "@material-ui/icons/WatchLater";
//import InputLabel from '@material-ui/core/InputLabel';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import Select from "@material-ui/core/Select";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  modifyWeeklyDiet,
  getWeeklyDiets,
} from "../../../redux/ducks/weeklyDietsDucks";
import { getPatientInfo } from "../../../redux/ducks/patientsDucks";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import Skeleton from "@material-ui/lab/Skeleton";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AddWeeklyDietStyled = styled.div`
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
  .semana {
    margin-top: px;
    margin-left: 25px;
  }

  /*Cambiar estilo en media screen para las minutas */
  @media screen and (min-width: 600px) {
    .MuiGrid-root.margin.MuiGrid-item.MuiGrid-grid-md-1,
    .MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-1 {
      display: none;
    }
    .texto {
      margin-right: 0.2px;
    }
    .semana {
      margin-top: px;
      margin-left: px;
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

  .name {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1em;
    font-size: 1em;
    /* color: var(--mainPurple); */
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

function getFecha(date) {
  let newDate = new Date(date);
  let month = (newDate.getMonth() + 1).toString();
  let day = (newDate.getDate() + 1).toString();
  let year = newDate.getFullYear().toString();
  let dayS = day.length > 1 ? day : `0${day}`;
  let monthS = month.length > 1 ? month : `0${month}`;
  return `${dayS}/${monthS}/${year}`;
}

export default function ModifyWeeklyDiet({ match }) {
  const { register, errors, control } = useForm();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const theme = useTheme();

  const dispatch = useDispatch();

  const weeklyDiets = useSelector((store) => store.weeklyDiets.getweeklyDiets);
  const patientInfo = useSelector((state) => state.patients.patientInfo);
  //const weeklyDietError = useSelector((store) => store.weeklyDiets.errors);

  const reqmsg = "Campo obligatorio";

  //Cambiar las horas a las dadas por firebase.

  React.useEffect(() => {
    dispatch(getWeeklyDiets(match.params.rut));
    dispatch(getPatientInfo(match.params.rut));
  }, [dispatch, match.params.rut]);

  const handleClickDelete = () => {
    setDayOfWeek("");
  };

  const [breakfastTime, setBreakfastTime] = React.useState(
    new Date("January 1 2020 09:30").getTime()
  );
  const [lunchTime, setLunchTime] = React.useState(
    new Date("January 1 2020 12:30").getTime()
  );
  const [collationTime, setCollationTime] = React.useState(
    new Date("January 1 2020 16:00").getTime()
  );
  const [dinnerTime, setDinnerTime] = React.useState(
    new Date("2020 January 1 19:30").getTime()
  );

  const [dayOfWeek, setDayOfWeek] = React.useState("");

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

  const handleChangeDay = (event) => {
    setDayOfWeek(event.target.value);
    setBreakfastTime(
      new Date(
        `2020 January 1 ${weeklyDiets[event.target.value].timeBreakfast}`
      ).getTime()
    );
    setLunchTime(
      new Date(
        `2020 January 1 ${weeklyDiets[event.target.value].timeLunch}`
      ).getTime()
    );
    setCollationTime(
      new Date(
        `2020 January 1 ${weeklyDiets[event.target.value].timeSnack}`
      ).getTime()
    );
    setDinnerTime(
      new Date(
        `2020 January 1 ${weeklyDiets[event.target.value].timeDinner}`
      ).getTime()
    );
  };

  const handleModifyDay = (event) => {
    //variables
    let breakf = document.getElementById("breakfast").value;
    let dinn = document.getElementById("dinner").value;
    let lunc = document.getElementById("lunch").value;
    let pstraining = document.getElementById("post_training").value;
    let snac = document.getElementById("snack").value;
    //los tiempos
    let brkfast = document.getElementById("breakfast_time").value;
    let timdinn = document.getElementById("dinner_time").value;
    let timlunc = document.getElementById("lunch_time").value;
    let timsnac = document.getElementById("collation_time").value;

    let weklypatient2 = {};

    weklypatient2["date"] = weeklyDiets.date;
    weklypatient2["rut"] = match.params.rut;
    weklypatient2["day"] = dayOfWeek;

    weklypatient2["breakfast"] = breakf;
    weklypatient2["timeBreakfast"] = brkfast;
    weklypatient2["lunch"] = lunc;
    weklypatient2["timeLunch"] = timlunc;
    weklypatient2["snack"] = snac;
    weklypatient2["timeSnack"] = timsnac;
    weklypatient2["post_training"] = pstraining;
    weklypatient2["dinner"] = dinn;
    weklypatient2["timeDinner"] = timdinn;

    dispatch(modifyWeeklyDiet(weklypatient2));

    setDayOfWeek("");
    setOpenSnackbar(true);
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });

  return (
    <AddWeeklyDietStyled>
      <Grid container alignItems="center">
        <Typography className="title" variant="h5" color="primary">
          Modificar minuta semanal
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

      {weeklyDiets && weeklyDiets.date && (
        <Grid container justify="center">
          <Grid container justify="center">
            <h2>Fecha de la minuta semanal {getFecha(weeklyDiets.date)}</h2>
          </Grid>
        </Grid>
      )}

      {weeklyDiets && weeklyDiets.date && dayOfWeek === "" && (
        <React.Fragment>
          <Grid container direction="row" justify="center" alignItems="center">
            <h4>Selecciona un día a modificar</h4>

            <Select
              name="day"
              id="hola"
              value={dayOfWeek}
              onChange={handleChangeDay}
            >
              {weeklyDiets.lunes && <MenuItem value={"lunes"}>Lunes</MenuItem>}
              {weeklyDiets.martes && (
                <MenuItem value={"martes"}>Martes</MenuItem>
              )}
              {weeklyDiets.miercoles && (
                <MenuItem value={"miercoles"}>Miércoles</MenuItem>
              )}
              {weeklyDiets.jueves && (
                <MenuItem value={"jueves"}>Jueves</MenuItem>
              )}
              {weeklyDiets.viernes && (
                <MenuItem value={"viernes"}>Viernes</MenuItem>
              )}
              {weeklyDiets.sabado && (
                <MenuItem value={"sabado"}>Sábado</MenuItem>
              )}
              {weeklyDiets.domingo && (
                <MenuItem value={"domingo"}>Domingo</MenuItem>
              )}
            </Select>
          </Grid>
        </React.Fragment>
      )}

      {dayOfWeek !== "" && (
        <React.Fragment>
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
                      id="collation_time"
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
                  name="collation_time"
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
                defaultValue={weeklyDiets[dayOfWeek].breakfast}
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
                  required: { value: false, message: reqmsg },
                })}
              />
            </Grid>

            <Grid item xs={12} sm={8} md={4} lg={4}>
              <TextField
                defaultValue={weeklyDiets[dayOfWeek].lunch}
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
                  required: { value: false, message: reqmsg },
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
                defaultValue={weeklyDiets[dayOfWeek].snack}
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
                inputRef={register({
                  required: { value: false, message: reqmsg },
                })}
              />
            </Grid>

            <Grid item xs={12} sm={8} md={4} lg={4}>
              <TextField
                defaultValue={weeklyDiets[dayOfWeek].post_training}
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
                  required: { value: false, message: reqmsg },
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
                defaultValue={weeklyDiets[dayOfWeek].dinner}
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
                  required: { value: false, message: reqmsg },
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
          </Grid>

          <Grid container justify="center">
            <Button
              className="form-button"
              variant="outlined"
              type="submit"
              color="primary"
              onClick={handleModifyDay}
            >
              Modificar minuta semanal del dia {dayOfWeek}
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
        </React.Fragment>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Minuta semanal modificada con éxito.
        </Alert>
      </Snackbar>
    </AddWeeklyDietStyled>
  );
}
