import React, { useState } from "react";
import styled from "styled-components";

import { useForm } from "react-hook-form";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const ModifyPatientStyled = styled.div`
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
    margin-top: 1.5em;
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

// TODO: poner como valor por default en los input los datos que haya guardados en la bd

export default function ModifyPatient() {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    console.log(errors);
  };

  const reqmsg = "Campo obligatorio";

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });

  const handleClickOpen = () => {
    if (!errors) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ModifyPatientStyled>
      <form
        autoComplete="off"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container alignItems="center">
          <Typography className="title" variant="h5" color="primary">
            Modificar datos de paciente
          </Typography>
        </Grid>
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
                error={errors.father_last_name}
                helperText={
                  errors.father_last_name ? errors.father_last_name.message : ""
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
                error={errors.mother_last_name}
                helperText={
                  errors.mother_last_name ? errors.mother_last_name.message : ""
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
                <Select native name="sex" label="Sexo" inputRef={register}>
                  <option value={"male"}>Masculino</option>
                  <option value={"female"}>Femenino</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <FormControl variant="outlined" margin="dense" fullWidth>
                <InputLabel htmlFor="select-state">Estado</InputLabel>
                <Select native name="sex" label="Estado" inputRef={register}>
                  <option value={"active"}>Activo</option>
                  <option value={"unactive"}>Inactivo</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
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
      </form>
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
              Los datos de {"{nombre paciente}"} serán modificados
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
    </ModifyPatientStyled>
  );
}
