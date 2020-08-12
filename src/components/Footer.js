import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      SoyNutri {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          SoyNutri
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          No empieces una dieta que terminara algún día, comienza un estilo de
          vida que dure para siempre!
        </Typography>
        <Copyright />
      </footer>
    </React.Fragment>
  );
}
