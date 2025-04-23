import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const AIResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, feature } = location.state || {};

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        AI Result
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
          {result || "No result to display."}
        </Typography>
      </Paper>

      <Button
        variant="contained"
        sx={{ mt: 4 }}
        onClick={() => navigate("/viewNotes")}
        color="secondary"
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default AIResultPage;
