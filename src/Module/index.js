import React from "react";
import { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles(theme => ({
  module: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  moduleImg: {
    display: "flex",
    height: "300px",
    width: "100%",
    alignItem: "center",
    justifyContent: "center",
    border: "1px solid grey",
    marginBottom: "5px"
  },
  uploadFileInput: {
    opacity: "0",
    height: "100%",
    width: "100%",
    position: "absolute",
    left: "0",
    top: "0",
    zIndex: "2",
    cursor: "pointer"
  },
  uploadDiv: {
    position: "relative",
    width: "150px",
    cursor: "pointer"
  }
}));
export default function() {
  const classes = useStyles();
  return (
    <div className={classes.module}>
      <div className={classes.moduleImg}>
        <canvas height="250" width="200"></canvas>
      </div>
      <div className={classes.uploadDiv}>
        <Button variant="contained" color="primary">
          点击上传
        </Button>
        <input
          type="file"
          accept="image/*"
          className={classes.uploadFileInput}
        ></input>
      </div>
    </div>
  );
}
