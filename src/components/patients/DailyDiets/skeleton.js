import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography component="div" variant={"h3"} style={{ width: 350 }}>
        <Skeleton />
      </Typography>

      <Accordion style={{ margin: 20, marginBottom: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Skeleton />
        </AccordionSummary>
      </Accordion>

      <Accordion style={{ margin: 20, marginBottom: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            <Skeleton variant="text" />
          </Typography>
        </AccordionSummary>
      </Accordion>

      <Accordion style={{ margin: 20, marginBottom: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            <Skeleton variant="text" />
          </Typography>
        </AccordionSummary>
      </Accordion>

      <Accordion style={{ margin: 20, marginBottom: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            <Skeleton variant="text" />
          </Typography>
        </AccordionSummary>
      </Accordion>

      <Typography component="div" variant={"h3"} style={{ width: 350 }}>
        <Skeleton />
      </Typography>

      <Typography component="div" variant={"h3"} style={{ width: 350 }}>
        <Skeleton />
      </Typography>

      <Typography component="div" variant={"h3"} style={{ width: 350 }}>
        <Skeleton />
      </Typography>

      <Typography component="div" variant={"h3"} style={{ width: 350 }}>
        <Skeleton />
      </Typography>
    </div>
  );
}
