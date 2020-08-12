import React, { useState } from "react";
import styled from "styled-components";

import { useForm } from "react-hook-form";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getControls, modifyControl } from "../../../redux/ducks/controlDucks";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
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

export default function ModifyControl() {
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    // console.log(data);
    // console.log(errors);
    dispatch(modifyControl(data, rut, newDate.date));
    setOpenSnackbar(true);
  };

  const reqmsg = "Campo obligatorio";

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    // console.log("errores", errors.weight);
    // por alguna razon errors es siempre indefinido
    if (errors.lenght === 0) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const control = useSelector((state) => state.control.control);
  const controlErrors = useSelector((state) => state.control.errors);

  const [rut, setRut] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const searchPatients = () => {
    dispatch(getControls(rut));
    setOpenSnackbar(true);
  };

  const handleChangeRut = (event) => {
    setRut(event.target.value);
  };

  const [date, setDate] = React.useState("");
  const [newDate, setNewDate] = React.useState("");

  const [controlPatient, setControlPatient] = React.useState({
    abdominal_fold: "",
    biological_age: "",
    cad_max: "",
    cbc: "",
    cbr: "",
    cc_max: "",
    cc_min: "",
    date: "",
    dni: "",
    fat: "",
    imc: "",
    mass: "",
    muscle_mass: "",
    size: "",
    subscapular_fold: "",
    triceps_fold: "",
    visceral_fat: "",
    weight: "",
  });
  const handleChange = (event) => {
    setDate(event.target.value);
    setControlPatient(event.target.value);
    setNewDate(event.target.value);
    //console.log(event.target.value);
  };

  const handleClickDelete = () => {
    setControlPatient({
      abdominal_fold: "",
      biological_age: "",
      cad_max: "",
      cbc: "",
      cbr: "",
      cc_max: "",
      cc_min: "",
      date: "",
      dni: "",
      fat: "",
      imc: "",
      mass: "",
      muscle_mass: "",
      size: "",
      subscapular_fold: "",
      triceps_fold: "",
      visceral_fat: "",
      weight: "",
    });
  };

  return (
    <ModifyControlStyled>
      <Grid container alignItems="center">
        <Typography className="title" variant="h5" color="primary">
          Modificar control
        </Typography>
      </Grid>

      <Grid item container spacing={2} justify="center">
        <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
          <TextField
            value={rut}
            onChange={handleChangeRut}
            name="rut"
            label="Ingrese el rut del paciente"
            type="text"
            variant="outlined"
            margin="dense"
            className="input"
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container alignItems="center">
        <Button
          className="form-button"
          variant="outlined"
          type="submit"
          color="primary"
          onClick={() => searchPatients()}
        >
          Buscar
        </Button>
      </Grid>

      {control && control.length > 0 && controlPatient.weight === "" && (
        <Grid item container spacing={2} justify="center">
          <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>

          <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
            <h3>Selecione una fecha para editar</h3>
          </Grid>
          <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={date}
              onChange={handleChange}
            >
              {control.map((item) => (
                <MenuItem value={item} key={item.date}>
                  {getFecha(item.date)}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>
        </Grid>
      )}
      {controlPatient.weight !== "" && (
        <form
          autoComplete="off"
          className="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container justify="center">
            <Grid item container spacing={2}>
              <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>

              <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
                <TextField
                  defaultValue={controlPatient.weight}
                  name="weight"
                  type="text"
                  label="Peso (Kg)"
                  variant="outlined"
                  margin="dense"
                  className="input"
                  fullWidth
                  error={errors.weight}
                  helperText={errors.weight ? errors.weight.message : ""}
                  inputRef={register({
                    required: { value: true, message: reqmsg },
                  })}
                />
              </Grid>

              <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
                <TextField
                  defaultValue={controlPatient.size}
                  name="size"
                  type="text"
                  label="Talla (m)"
                  variant="outlined"
                  margin="dense"
                  className="input"
                  fullWidth
                  error={errors.size}
                  helperText={errors.size ? errors.size.message : ""}
                  inputRef={register({
                    required: { value: true, message: reqmsg },
                  })}
                />
              </Grid>
              <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>
            </Grid>

            <Grid item container spacing={2} justify="center">
              <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>

              <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
                <TextField
                  defaultValue={controlPatient.cbr}
                  name="cbr"
                  type="text"
                  label="Circunferencia brazo rígido (cm)"
                  variant="outlined"
                  margin="dense"
                  className="input"
                  fullWidth
                  error={errors.cbr}
                  helperText={errors.cbr ? errors.cbr.message : ""}
                  inputRef={register({
                    required: { value: true, message: reqmsg },
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
                <TextField
                  defaultValue={controlPatient.cc_min}
                  name="cc_min"
                  label="Circunferencia cintura mínima (cm)"
                  type="text"
                  variant="outlined"
                  margin="dense"
                  className="input"
                  fullWidth
                  error={errors.cc_min}
                  helperText={errors.cc_min ? errors.cc_min.message : ""}
                  inputRef={register({
                    required: { value: true, message: reqmsg },
                  })}
                />
              </Grid>
              <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>
            </Grid>

            <Grid item container spacing={2}>
              <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>

              <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
                <TextField
                  defaultValue={controlPatient.cbc}
                  name="cbc"
                  type="text"
                  label="Circunferencia brazo calmado (cm)"
                  variant="outlined"
                  margin="dense"
                  className="input"
                  fullWidth
                  error={errors.cbc}
                  helperText={errors.cbc ? errors.cbc.message : ""}
                  inputRef={register({
                    required: { value: true, message: reqmsg },
                  })}
                />
              </Grid>

              <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
                <TextField
                  defaultValue={controlPatient.cc_max}
                  name="cc_max"
                  label="Circunferencia cintura máxima (cm)"
                  type="text"
                  variant="outlined"
                  margin="dense"
                  className="input"
                  fullWidth
                  error={errors.cc_max}
                  helperText={errors.cc_max ? errors.cc_max.message : ""}
                  inputRef={register({
                    required: { value: true, message: reqmsg },
                  })}
                />
              </Grid>
              <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>
            </Grid>

            <Grid item container spacing={2}>
              <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>

              <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
                <TextField
                  defaultValue={controlPatient.cad_max}
                  name="cad_max"
                  label="Circunferencia cadera máxima (cm)"
                  type="text"
                  variant="outlined"
                  margin="dense"
                  className="input"
                  fullWidth
                  error={errors.cad_max}
                  helperText={errors.cad_max ? errors.cad_max.message : ""}
                  inputRef={register({
                    required: { value: true, message: reqmsg },
                  })}
                />
              </Grid>

              <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
                <TextField
                  defaultValue={controlPatient.triceps_fold}
                  name="triceps_fold"
                  label="Pliegue tricipital (mm)"
                  type="text"
                  variant="outlined"
                  margin="dense"
                  className="input"
                  fullWidth
                  error={errors.triceps_fold}
                  helperText={
                    errors.triceps_fold ? errors.triceps_fold.message : ""
                  }
                  inputRef={register({
                    required: { value: true, message: reqmsg },
                  })}
                />
              </Grid>

              <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>
            </Grid>

            <Grid item container spacing={2}>
              <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>

              <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
                <TextField
                  defaultValue={controlPatient.subscapular_fold}
                  name="subscapular_fold"
                  label="Pliegue subescapular (mm)"
                  type="text"
                  variant="outlined"
                  margin="dense"
                  className="input"
                  fullWidth
                  error={errors.subscapular_fold}
                  helperText={
                    errors.subscapular_fold
                      ? errors.subscapular_fold.message
                      : ""
                  }
                  inputRef={register({
                    required: { value: true, message: reqmsg },
                  })}
                />
              </Grid>

              <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
                <TextField
                  defaultValue={controlPatient.abdominal_fold}
                  name="abdominal_fold"
                  label="Pliegue abdominal (mm)"
                  type="text"
                  variant="outlined"
                  margin="dense"
                  className="input"
                  fullWidth
                  error={errors.abdominal_fold}
                  helperText={
                    errors.abdominal_fold ? errors.abdominal_fold.message : ""
                  }
                  inputRef={register({
                    required: { value: true, message: reqmsg },
                  })}
                />
              </Grid>

              <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>
            </Grid>

            <Grid item container spacing={2}>
              <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>

              <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
                <TextField
                  defaultValue={controlPatient.imc}
                  name="imc"
                  label="Indice de masa corporal (Kg/m²)"
                  type="text"
                  variant="outlined"
                  margin="dense"
                  className="input"
                  fullWidth
                  error={errors.imc}
                  helperText={errors.imc ? errors.imc.message : ""}
                  inputRef={register({
                    required: { value: true, message: reqmsg },
                  })}
                />
              </Grid>

              <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
                <TextField
                  defaultValue={controlPatient.dni}
                  name="dni"
                  label="Diagnóstico nutricional integral"
                  type="text"
                  variant="outlined"
                  margin="dense"
                  className="input"
                  fullWidth
                  error={errors.dni}
                  helperText={errors.dni ? errors.dni.message : ""}
                  inputRef={register({
                    required: { value: true, message: reqmsg },
                  })}
                />
              </Grid>
              <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>
            </Grid>

            <Grid item container spacing={2}>
              <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>

              <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
                <TextField
                  defaultValue={controlPatient.biological_age}
                  name="biological_age"
                  label="Edad biológica"
                  type="text"
                  variant="outlined"
                  margin="dense"
                  className="input"
                  fullWidth
                  error={errors.biological_age}
                  helperText={
                    errors.biological_age ? errors.biological_age.message : ""
                  }
                  inputRef={register({
                    required: { value: true, message: reqmsg },
                  })}
                />
              </Grid>

              <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
                <TextField
                  defaultValue={controlPatient.visceral_fat}
                  name="visceral_fat"
                  label="Grasa visceral"
                  type="text"
                  variant="outlined"
                  margin="dense"
                  className="input"
                  fullWidth
                  error={errors.visceral_fat}
                  helperText={
                    errors.visceral_fat ? errors.visceral_fat.message : ""
                  }
                  inputRef={register({
                    required: { value: true, message: reqmsg },
                  })}
                />
              </Grid>

              <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>
            </Grid>

            <Grid item container spacing={2}>
              <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>

              <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
                <TextField
                  defaultValue={controlPatient.fat}
                  name="fat"
                  label="Porcentaje de grasa"
                  type="text"
                  variant="outlined"
                  margin="dense"
                  className="input"
                  fullWidth
                  error={errors.fat}
                  helperText={errors.fat ? errors.fat.message : ""}
                  inputRef={register({
                    required: { value: true, message: reqmsg },
                  })}
                />
              </Grid>

              <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
                <TextField
                  defaultValue={controlPatient.mass}
                  name="mass"
                  label="Porcentaje de masa"
                  type="text"
                  variant="outlined"
                  margin="dense"
                  className="input"
                  fullWidth
                  error={errors.mass}
                  helperText={errors.mass ? errors.mass.message : ""}
                  inputRef={register({
                    required: { value: true, message: reqmsg },
                  })}
                />
              </Grid>

              <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>
            </Grid>

            <Grid item container spacing={2} justify="center">
              <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
                <TextField
                  defaultValue={controlPatient.muscle_mass}
                  name="muscle_mass"
                  label="Masa muscular"
                  type="text"
                  variant="outlined"
                  margin="dense"
                  className="input"
                  fullWidth
                  error={errors.muscle_mass}
                  helperText={
                    errors.muscle_mass ? errors.muscle_mass.message : ""
                  }
                  inputRef={register({
                    required: { value: true, message: reqmsg },
                  })}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container alignItems="center">
            <Button
              className="form-button"
              variant="outlined"
              type="submit"
              color="primary"
              onClick={handleClickOpen}
            >
              Guardar cambios
            </Button>
          </Grid>
          <Grid container alignItems="center">
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
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"¿Realmente desea guardar los cambios?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              El control de {"{nombre}"} con fecha {"{fecha}"} será modificado
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {controlErrors ? (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            Ha ocurrido un error, verifique los datos antes de continuar.
          </Alert>
        </Snackbar>
      ) : control && control.message === "Change data." ? (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            Control modificado con éxito.
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
    </ModifyControlStyled>
  );
}
