import React from "react";
import { useRef, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "./Dialog";
import { makeStyles } from "@material-ui/core/styles";
import Upload from "../Upload";
const useStyles = makeStyles(theme => ({
  selfPhoto: {
    display: "flex",
    height: "300px",
    width: "100%",
    alignItem: "center",
    justifyContent: "center",
    border: "1px solid grey",
    marginBottom: "5px"
  },
  bottomUpload: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    marginTop: "5px",
    alignItems: "center"
  }
}));
export default function(props) {
  const { matchScreen, selfImgData, setSelfImgData } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const fileRef = useRef();
  const videoRef = useRef();
  const canvasRef = useRef();
  const classes = useStyles();
  const openCamera = () => {
    const constraints = { audio: true, video: { width: 200, height: 250 } };
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(mediaStream) {
          console.log("getUserMedia:", mediaStream);
          videoRef.current.srcObject = mediaStream;
          videoRef.current.onloadedmetadata = function(e) {
            videoRef.current.play();
          }; //开始录像
          videoRef.current.addEventListener("timeupdate", function() {
            canvasRef.current
              .getContext("2d")
              .drawImage(videoRef.current, 0, 0, 200, 250);
          }); //实时绘图
        });
    } //如果打开是以localhost, file:///, 或者https协议打开,则能够打开摄像头,不需要处理错误逻辑
    else {
      //如果是以http协议打开,则不能调用出摄像头
      setDialogOpen(true);
    }
  };
  const takePhoto = () => {
    console.log(videoRef.current.srcObject);
    if (videoRef.current.srcObject !== null) {
      videoRef.current.pause();
      setSelfImgData(canvasRef.current.toDataURL("image/jpeg"));
      //拍照
    }
  };
  const reDraw = () => {
    if (fileRef.current.files[0] && fileRef.current.files[0].size) {
      console.log("re-draw");
      let newImg = new Image();
      newImg.src = selfImgData;
      newImg.style.transform = matchScreen ? "rotate(90deg)" : "";
      newImg.onload = () => {
        canvasRef.current.getContext("2d").drawImage(newImg, 0, 0, 200, 250);
        setSelfImgData(
          canvasRef.current.toDataURL(
            "image/jpeg",
            fileRef.current.files[0].size > 1900000
              ? 1900000 / fileRef.current.files[0].size
              : 1
          )
        ); //压缩图片重新赋值
      };
      //重绘方法
    }
  };
  const previewImg = () => {
    if (videoRef.current.srcObject !== null) {
      videoRef.current.pause();
    }
    let fileReader = new FileReader();
    fileReader.readAsDataURL(fileRef.current.files[0]);
    fileReader.onload = () => {
      setSelfImgData(fileReader.result);
    };

    //预览图
  };
  useEffect(reDraw, [selfImgData]); //重绘图
  return (
    <div>
      <div className={classes.selfPhoto}>
        <video src="" style={{ display: "none" }} ref={videoRef}></video>
        <canvas id="canvas" width="200" height="250" ref={canvasRef}></canvas>
      </div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.reShot}
        onClick={openCamera}
      >
        重拍/打开摄像头
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.shot}
        onClick={takePhoto}
      >
        拍照
      </Button>
      <div className={classes.bottomUpload}>
        <span style={{ fontSize: "10px", color: "red" }}>也可以上传图片哦</span>
        <Upload fileRef={fileRef} previewImg={previewImg}></Upload>
      </div>
      <Dialog
        openAttribute={dialogOpen}
        closeFunction={() => setDialogOpen(false)}
        matchScreen={matchScreen}
      ></Dialog>
    </div>
  );
}
