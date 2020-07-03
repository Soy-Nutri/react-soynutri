import React from "react";
import styled from "styled-components";

import { useForm } from "react-hook-form";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const AddUserStyled = styled.div`
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

export default function AddUser() {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    console.log(errors);
  };

  const reqmsg = "Campo obligatorio";

  return (
    <AddUserStyled>
      <form
        autoComplete="off"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container alignItems="center">
          <Typography className="title" variant="h5" color="primary">
            Agregar paciente
          </Typography>
        </Grid>
        <Grid container justify="center">
          <Grid item container spacing={2}>
            <Grid item xs={false} sm={4}></Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                name="rut"
                type="number"
                label="Rut"
                variant="outlined"
                margin="dense"
                className="input"
                fullWidth
                error={errors.rut}
                helperText={
                  errors.rut ? errors.rut.message : "Sin puntos ni guión"
                }
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
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
            <Grid item xs={false} sm={4}></Grid>
          </Grid>

          <Grid item container spacing={2}>
            <Grid item xs={false} sm={4}></Grid>
            <Grid item xs={12} sm={2}>
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
            <Grid item xs={12} sm={2}>
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
            <Grid item xs={false} sm={4}></Grid>
          </Grid>

          <Grid item container spacing={2}>
            <Grid item xs={false} sm={4}></Grid>
            <Grid item xs={12} sm={2}>
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
            <Grid item xs={12} sm={2}>
              <TextField
                name="email"
                label="Email"
                type="text"
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
            <Grid item xs={false} sm={4}></Grid>
          </Grid>

          <Grid item container spacing={2}>
            <Grid item xs={false} sm={4}></Grid>
            <Grid item xs={12} sm={2}>
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
            <Grid item xs={12} sm={2}>
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
            <Grid item xs={false} sm={4}></Grid>
          </Grid>

          <Grid item container spacing={2}>
            <Grid item xs={false} sm={4}></Grid>
            <Grid item xs={12} sm={2}>
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
            <Grid item xs={12} sm={2}>
              <FormControl variant="outlined" margin="dense" fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Sexo
                </InputLabel>
                <Select native name="sex" label="Sexo" inputRef={register}>
                  <option value={"male"}>Masculino</option>
                  <option value={"female"}>Femenino</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={false} sm={4}></Grid>
          </Grid>
        </Grid>

        <Grid container alignItems="center">
          <Button
            className="form-button"
            variant="outlined"
            type="submit"
            color="primary"
          >
            Agregar
          </Button>
        </Grid>
      </form>
    </AddUserStyled>
  );
}
