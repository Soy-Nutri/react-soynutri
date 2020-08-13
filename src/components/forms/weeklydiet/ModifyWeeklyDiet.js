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
import Alert from "@material-ui/lab/Alert";

//Redux
import { useDispatch , useSelector } from "react-redux";
import { modifyWeeklyDiet , getWeeklyDiets } from "../../../redux/ducks/weeklyDietsDucks";
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

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

export default function ModifyWeeklyDiet() {
  const { register, errors, handleSubmit, control } = useForm();
 
 

 
  const [open,setOpen] = React.useState(false);


  const dispatch = useDispatch();
  const weeklyDiets = useSelector((store)=>store.weeklyDiets.getweeklyDiets);
  const weeklyDietsError = useSelector((store)=>store.weeklyDiets.errors);

  
  const [rut, setRut] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
       return;
    }
     setOpen(false);
   };

  const reqmsg = "Campo obligatorio";

  //Cambiar las horas a las dadas por firebase.


  const searchPatientsWeekly = () => {
    dispatch(getWeeklyDiets(rut));
    setOpenSnackbar(true);
  };

  const [date, setDate] = React.useState("");
  const [newDate, setNewDate] = React.useState("Lunes");



  const [weeklyPatient, setWeeklyPatient] = React.useState({
    date: "",
    lunes:{"breakfast":" ",
      "timeBreakfast":"",
      "lunch": "",
      "timeLunch":  "",
      "snack": "",
      "timeSnack": "",
      "post_training": "",
      "dinner":"",
      "timeDinner": ""},
    martes:{"breakfast":" ",
    "timeBreakfast":"",
    "lunch": "",
    "timeLunch":  "",
    "snack": "",
    "timeSnack": "",
    "post_training": "",
    "dinner":"",
    "timeDinner": ""},
    miercoles:{"breakfast":" ",
    "timeBreakfast":"",
    "lunch": "",
    "timeLunch":  "",
    "snack": "",
    "timeSnack": "",
    "post_training": "",
    "dinner":"",
    "timeDinner": ""},
    jueves:{"breakfast":" ",
    "timeBreakfast":"",
    "lunch": "",
    "timeLunch":  "",
    "snack": "",
    "timeSnack": "",
    "post_training": "",
    "dinner":"",
    "timeDinner": ""},
    viernes:{"breakfast":" ",
    "timeBreakfast":"",
    "lunch": "",
    "timeLunch":  "",
    "snack": "",
    "timeSnack": "",
    "post_training": "",
    "dinner":"",
    "timeDinner": ""},
    sabado:{"breakfast":" ",
    "timeBreakfast":"",
    "lunch": "",
    "timeLunch":  "",
    "snack": "",
    "timeSnack": "",
    "post_training": "",
    "dinner":"",
    "timeDinner": ""},
    domingo:{"breakfast":" ",
    "timeBreakfast":"",
    "lunch": "",
    "timeLunch":  "",
    "snack": "",
    "timeSnack": "",
    "post_training": "",
    "dinner":"",
    "timeDinner": ""},
  });
  
  const handleClickDelete = () => {
    setWeeklyPatient({
      date:"",
      lunes:{},
      martes:{},
      miercoles:{},
      jueves:{},
      viernes:{},
      sabado:{},
      domingo:{},
    });
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

  const [dayOfWeek, setDayOfWeek] = React.useState("lunes");

  const mapeoDeWeeklyDietsLLegadas = weeklyDiets.map((item) => (item.date ) );

  React.useEffect(() => {
   
      if(document.getElementById("breakfast") == null && document.getElementById("dinner")== null&&
          document.getElementById("lunch") == null   &&
          document.getElementById("post_training") == null&&
          document.getElementById("snack") == null&&   
          document.getElementById("breakfast_time") == null&&
          document.getElementById("dinner_time") == null&&
          document.getElementById("lunch_time") == null &&
          document.getElementById("collation_time") == null ){
      }
      else{
        //variables
        var breakf = document.getElementById("breakfast");
        var dinn = document.getElementById("dinner");
        var lunc =  document.getElementById("lunch");
        var pstraining = document.getElementById("post_training");
        var snac =  document.getElementById("snack");
        //los tiempos
        var brkfast =  document.getElementById("breakfast_time");
        var timdinn =  document.getElementById("dinner_time");
        var timlunc = document.getElementById("lunch_time");
        var timsnac = document.getElementById("collation_time");

        var aux = weeklyDiets[mapeoDeWeeklyDietsLLegadas.indexOf(weeklyPatient.date)];
  

        aux = aux[dayOfWeek]
    
        if(aux=== undefined ){
          console.log("El dia no existe asi que tiene que meterlo igual")
        }
        else{
          breakf.value= aux.breakfast;
          snac.value =  aux.snack;
          dinn.value=aux.dinner;
          lunc.value =  aux.lunch;
          pstraining.value=aux.post_training;
          brkfast.value = aux.timeBreakfast;
          timdinn.value = aux.timeDinner;
          timlunc.value = aux.timeLunch;
          timsnac.value = aux.timeSnack;
        }
 
      }
  });



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
  };

  const handleChangeRut = (event) =>{
    setRut(event.target.value);
  };
 

  const handleChange = (event) => {
    setDate(event.target.value);
    setWeeklyPatient(event.target.value);
    setNewDate(event.target.value);
    //console.log(event.target.value);
  };

 const handleModifyDay = (event)=>{
  
        //variables
      var breakf = document.getElementById("breakfast").value;
      var dinn = document.getElementById("dinner").value;
      var lunc =  document.getElementById("lunch").value;
      var pstraining = document.getElementById("post_training").value;
      var snac =  document.getElementById("snack").value;
      //los tiempos
      var brkfast =  document.getElementById("breakfast_time").value;
      var timdinn =  document.getElementById("dinner_time").value;
      var timlunc = document.getElementById("lunch_time").value;
      var timsnac = document.getElementById("collation_time").value;

      weeklyPatient[dayOfWeek] = {  
        breakfast: breakf,
        timeBreakfast: brkfast,
        lunch: lunc,
        timeLunch:  timlunc,
        snack: snac,
        timeSnack: timsnac,
        post_training: pstraining,
        dinner:dinn,
        timeDinner: timdinn,
       };
     //actual  weeklyDiets

      console.log(weeklyPatient)
 };

 const sendModify = (event) =>{ 
    console.log("AHI LE VA AL MODIFY");
    console.log(weeklyPatient);
    let aux = weeklyDiets[mapeoDeWeeklyDietsLLegadas.indexOf(weeklyPatient.date)];

    

    dispatch(modifyWeeklyDiet(weeklyPatient));
    //handleOpen();

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
     
        <Grid container alignItems="center">
          <Typography className="title" variant="h5" color="primary">
            Modificar minuta semanal
          </Typography>
        </Grid>

        <Grid container justify="center" spacing={isMobile ? 0 : 2}>
          <Grid item xs={12} sm={8} md={4} lg={4}>
            <TextField
              value={rut}
              name="rut"
              type="text"
              label="Rut (Sin puntos ni guión)"
              variant="outlined"
              margin="dense"
              fullWidth
              onChange={handleChangeRut}
              error={errors.rut}
              helperText={errors.rut ? errors.rut.message : ""}
              inputRef={register({
                required: { value: true, message: reqmsg },
              })}
            />
            <Button
                className="form-button"
                variant="outlined"
                type="submit"
                color="primary"
                onClick={() => searchPatientsWeekly()}
              >
                Buscar
            </Button>
          </Grid>
         
        </Grid>

        <br></br>
      
        {  weeklyDiets && weeklyDiets.length > 0 && weeklyPatient.date === "" &&(
         
        <Grid container justify="center" spacing={isMobile ? 0 : 2}>
   
            <Grid container justify="center"  >
        
          
                <Grid item xs={12} sm={4} md={2} lg={2} className="semana" >
                  <span>Selecciona una de las dietas semanales para editar</span> <br></br>
                    
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={date}
                      onChange={handleChange}>
                      {weeklyDiets.map((item) => (
                      <MenuItem value={item} key={item.date}>
                        {getFecha(item.date)}
                      </MenuItem>
                    ))}

                      </Select>
                  
                </Grid>
            

                
            </Grid>
        </Grid>
        )}
        {weeklyPatient.date !== "" &&  ( <div id="holax">        
  
       
          <br></br>
          <Grid container justify="center" spacing={isMobile ? 0 : 2} className="semana">
          <span>Seleccione el día de la semana editar</span> 
          </Grid>

          <Grid container justify="center" spacing={isMobile ? 0 : 2} className="semana">
          <br></br> 
       
            <Select name="day" id="hola" value={dayOfWeek} onChange={handleChangeDay}>
              <MenuItem disabled value="Dia de la semana">
                <em> Dia de la semana</em>
                <br />
              </MenuItem>
              <MenuItem value={"lunes"}>Lunes</MenuItem>
              <MenuItem value={"martes"}>Martes</MenuItem>
              <MenuItem value={"miercoles"}>Miércoles</MenuItem>
              <MenuItem value={"jueves"}>Jueves</MenuItem>
              <MenuItem value={"viernes"}>Viernes</MenuItem>
              <MenuItem value={"sabado"}>Sábado</MenuItem>
              <MenuItem value={"domingo"}>Domingo</MenuItem>
            </Select>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    
            <Button
              className="form-button "
              variant="outlined"
              type="submit"
              color="primary"
              onClick={handleModifyDay}
            >
              Cambiar el dia seleccionado
            </Button>
          </Grid>

       
            
        
          <br></br>
       

   

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

              defaultValue="Ejemplo"  
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
              defaultValue="Ejemplo"  
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

          <Grid item xs={false} md={2} lg={2} className="grid-invisible"></Grid>
          <Grid item xs={false} md={2} lg={2} className="grid-invisible"></Grid>

          <Grid item xs={12} sm={8} md={4} lg={4}>
            <TextField
              defaultValue="ejemplo"  
              id = "snack"
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
             defaultValue="Ejemplo" 
             id = "post_training" 
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

          <Grid item xs={false} md={2} lg={2} className="grid-invisible"></Grid>
          <Grid item xs={false} md={2} lg={2} className="grid-invisible"></Grid>

          <Grid item xs={12} sm={8} md={4} lg={4}>
            <TextField
              defaultValue="Ejemplo" 
              id = "dinner" 
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

          <Grid item xs={12} sm={8} md={4} lg={4}>
            <TextField
              defaultValue="Ejemplo"  
              id = "goals" 
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
            onClick={sendModify}
          >
            Enviar Minuta Semanal
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
    
      </div>
      
      ) 
      }
      <div>

        {weeklyDietsError ? (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Ha ocurrido un error, intente otra vez.
            </Alert>
          </Snackbar>
        ) : weeklyDiets ? (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              La Dieta semanal del paciente con rut
              {weeklyDiets} fue agregado exitosamente!{" "}
            </Alert>
          </Snackbar>
        ) : (
          ""
        )}

      </div>
 
    </AddWeeklyDietStyled>
  );
}
