import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles(theme => ({
  uploadDiv: {
    position: "relative",
    width: "150px",
    cursor: "pointer"
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
  }
}));
export default function(props) {
  const { fileRef, previewImg } = props;
  const classes = useStyles();
  return (
    <div className={classes.uploadDiv}>
      <Button variant="contained" color="primary">
        点击上传
      </Button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className={classes.uploadFileInput}
        onChange={previewImg}
      ></input>
    </div>
  );
}
