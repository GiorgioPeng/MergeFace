import React from "react";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
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
  return (
    <div>
      <video src=""></video>
      <Button variant="contained" color="primary" className="shot">
        拍照
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className="reShot"
        onClick={() => document.querySelector("video").play()}
      >
        重拍
      </Button>
      <canvas
        id="canvas"
        width="200"
        height="250"
        style={{ display: "none" }}
      ></canvas>
      <img src={imgData} alt="" />
    </div>
  );
}
