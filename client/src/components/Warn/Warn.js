import React from "react";
import { Box, Button, Typography } from "@mui/material";

export default function Error({ setFlag }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#212529",
      }}
    >
      <Typography variant="h1" style={{ color: "white" }}>
        Warning
      </Typography>
      <Typography variant="h6" style={{ color: "white" }}>
        Use a Bigger screen to view PDF Properly
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          setFlag(false);
        }}
      >
        Reset
      </Button>
    </Box>
  );
}
