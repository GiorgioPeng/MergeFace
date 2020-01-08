import React from "react";
import { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Upload from "../Upload/index.js";

export default function(props) {
  const fileRef = useRef();
  const imgRef = useRef();
  const { matchScreen, uploadImgData, setUploadImgData } = props;
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
  const classes = useStyles();
  const previewImg = () => {
    console.log(fileRef.current.files[0]);
    let fileReader = new FileReader();
    fileReader.readAsDataURL(fileRef.current.files[0]);
    fileReader.onload = () => {
      setUploadImgData(fileReader.result);
    };
  };
  const reDraw = () => {
    if (fileRef.current.files[0] && fileRef.current.files[0].size) {
      let canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 250;
      canvas.getContext("2d").drawImage(imgRef.current, 0, 0, 200, 250);
      setUploadImgData(
        canvas.toDataURL(
          "image/jpeg",
          fileRef.current.files[0].size > 1900000
            ? 1900000 / fileRef.current.files[0].size
            : 1
        )
      ); //压缩图片
    }
  };
  useEffect(reDraw, [uploadImgData]);
  return (
    <div className={classes.module}>
      <div className={classes.moduleImg}>
        <img
          className={classes.uploadImg}
          alt="模板照片"
          src={uploadImgData}
          ref={imgRef}
          style={matchScreen ? { transform: "rotate(90deg)" } : {}}
        ></img>
      </div>
      <Upload fileRef={fileRef} previewImg={previewImg}></Upload>
    </div>
  );
}
