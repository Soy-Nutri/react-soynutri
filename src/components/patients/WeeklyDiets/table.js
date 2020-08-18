import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Description from "./description";

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

export default function SimpleAccordion({ weeklyDiets }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {weeklyDiets.map((item) =>
        item.date === weeklyDiets[0].date ? (
          <div key={item.date} style={{ marginBottom: 20 }}>
            <Accordion
              style={{ marginLeft: 10, marginRight: 10 }}
              defaultExpanded
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  Minuta agregada el {getFecha(item.date)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Description weekly={item} />
              </AccordionDetails>
            </Accordion>
            {weeklyDiets.length > 1 && <h2>Historial de minutas</h2>}
          </div>
        ) : (
          <Accordion
            key={item.date}
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Minuta agregada el {getFecha(item.date)}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Description weekly={item} />
            </AccordionDetails>
          </Accordion>
        )
      )}
    </div>
  );
}
