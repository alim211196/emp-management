import React, { memo } from "react";
import { TableCell, styled, tableCellClasses } from "@mui/material";

const CommonTableCell = ({ align, width, children }) => {
  const StyledTableCell = styled(TableCell)(({ }) => ({
    [`&.${tableCellClasses.head}`]: {
      background: "#474747",
      color: "#fff",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <StyledTableCell align={align} sx={{ width: width }}>
      {children}
    </StyledTableCell>
  );
};

export default memo(CommonTableCell);
