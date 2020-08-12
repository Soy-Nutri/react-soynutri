import React from "react";
import styled from "styled-components";

import { useForm, Controller } from "react-hook-form";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import WatchLaterIcon from "@material-ui/icons/WatchLater";
//import InputLabel from '@material-ui/core/InputLabel';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import Select from "@material-ui/core/Select";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { addWeeklyDiet } from "../../../redux/ducks/weeklyDietsDucks";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";

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

//mientras cambie el dia y no aprete el boton se vayan cambiando los datos de los formularios
// os ino tendria que rellenar un dia obligatoriamente ajajedsaxD
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddWeeklyDiet() {
  const { register, errors, handleSubmit, control } = useForm();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const newPatientWeeklyDiet = useSelector(
    (store) => store.weeklyDiets.addWeeklyDiet
  );
  const newPatientWeeklyDietError = useSelector(
    (store) => store.weeklyDiets.errors
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onSubmit = (data, e) => {
    const fecha = new Date();

    data["date"] = fecha;

    dispatch(addWeeklyDiet(data));
    handleOpen();
    e.target.reset();

    console.log(data);
  };

  const reqmsg = "Campo obligatorio";

  //Cambiar las horas a las dadas por firebase.

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

  const [dayOfWeek, setDayOfWeek] = React.useState("Dia de la semana");

  const handleBreakfastTime = (date) => {
    setBreakfastTime(toString(date));
  };
  const handleLunchTime = (date) => {
    setLunchTime(toString(date));
  };
  const handleCollationTime = (date) => {
    setCollationTime(toString(date));
  };
  const handleDinnerTime = (date) => {
    setDinnerTime(toString(date));
  };

  const handleChangeDay = (event) => {
    console.log("selecionnaste" + event.target.value);
    setDayOfWeek(event.target.value);
  };

  // function prettyTime(date) {
  //   // this function makes de datetype date in a "HH:MM" format
  //   return date.toLocaleTimeString(navigator.language, {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });
  // }

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });

  return (
    <AddWeeklyDietStyled>
      <form
        autoComplete="off"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container alignItems="center">
          <Typography className="title" variant="h5" color="primary">
            Agregar minuta semanal
          </Typography>
        </Grid>

        <Grid container justify="center" spacing={isMobile ? 0 : 2}>
          <Grid item xs={12} sm={8} md={4} lg={4}>
            <TextField
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
          <Grid item xs={12} sm={8} md={4} lg={4} className="semana">
            {/*<InputLabel htmlFor="age-native-simple">Día de la semana</InputLabel> */}
            <Controller
              as={
                <Select name="day" value={dayOfWeek} onChange={handleChangeDay}>
                  <MenuItem disabled value="Dia de la semana">
                    <em> Dia de la semana</em>
                    <br />
                  </MenuItem>
                  <MenuItem value={"Lunes"}>Lunes</MenuItem>
                  <MenuItem value={"Martes"}>Martes</MenuItem>
                  <MenuItem value={"Miercoles"}>Miércoles</MenuItem>
                  <MenuItem value={"Jueves"}>Jueves</MenuItem>
                  <MenuItem value={"Viernes"}>Viernes</MenuItem>
                  <MenuItem value={"Sabado"}>Sábado</MenuItem>
                  <MenuItem value={"Domingo"}>Domingo</MenuItem>
                </Select>
              }
              name="day"
              defaultValue={dayOfWeek}
              control={control}
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
                name="timeBreakfast"
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
                name="timeLunch"
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
                name="timeSnack"
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
                name="timeDinner"
                defaultValue={dinnerTime}
                control={control}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid container justify="center" spacing={isMobile ? 0 : 2}>
          <Grid item xs={false} md={2} lg={2} className="grid-invisible"></Grid>

          <Grid item xs={12} sm={8} md={4} lg={4}>
            <TextField
              name="breakfast"
              type="text"
              label="Desayuno"
              variant="outlined"
              margin="dense"
              fullWidth
              multiline
              rows={5}
              inputProps={{ style: { fontSize: "0.8em" } }}
              //
              helperText={errors.breakfast ? errors.breakfast.message : ""}
              inputRef={register({
                required: { value: false },
              })}
            />
          </Grid>

          <Grid item xs={12} sm={8} md={4} lg={4}>
            <TextField
              name="lunch"
              type="text"
              label="Almuerzo"
              variant="outlined"
              margin="dense"
              fullWidth
              multiline
              rows={5}
              inputProps={{ style: { fontSize: "0.8em" } }}
              // error={errors.lunch}
              helperText={errors.lunch ? errors.lunch.message : ""}
              inputRef={register({
                required: { value: false },
              })}
            />
          </Grid>

          <Grid item xs={false} md={2} lg={2} className="grid-invisible"></Grid>
          <Grid item xs={false} md={2} lg={2} className="grid-invisible"></Grid>

          <Grid item xs={12} sm={8} md={4} lg={4}>
            <TextField
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
                required: { value: false },
              })}
            />
          </Grid>

          <Grid item xs={12} sm={8} md={4} lg={4}>
            <TextField
              name="post_training"
              type="text"
              label="Post entreno"
              variant="outlined"
              margin="dense"
              fullWidth
              multiline
              rows={2}
              inputProps={{ style: { fontSize: "0.8em" } }}
              //  error={errors.post_training}
              helperText={
                errors.post_training ? errors.post_training.message : ""
              }
              inputRef={register({
                required: { value: false },
              })}
            />
          </Grid>

          <Grid item xs={false} md={2} lg={2} className="grid-invisible"></Grid>
          <Grid item xs={false} md={2} lg={2} className="grid-invisible"></Grid>

          <Grid item xs={12} sm={8} md={4} lg={4}>
            <TextField
              name="dinner"
              type="text"
              label="Cena"
              variant="outlined"
              margin="dense"
              fullWidth
              multiline
              rows={5}
              inputProps={{ style: { fontSize: "0.8em" } }}
              //error={errors.dinner}
              helperText={errors.dinner ? errors.dinner.message : ""}
              inputRef={register({
                required: { value: false },
              })}
            />
          </Grid>

          <Grid item xs={12} sm={8} md={4} lg={4}>
            <TextField
              name="goals"
              type="text"
              label="Metas"
              variant="outlined"
              margin="dense"
              fullWidth
              multiline
              // rows={5}
              inputProps={{ style: { fontSize: "0.8em" } }}
              //error={errors.goals}
              helperText={errors.goals ? errors.goals.message : ""}
              inputRef={register({
                required: { value: false },
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
          >
            Guardar Minuta Semanal
          </Button>
        </Grid>
      </form>

      {newPatientWeeklyDiet ? (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            La Dieta semanal del paciente {newPatientWeeklyDiet.names}{" "}
            {newPatientWeeklyDiet.father_last_name}{" "}
            {newPatientWeeklyDiet.mother_last_name} fue agregado exitosamente!{" "}
          </Alert>
        </Snackbar>
      ) : newPatientWeeklyDietError ? (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {newPatientWeeklyDietError}
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
    </AddWeeklyDietStyled>
  );
}
