import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const AlertComp = (props) => {
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);
  const [alertState, setalertState] = useState({
    type: null,
    msg: null,
    open: false,
  });

  useEffect(() => {
    if (props.methods) {
      props.methods({
        open: handleClick,
        Props: setalertState,
      });
    }
  }, []);

  useEffect(() => {
    if (props.type && props.msg) {
      setalertState({
        type: props.type,
        msg: props.msg,
        open: props.open,
      });
    }
  }, [props]);

  const handleClick = (type, msg) => {
    setTransition(() => TransitionUp);
    setalertState({
      type: type,
      msg: msg,
      open: true,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setalertState({
      type: "success",
      msg: "",
      open: false,
    });
  };

  return (
    <Snackbar
      open={alertState?.open}
      autoHideDuration={3000}
      onClose={handleClose}
      TransitionComponent={transition}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity={alertState?.type}>{alertState?.msg}</Alert>
    </Snackbar>
  );
};

export default AlertComp;
