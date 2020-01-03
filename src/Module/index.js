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
    alignItems: "center",
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
  },
  uploadImg: {
    maxWidth: "200px",
    maxHeight: "250px"
  }
}));
export default function(props) {
  const previewImg = () => {
    console.log(fileRef.current.files[0]);
    let fileReader = new FileReader();
    fileReader.readAsDataURL(fileRef.current.files[0]);
    fileReader.onload = () => {
      setUploadImgData(fileReader.result);
    };
  };
  const classes = useStyles();
  const fileRef = useRef();
  const { uploadImgData, setUploadImgData } = props;
  return (
    <div className={classes.module}>
      <div className={classes.moduleImg}>
        <img
          className={classes.uploadImg}
          alt="模板照片"
          src={uploadImgData}
        ></img>
      </div>
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
    </div>
  );
}
