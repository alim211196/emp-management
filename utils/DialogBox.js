import React, { memo } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import { Transition } from "./CustomFunction";

const DialogBox = ({ open, handleClose, handleChange, text }) => {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ zIndex: 1000 }}
      >
        <Box>
          <DialogTitle>{text}</DialogTitle>
          <DialogActions>
            <Button onClick={() => handleClose()}>No</Button>
            <Button onClick={() => handleChange()}>Yes</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};
export default memo(DialogBox);
