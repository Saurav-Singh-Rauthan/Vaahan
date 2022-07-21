import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import Styles from "./Dialog.module.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dialogcomp = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onTrueHandler = () => {
    props.onTrue();
    handleClose();
  };

  useEffect(() => {
    props.setMethods({
      openDialog: handleClickOpen,
    });
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        TransitionComponent={Transition}
      >
        <DialogTitle id="responsive-dialog-title">{props?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ padding: "1rem 2rem 0.5rem 2rem" }}>
            {props?.desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className={Styles.btn} autoFocus={true} onClick={handleClose}>
            NO
          </button>
          <button className={Styles.btn} onClick={onTrueHandler}>
            YES
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dialogcomp;
