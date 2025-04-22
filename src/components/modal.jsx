import React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const DeleteConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ textAlign: "center", p: 4 }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <WarningAmberIcon sx={{ fontSize: 50, color: "#ec4899" }} />
        </Box>
        <Typography variant="h6" gutterBottom>
          Are you sure?
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          You won't be able to revert this!
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
            sx={{ fontWeight: 600 }}
          >
            Yes, delete it!
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={onClose}
            sx={{ fontWeight: 600 }}
          >
            Cancel
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
