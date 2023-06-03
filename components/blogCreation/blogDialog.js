import React, { memo } from "react";
import CustomTextField from "@/utils/CustomTextField";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import CustomDialog from "@/utils/CustomDialog";
import MultilineTextField from "@/utils/MultilineTextField";
import { PhotoCamera, HighlightOff, Photo } from "@mui/icons-material";
const BlogDialog = ({
  handleCloseDialog,
  open,
  handleSubmit,
  flag,
  setFormData,
  formData,
  loading,
  selectedFile,
  handleFileInputChange,
  handleClear,
}) => {
  return (
    <CustomDialog
      handleCloseDialog={handleCloseDialog}
      open={open}
      handleSubmit={handleSubmit}
      title={flag === "add" ? "Add Blog Details:" : "Update Blog Details:"}
      btnText={flag === "add" ? "Create Blog" : "Update Blog"}
      loading={loading}
      maxWidth="xs"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          {selectedFile ? (
            <Box
              sx={{
                height: "200px",
                width: "100%",
                transition: "0.3s",
                position: "relative",
                backgroundSize: "100% 100% !important",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                background: selectedFile
                  ? `url(${selectedFile})`
                  : "transparent",
                display: "flex",
                alignItems: "end",
                justifyContent: "end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255, 255, 255, 0.7)",
                }}
              >
                <IconButton aria-label="upload picture" component="label">
                  <input
                    hidden
                    name="profileImage"
                    accept="image/*"
                    type="file"
                    onChange={handleFileInputChange}
                  />
                  <Tooltip title="Select Image" placement="bottom">
                    <PhotoCamera sx={{ fontSize: "20px" }} />
                  </Tooltip>
                </IconButton>

                <IconButton onClick={handleClear}>
                  <Tooltip title="Remove Image" placement="bottom">
                    <HighlightOff sx={{ fontSize: "20px" }} />
                  </Tooltip>
                </IconButton>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                height: "100px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px dashed rgba(0, 0, 0, 0.23)",
              }}
            >
              <Box
                component="label"
                sx={{
                  height: "100px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Photo
                  sx={{ fontSize: "80px", color: "rgba(0, 0, 0, 0.23)" }}
                />
                <Typography sx={{ fontSize: 16, color: "rgba(0, 0, 0, 0.23)" }}>
                  Select Image
                </Typography>
                <input
                  hidden
                  name="profileImage"
                  accept="image/*"
                  type="file"
                  onChange={handleFileInputChange}
                />
              </Box>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <CustomTextField
            label="Blog Tile"
            name="blog_title"
            type="text"
            value={formData.blog_title}
            setFormData={setFormData}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <MultilineTextField
            label="Blog Description"
            name="blog_description"
            type="text"
            value={formData.blog_description}
            setFormData={setFormData}
          />
        </Grid>
      </Grid>
    </CustomDialog>
  );
};

export default memo(BlogDialog);
