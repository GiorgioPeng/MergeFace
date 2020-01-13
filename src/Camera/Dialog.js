import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
export default function(props) {
  const { openAttribute, closeFunction, matchScreen } = props;
  return (
    <Dialog
      open={openAttribute}
      onClose={closeFunction}
      fullScreen={matchScreen}
    >
      <DialogTitle>抱歉</DialogTitle>
      <DialogContent>
        <DialogContentText>
          当前页面没有调用摄像头的权限,如需访问具有调用摄像头权限的页面
          <a href="https://giorgiopeng.space/MergeFace">请点击这里</a>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeFunction} color="primary" autoFocus>
          知道了
        </Button>
      </DialogActions>
    </Dialog>
  );
}
