import React from "react";
import styled from "styled-components";

import { useForm, Controller } from "react-hook-form";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";


import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';

import Select from '@material-ui/core/Select';

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';


//Redux
import { useDispatch, useSelector } from "react-redux";
import { deleteWeeklyDiet } from "../../../redux/ducks/weeklyDietsDucks";




const DeleteWeeklyDietStyled = styled.div`
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
    .texto{
        margin-right:0.2px;
    }
    .semana{
        margin-top:15px;
        margin-left:15px;
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


const useStyles = makeStyles((theme) => ({
    //falta hacerlo responsive
  root: {
    marginLeft:350,
    marginTop:20,
    width: '100%',
    maxWidth: 1000,


  },
}));


//mientras cambie el dia y no aprete el boton se vayan cambiando los datos de los formularios
// os ino tendria que rellenar un dia obligatoriamente ajajedsaxD
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function DeleteWeeklyDiet() {
  const { register, errors, handleSubmit, control } = useForm();
  const dispatch = useDispatch();
  const [open,setOpen] = React.useState(false);
  
  const [dayOfWeek, setDayOfWeek] = React.useState('Dia de la semana');


  const newPatientWeeklyDiet = useSelector((store)=>store.weeklyDiets.addWeeklyDiet)
  const newPatientWeeklyDietError = useSelector((store)=>store.weeklyDiets.errors)
  
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };



  const handleOpen = () => {
    setOpen(true);
  };


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  
  const onSubmit = (data,e) => {
    const fecha = new Date();

    data['date'] =fecha; 

    dispatch(deleteWeeklyDiet(data));
    handleOpen();
    e.target.reset();

    console.log(data);

  };

  const handleChangeDay = (event) => {
    console.log("selecionnaste"+event.target.value);
    setDayOfWeek(event.target.value);
  };

  
  const reqmsg = "Campo obligatorio";

  //Cambiar las horas a las dadas por firebase.
  function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
        key: value,
        }),
    );
    }



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
    <DeleteWeeklyDietStyled>
      <form
        autoComplete="off"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container alignItems="center">
          <Typography className="title" variant="h5" color="primary">
            Eliminar minuta semanal
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
            <Button
                className="form-button"
                variant="outlined"
                type="submit"
                color="primary"
            >
                Traer dietas semanales
            </Button>
            <Grid> 
          </Grid>


         

        </Grid>
        <Grid container justify="center" spacing={isMobile ? 0 : 2}>       
           <Grid item xs={12} sm={8} md={4} lg={4} justify="center" className="semana" >

                {/*aqui ir la semana*/}
                <Controller
                as= { <Select
                        name="day"
                        value={dayOfWeek}
                        onChange={handleChangeDay}
                        >
                        <MenuItem disabled value="Dia de la semana">
                            <em> Dia de la semana</em>
                            <br/>
                        </MenuItem> 
                        <MenuItem value={"Lunes"}>Lunes</MenuItem>
                        <MenuItem value={"Martes"}>Martes</MenuItem>
                        <MenuItem value={"Miercoles"}>Miércoles</MenuItem>
                        <MenuItem value={"Jueves"}>Jueves</MenuItem>
                        <MenuItem value={"Viernes"}>Viernes</MenuItem>
                        <MenuItem value={"Sabado"}>Sábado</MenuItem>
                        <MenuItem value={"Domingo"}>Domingo</MenuItem>
                
                    </Select>}
                    name="day"
                    defaultValue={dayOfWeek}
                    control={control}
                />
                </Grid> 
          
             
            </Grid>


            
       <Grid container justify="center">
    

   
        <Grid container spacing={2}>
        <List dense className={classes.root}>
        {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
            <ListItem key={value} button>
                <ListItemAvatar>
                
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                <ListItemSecondaryAction>
                <Checkbox
                    edge="end"
                    onChange={handleToggle(value)}
                    checked={checked.indexOf(value) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                />
                </ListItemSecondaryAction>
            </ListItem>
            );
        })}

    
    </List>
            </Grid>

            <Button
                className="form-button"
                variant="outlined"
                type="submit"
                color="primary"
            >
                Borrar
            </Button>
            </Grid>

           
        

      
   
      </form>

      {newPatientWeeklyDiet ? (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            La Dieta semanal del paciente {newPatientWeeklyDiet.names} {newPatientWeeklyDiet.father_last_name}{" "}
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

    </DeleteWeeklyDietStyled>
  );
}
