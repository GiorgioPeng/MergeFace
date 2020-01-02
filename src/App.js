import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Camera from "./Camera";
import "./App.css";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 2
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "400px"
  }
}));
function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <Camera></Camera>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Button>+</Button>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper}>模板图</Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>结果图</Paper>
        </Grid>
      </Grid>
      {/*<Camera></Camera>*/}
    </div>
  );
}

export default App;
