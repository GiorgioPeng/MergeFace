import React from "react";
import { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import $ from "jquery";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Camera from "./Camera";
import Module from "./Module";
import "./App.css";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 2
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
    // height: "400px"
  },
  resultImg: {
    maxWidth: "400px"
  }
}));
function App() {
  const getResultImg = () => {
    let formData = new FormData();
    formData.append("api_key", api_keyRef.current.value);
    formData.append("api_secret", api_secretRef.current.value);
    formData.append("template_base64", uploadImgData);
    formData.append("merge_base64", selfImgData);
    $.ajax({
      type: "POST",
      url: "https://api-cn.faceplusplus.com/imagepp/v1/mergeface",
      data: formData,
      processData: false,
      contentType: false,
      crossDomain: true,
      success: function(response) {
        if (typeof response.error_message == "undefined") {
          // todo: 在这里添加生成后的逻辑，response.result 为生成图的base64编码
          console.log(response);
          setResultImgData("data:image/jpg/png;base64," + response.result);
          // $('.uploadpic').attr('src', 'data:image/jpg/png;base64,' + response.result);
        } else {
          // todo: 在这里添加上传失败的逻辑
          alert("请重新上传照片");
        }
      },
      error: function(xhr, status, error) {
        console.log(xhr.responseText);
        // todo: 在这里添加上传失败的逻辑
        alert("请重新上传照片");
      }
    });
  };
  const classes = useStyles();
  const [selfImgData, setSelfImgData] = useState();
  const [uploadImgData, setUploadImgData] = useState();
  const [resultImgData, setResultImgData] = useState();
  const api_keyRef = useRef();
  const api_secretRef = useRef();
  return (
    <div className={classes.root}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <Camera
              selfImgData={selfImgData}
              setSelfImgData={setSelfImgData}
            ></Camera>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper
            className={classes.paper}
            style={{ backgroundColor: "pink", transform: "translateY(80px)" }}
          >
            <TextField
              required
              id="filled-required"
              label="api_key"
              inputRef={api_keyRef}
              variant="filled"
            />
            <TextField
              required
              id="filled-required"
              label="api_secret"
              inputRef={api_secretRef}
              variant="filled"
            />
            <Button
              onClick={getResultImg}
              style={{
                width: "100%",
                height: "100%",
                fontSize: "20px",
                marginTop: "10px"
              }}
            >
              +
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <Module
              uploadImgData={uploadImgData}
              setUploadImgData={setUploadImgData}
            ></Module>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <img
              alt="结果图"
              className={classes.resultImg}
              src={resultImgData}
            ></img>
          </Paper>
        </Grid>
      </Grid>
      {/*<Camera></Camera>*/}
    </div>
  );
}

export default App;
