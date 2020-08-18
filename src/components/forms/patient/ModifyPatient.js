import React from "react";
import styled from "styled-components";

import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import SkeletonForm from "./SkeletonForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import {
  getPatientInfo,
  modifyPatient,
} from "../../../redux/ducks/patientsDucks";

const ModifyPatientStyled = styled.div`
  margin-bottom: 2em;
  .form {
    margin-left: 1em;
    margin-right: 1em;
  }
  .form-button {
    margin-top: 1.5em;
    margin-bottom: 1.5em;
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: theme.primary,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ModifyPatient({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const patientInfo = useSelector((state) => state.patients.patientInfo);
  const error = useSelector((state) => state.patients.errors);
  const modifiedPatient = useSelector(
    (state) => state.patients.modifiedPatient
  );
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    if (!loading) {
      setLoading(true);
      e.preventDefault();
      data["rut"] = match.params.rut;
      dispatch(modifyPatient(data));
      setOpen(true);
    }
  };

  React.useEffect(() => {
    if (error || modifiedPatient) {
      setLoading(false);
    }
  }, [error, modifiedPatient]);

  const handleClose = () => {
    setOpen(false);
  };

  const reqmsg = "Campo obligatorio";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });

  if (!patientInfo) {
    dispatch(getPatientInfo(match.params.rut));
  }

  return (
    <ModifyPatientStyled>
      <form
        id="form"
        autoComplete="off"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container alignItems="center">
          <Typography className="title" variant="h5" color="primary">
            Modificar datos de paciente
          </Typography>
        </Grid>
        {patientInfo ? (
          <React.Fragment>
            <Grid container justify="center">
              <Grid item container spacing={isMobile ? 0 : 2}>
                <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <TextField
                    name="names"
                    type="text"
                    label="Nombres"
                    variant="outlined"
                    margin="dense"
                    className="input"
                    fullWidth
                    defaultValue={patientInfo.names}
                    error={errors.names}
                    helperText={errors.names ? errors.names.message : ""}
                    inputRef={register({
                      required: { value: true, message: reqmsg },
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <TextField
                    name="father_last_name"
                    type="text"
                    label="Apellido paterno"
                    variant="outlined"
                    margin="dense"
                    className="input"
                    fullWidth
                    defaultValue={patientInfo.father_last_name}
                    error={errors.father_last_name}
                    helperText={
                      errors.father_last_name
                        ? errors.father_last_name.message
                        : ""
                    }
                    inputRef={register({
                      required: { value: true, message: reqmsg },
                    })}
                  />
                </Grid>
                <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
              </Grid>

              <Grid item container spacing={isMobile ? 0 : 2}>
                <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <TextField
                    name="mother_last_name"
                    type="text"
                    label="Apellido materno"
                    variant="outlined"
                    margin="dense"
                    className="input"
                    fullWidth
                    defaultValue={patientInfo.mother_last_name}
                    error={errors.mother_last_name}
                    helperText={
                      errors.mother_last_name
                        ? errors.mother_last_name.message
                        : ""
                    }
                    inputRef={register({
                      required: { value: true, message: reqmsg },
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <TextField
                    name="city"
                    type="text"
                    label="Ciudad"
                    variant="outlined"
                    margin="dense"
                    className="input"
                    fullWidth
                    defaultValue={patientInfo.city}
                    error={errors.city}
                    helperText={errors.city ? errors.city.message : ""}
                    inputRef={register({
                      required: { value: true, message: reqmsg },
                    })}
                  />
                </Grid>
                <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
              </Grid>

              <Grid item container spacing={isMobile ? 0 : 2}>
                <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <TextField
                    name="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    margin="dense"
                    className="input"
                    fullWidth
                    defaultValue={patientInfo.email}
                    error={errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                    inputRef={register({
                      required: { value: true, message: reqmsg },
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <TextField
                    name="phone"
                    label="Teléfono"
                    type="text"
                    variant="outlined"
                    margin="dense"
                    className="input"
                    fullWidth
                    defaultValue={patientInfo.phone}
                    error={errors.phone}
                    helperText={errors.phone ? errors.phone.message : ""}
                    inputRef={register({
                      required: { value: true, message: reqmsg },
                    })}
                  />
                </Grid>
                <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
              </Grid>

              <Grid item container spacing={isMobile ? 0 : 2}>
                <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <TextField
                    name="alimentation"
                    label="Tipo de alimentación"
                    type="text"
                    variant="outlined"
                    margin="dense"
                    className="input"
                    fullWidth
                    defaultValue={patientInfo.alimentation}
                    error={errors.alimentation}
                    helperText={
                      errors.alimentation ? errors.alimentation.message : ""
                    }
                    inputRef={register({
                      required: { value: true, message: reqmsg },
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <TextField
                    name="birth_date"
                    type="date"
                    variant="outlined"
                    margin="dense"
                    className="input"
                    fullWidth
                    defaultValue={patientInfo.birth_date.substring(0, 10)}
                    error={errors.birth_date}
                    helperText={
                      errors.birth_date
                        ? errors.birth_date.message
                        : "Fecha de nacimiento"
                    }
                    inputRef={register({
                      required: { value: true, message: reqmsg },
                    })}
                  />
                </Grid>
                <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
              </Grid>

              <Grid item container spacing={isMobile ? 0 : 2}>
                <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <FormControl variant="outlined" margin="dense" fullWidth>
                    <InputLabel htmlFor="select-sex">Sexo</InputLabel>
                    <Select
                      native
                      name="sex"
                      label="Sexo"
                      inputRef={register}
                      defaultValue={patientInfo.sex}
                    >
                      <option value={"Masculino"}>Masculino</option>
                      <option value={"Femenino"}>Femenino</option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <FormControl variant="outlined" margin="dense" fullWidth>
                    <InputLabel htmlFor="select-state">Estado</InputLabel>
                    <Select
                      native
                      name="state"
                      label="Estado"
                      inputRef={register}
                      defaultValue={patientInfo.state}
                    >
                      <option value={"active"}>Activo</option>
                      <option value={"unactive"}>Inactivo</option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
              </Grid>
            </Grid>

            <Grid container justify="center" alignItems="center">
              <div className={classes.wrapper}>
                <Button
                  className="form-button"
                  variant="outlined"
                  type="submit"
                  color="primary"
                  disabled={loading}
                >
                  Guardar cambios
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </Grid>
          </React.Fragment>
        ) : (
          <SkeletonForm />
        )}
      </form>
      {modifiedPatient && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Datos del paciente modificados exitosamente!
          </Alert>
        </Snackbar>
      )}
    </ModifyPatientStyled>
  );
}
