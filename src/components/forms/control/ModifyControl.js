import React, { useState } from "react";
import styled from "styled-components";

import { useForm } from "react-hook-form";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getControls, modifyControl } from "../../../redux/ducks/controlDucks";
import { getPatientInfo } from "../../../redux/ducks/patientsDucks";

import Skeleton from "@material-ui/lab/Skeleton";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

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

export default function ModifyControl({ match }) {
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    dispatch(modifyControl(data, rut, newDate.date));
    setOpenSnackbar(true);
    handleClickDelete();
    e.target.reset();
  };

  const reqmsg = "Campo obligatorio";

  const handleClickOpen = () => {
    // console.log("errores", errors.weight);
    // por alguna razon errors es siempre indefinido
  };

  const dispatch = useDispatch();
  const control = useSelector((state) => state.control.control);
  const controlErrors = useSelector((state) => state.control.errors);

  const [rut, setRut] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  React.useEffect(() => {
    setRut(match.params.rut);
    dispatch(getControls(match.params.rut));
    dispatch(getPatientInfo(match.params.rut));
  }, [dispatch, match]);

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
  };

  const handleClickDelete = () => {
    setDate("");
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
  const patientInfo = useSelector((state) => state.patients.patientInfo);

  return (
    <ModifyControlStyled>
      <Grid container alignItems="center">
        <Typography className="title" variant="h5" color="primary">
          Modificar control
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

      {controlErrors && controlErrors.length > 0 ? (
        <Grid container direction="row" justify="center" alignItems="center">
          <h3>Este usuario no tiene controles aún.</h3>
        </Grid>
      ) : control && control.length > 0 && controlPatient.weight === "" ? (
        <Grid container direction="row" justify="center" alignItems="center">
          <h3>Selecione una fecha para editar</h3>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={date}
            onChange={handleChange}
            style={{ marginLeft: 20 }}
          >
            {control.map((item) => (
              <MenuItem value={item} key={item.date}>
                {getFecha(item.date)}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      ) : (
        ""
      )}
      {controlPatient.weight !== "" && (
        <form
          autoComplete="off"
          className="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container justify="center">
            <h1>Fecha del control {getFecha(newDate.date)}</h1>
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
      ) : (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            Control modificado con éxito.
          </Alert>
        </Snackbar>
      )}
    </ModifyControlStyled>
  );
}
