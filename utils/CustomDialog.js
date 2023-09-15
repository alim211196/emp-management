import React, { memo } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import CustomButton from "@/utils/CustomButton";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const CustomDialog = ({
  handleCloseDialog,
  open,
  handleSubmit,
  title,
  children,
  loading,
  btnText,
  maxWidth,
}) => {
  return (
    <BootstrapDialog
      onClose={handleCloseDialog}
      aria-labelledby="customized-dialog-title"
      open={open}
      component="form"
      onSubmit={handleSubmit}
      noValidate
      maxWidth={maxWidth}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={handleCloseDialog}
        sx={{ pr: 2, pl: 2 }}
      >
        {title}
      </BootstrapDialogTitle>
      <DialogContent sx={{ padding: "8px 16px  !important" }} dividers>
        {" "}
        {children}
      </DialogContent>
      <DialogActions sx={{ p: 0 }}>
        <Grid container sx={{ pr: 1 }} justifyContent={"end"}>
          <Grid item xs={12} sm={4} md={4}>
            <CustomButton text={btnText} disabled={loading} />
          </Grid>
        </Grid>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default memo(CustomDialog);
