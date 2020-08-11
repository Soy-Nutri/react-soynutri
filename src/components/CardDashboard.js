import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import AddLocationOutlinedIcon from "@material-ui/icons/AddLocationOutlined";
import AddIcCallOutlinedIcon from "@material-ui/icons/AddIcCallOutlined";
import { useDispatch, useSelector } from "react-redux";
import { getGeneralInfoAccion } from "../redux/ducks/generalInfoDucks";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

function CardDashboard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const info = useSelector((store) => store.generalInfo.infoNutri);
  React.useEffect(() => {
    dispatch(getGeneralInfoAccion());
  }, [dispatch]);
  const academicInfo = info.academicInfo;
  const consultAddress = info.consultAddress;
  const instagramProfile = info.instagramProfile;
  const nutriName = info.nutriName;
  const phoneNumber = info.phoneNumber;
  return (
    <React.Fragment>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://firebasestorage.googleapis.com/v0/b/back-f0378.appspot.com/o/117299286_914905595652904_3803091866658917710_n.jpg?alt=media"
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  {nutriName}
                </Typography>
                <Typography align="center">{academicInfo}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Typography
              component="h3"
              variant="h3"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Consulta y Asesoría
            </Typography>
            <br></br>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              MENOS DIETAS, MÁS HÁBITOS<br></br>
              <br></br>
              <Link href="https://www.google.cl/maps/place/Cl%C3%ADnica+del+Alma/@-35.4291459,-71.6700028,17z/data=!3m1!4b1!4m5!3m4!1s0x9665c41e238b8ed3:0x61bbabbe093598a9!8m2!3d-35.4291459!4d-71.6678141">
                <AddLocationOutlinedIcon />
                {consultAddress}
              </Link>
              <br></br>
              <br></br>
              <Link href={`https://api.whatsapp.com/send?phone=${phoneNumber}`}>
                <AddIcCallOutlinedIcon />
                {phoneNumber}
              </Link>
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    href={instagramProfile}
                  >
                    Instagram
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="md">
        <Footer />
      </Container>
    </React.Fragment>
  );
}

export default CardDashboard;
