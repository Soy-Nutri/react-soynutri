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
import Skeleton from "@material-ui/lab/Skeleton";
import InstagramIcon from "@material-ui/icons/Instagram";

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
    //flexGrow: 1,
  },
  title: {
    padding: "10px",
    margin: "0",
    display: "flex",
    justifyContent: "center",
    color: "var(--lightPurple)",
    fontFamily: "yellowtail",
  },
}));

function CardDashboard() {
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
                //image="https://firebasestorage.googleapis.com/v0/b/back-f0378.appspot.com/o/117299286_914905595652904_3803091866658917710_n.jpg?alt=media"
                //image="https://firebasestorage.googleapis.com/v0/b/back-f0378.appspot.com/o/ppas.jpg?alt=media"
                image="https://firebasestorage.googleapis.com/v0/b/back-f0378.appspot.com/o/WhatsApp%20Image%202020-08-11%20at%2010.22.10%20PM.jpeg?alt=media"
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  {nutriName === undefined ? (
                    <Grid align="center">
                      <Skeleton width="70%" />
                    </Grid>
                  ) : (
                    nutriName
                  )}
                </Typography>
                <Typography align="center">
                  {academicInfo === undefined ? (
                    <Grid align="center">
                      <Skeleton width="33%" />
                    </Grid>
                  ) : (
                    academicInfo
                  )}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h2" className={classes.title}>
              SOYNUTRI
            </Typography>

            <Typography
              component="h5"
              variant="h5"
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
                {consultAddress === undefined ? (
                  <Grid align="center">
                    <Skeleton width="45%" />
                  </Grid>
                ) : (
                  <div>
                    <AddLocationOutlinedIcon /> {consultAddress}{" "}
                  </div>
                )}
              </Link>
              <br></br>
              <Link href={`https://api.whatsapp.com/send?phone=${phoneNumber}`}>
                {phoneNumber === undefined ? (
                  <Grid align="center">
                    <Skeleton width="45%" />
                  </Grid>
                ) : (
                  <div>
                    {" "}
                    <AddIcCallOutlinedIcon /> {phoneNumber}
                  </div>
                )}
              </Link>
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    href={instagramProfile}
                    startIcon={<InstagramIcon />}
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
