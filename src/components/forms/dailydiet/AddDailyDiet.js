import React from "react";
import styled from "styled-components";

import { useForm, Controller } from "react-hook-form";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import WatchLaterIcon from "@material-ui/icons/WatchLater";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";

const AddDailyDietStyled = styled.div`
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

export default function AddDailyDiet() {
  const { register, errors, handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    console.log(errors);
  };

  const reqmsg = "Campo obligatorio";

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
    <AddDailyDietStyled>
      <form
        autoComplete="off"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container alignItems="center">
          <Typography className="title" variant="h5" color="primary">
            Agregar pauta diaria
          </Typography>
        </Grid>
        <Grid container justify="center" spacing={isMobile ? 0 : 2}>
          <Grid item xs={12} sm={8} md={4} lg={4}>
            <TextField
              name="rut"
              type="number"
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
              error={errors.breakfast}
              helperText={errors.breakfast ? errors.breakfast.message : ""}
              inputRef={register({
                required: { value: true, message: reqmsg },
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
              error={errors.lunch}
              helperText={errors.lunch ? errors.lunch.message : ""}
              inputRef={register({
                required: { value: true, message: reqmsg },
              })}
            />
          </Grid>

          <Grid item xs={false} md={2} lg={2} className="grid-invisible"></Grid>
          <Grid item xs={false} md={2} lg={2} className="grid-invisible"></Grid>

          <Grid item xs={12} sm={8} md={4} lg={4}>
            <TextField
              name="collation"
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
              error={errors.dinner}
              helperText={errors.dinner ? errors.dinner.message : ""}
              inputRef={register({
                required: { value: true, message: reqmsg },
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
        </Grid>
        <Grid container justify="center">
          <Button
            className="form-button"
            variant="outlined"
            type="submit"
            color="primary"
          >
            Agregar pauta diaria
          </Button>
        </Grid>
      </form>
    </AddDailyDietStyled>
  );
}