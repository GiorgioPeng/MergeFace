import React from "react";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  selfPhoto: {
    display: "flex",
    height: "300px",
    width: "100%",
    alignItem: "center",
    justifyContent: "center"
  },
  selfImg: {
    marginTop: "25px",
    marginBottom: "25px",
    height: "250px",
    width: "200px"
  }
}));
export default function() {
  const [imgData, setImgData] = useState("");
  const takePhoto = () => {
    const constraints = { audio: true, video: { width: 200, height: 250 } };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function(mediaStream) {
        console.log("getUserMedia:", mediaStream);
        let video = document.querySelector("video");
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
          video.play();
        };

        let canvas = document.getElementById("canvas");
        document.querySelector("button").onclick = () => {
          video.pause();
          canvas.getContext("2d").drawImage(video, 0, 0, 200, 250);
          setImgData(canvas.toDataURL("image/png"));
        };
      });
  };
  useEffect(takePhoto, []);
  const classes = useStyles();
  return (
    <div>
      <div className={classes.selfPhoto}>
        <video src=""></video>
        <canvas
          id="canvas"
          className={classes.selfImg}
          width="200"
          height="250"
        ></canvas>
      </div>
      <Button variant="contained" color="primary" className={classes.shot}>
        拍照
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.reShot}
        onClick={() => document.querySelector("video").play()}
      >
        重拍
      </Button>
    </div>
  );
}
