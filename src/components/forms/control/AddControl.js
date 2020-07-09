import React from "react";
import styled from "styled-components";

import { useForm } from "react-hook-form";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const AddControlStyled = styled.div`
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

export default function AddControl() {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    console.log(errors);
  };

  const reqmsg = "Campo obligatorio";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });

  return (
    <AddControlStyled>
      <form
        autoComplete="off"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container alignItems="center">
          <Typography className="title" variant="h5" color="primary">
            Agregar control
          </Typography>
        </Grid>

        <Grid container justify="center">
          <Grid item container spacing={isMobile ? 0 : 2}>
            <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>

            <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
              <TextField
                name="rut"
                type="number"
                label="Rut (Sin puntos ni guión)"
                variant="outlined"
                margin="dense"
                className="input"
                fullWidth
                error={errors.rut}
                helperText={errors.rut ? errors.rut.message : ""}
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
            </Grid>

            <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
              <TextField
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
            <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>
          </Grid>

          <Grid item container spacing={isMobile ? 0 : 2}>
            <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>

            <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
              <TextField
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

            <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
              <TextField
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

            <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>
          </Grid>

          <Grid item container spacing={isMobile ? 0 : 2}>
            <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>

            <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
              <TextField
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

          <Grid item container spacing={isMobile ? 0 : 2}>
            <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>

            <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
              <TextField
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

          <Grid item container spacing={isMobile ? 0 : 2}>
            <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>

            <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
              <TextField
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

            <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
              <TextField
                name="subscapular_fold"
                label="Pliegue subescapular (mm)"
                type="text"
                variant="outlined"
                margin="dense"
                className="input"
                fullWidth
                error={errors.subscapular_fold}
                helperText={
                  errors.subscapular_fold ? errors.subscapular_fold.message : ""
                }
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
            </Grid>

            <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>
          </Grid>

          <Grid item container spacing={isMobile ? 0 : 2}>
            <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>

            <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
              <TextField
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

            <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
              <TextField
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

            <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>
          </Grid>

          <Grid item container spacing={isMobile ? 0 : 2}>
            <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>

            <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
              <TextField
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

            <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
              <TextField
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

            <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>
          </Grid>

          <Grid item container spacing={isMobile ? 0 : 2}>
            <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>

            <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
              <TextField
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

            <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
              <TextField
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

            <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>
          </Grid>

          <Grid item container spacing={isMobile ? 0 : 2}>
            <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>

            <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
              <TextField
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

            <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
              <TextField
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

            <Grid item xs={false} sm={1} md={2} lg={3} xl={4}></Grid>
          </Grid>
        </Grid>

        <Grid container alignItems="center">
          <Button
            className="form-button"
            variant="outlined"
            type="submit"
            color="primary"
          >
            Agregar control
          </Button>
        </Grid>
      </form>
    </AddControlStyled>
  );
}
