import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { memo, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CommonTableCell from "@/utils/CommonTableCell";
const TableSection = ({ data, handleOpen, handleEdit }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return data && data?.length > 0 ? (
    <>
      <TableContainer
        sx={{
          maxHeight: 440,
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <CommonTableCell align="left" width="10%">
                Sr No.
              </CommonTableCell>
              <CommonTableCell align="left" width="20%">
                First name
              </CommonTableCell>
              <CommonTableCell align="left" width="20%">
                Last name
              </CommonTableCell>
              <CommonTableCell align="left" width="24%">
                Email
              </CommonTableCell>
              <CommonTableCell align="left" width="16%">
                Username
              </CommonTableCell>
              <CommonTableCell align="center" width="10%">
                Action
              </CommonTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow key={item._id}>
                  <CommonTableCell align="left" width="10%">
                    {index + 1}
                  </CommonTableCell>

                  <CommonTableCell align="left" width="16%">
                    {item.firstname}
                  </CommonTableCell>
                  <CommonTableCell align="left" width="16%">
                    {item.lastname}
                  </CommonTableCell>
                  <CommonTableCell align="left" width="24%">
                    {item.email}
                  </CommonTableCell>
                  <CommonTableCell align="left" width="16%">
                    {item.username}
                  </CommonTableCell>
                  <CommonTableCell align="center" width="10%">
                    <Tooltip title="Edit" placement="top">
                      <IconButton onClick={() => handleEdit(true, item._id)}>
                        <EditIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" placement="top">
                      <IconButton onClick={() => handleOpen(true, item._id)}>
                        <DeleteIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    </Tooltip>
                  </CommonTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ fontSize: 20 }}>No Data Found</Typography>
    </Box>
  );
};

export default memo(TableSection);
