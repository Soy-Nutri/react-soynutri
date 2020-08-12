import React from "react";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export default function SkeletonForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });
  return (
    <div>
      <Grid container justify="center">
        <Grid item container spacing={isMobile ? 0 : 2}>
          <Grid item xs={false} sm={2} md={3} lg={4}></Grid>

          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Skeleton
              variant="rect"
              height={280}
              style={{ borderRadius: "5px" }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Skeleton
              variant="rect"
              height={280}
              style={{ borderRadius: "5px" }}
            />
          </Grid>
          <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
        </Grid>
      </Grid>
    </div>
  );
}
