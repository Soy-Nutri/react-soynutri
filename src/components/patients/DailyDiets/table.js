import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function getFecha(date) {
  let newDate = new Date(date);
  let month = (newDate.getMonth() + 1).toString();
  let day = (newDate.getDate() + 1).toString();
  let year = newDate.getFullYear().toString();
  let dayS = day.length > 1 ? day : `0${day}`;
  let monthS = month.length > 1 ? month : `0${month}`;
  return `${dayS}/${monthS}/${year}`;
}

export default function SimpleAccordion({ dates, diets }) {
  const classes = useStyles();

  const [date, setDate] = React.useState("");

  React.useEffect(() => {
    const setInfo = () => {
      setDate(dates[0]);
    };
    setInfo();
  }, [setDate, dates]);

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <h3 style={{ margin: 0, marginLeft: 20 }}>Fechas disponibles</h3>
        <Select
          style={{ margin: 0, marginLeft: 20 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={date}
          onChange={handleChange}
        >
          {dates.map((item) => (
            <MenuItem value={item} key={item}>
              {getFecha(item)}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      <Accordion style={{ margin: 20, marginBottom: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Desayuno {date !== "" && diets[date].breakfast.time}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{date !== "" && diets[date].breakfast.meal}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ margin: 20, marginBottom: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Almuerzo {date !== "" && diets[date].lunch.time}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{date !== "" && diets[date].lunch.meal}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ margin: 20, marginBottom: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Colación {date !== "" && diets[date].snack.time}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{date !== "" && diets[date].snack.meal}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ margin: 20, marginBottom: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Cena {date !== "" && diets[date].dinner.time}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{date !== "" && diets[date].dinner.meal}</Typography>
        </AccordionDetails>
      </Accordion>

      <h3 style={{ margin: 0, marginLeft: 20, marginTop: 10 }}>
        Alimentación post entrenamiento
      </h3>
      <ul>{date !== "" && diets[date].post_training}</ul>

      <h4 style={{ margin: 0, marginLeft: 20, marginTop: 10 }}>
        Esta pauta aporta {date !== "" && diets[date].calories} Kcal y{" "}
        {date !== "" && diets[date].proteins} gr/prot/d
      </h4>

      <h3 style={{ margin: 0, marginLeft: 20, marginTop: 10 }}>Metas</h3>
      <ul>{date !== "" && diets[date].goals}</ul>

      <h3 style={{ margin: 0, marginLeft: 20, marginTop: 10 }}>
        Información extra
      </h3>
      <ul>{date !== "" && diets[date].extra_info}</ul>
    </div>
  );
}
