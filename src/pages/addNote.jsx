import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Stack,
  IconButton,
  Paper,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  CalendarToday,
  Settings,
  CameraAlt,
  InsertEmoticon,
  Tune,
  Photo,
  Group,
} from "@mui/icons-material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const icons = [
  { icon: <InsertEmoticon />, label: "Note" },
  { icon: <CalendarToday />, label: "Calendar" },
  { icon: <Tune />, label: "Settings" },
  { icon: <Group />, label: "Group" },
  { icon: <Settings />, label: "Tools" },
];

const priorities = ["Low", "Medium", "High"];

const getUserId = () => {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = `user-${crypto.randomUUID()}`;
    localStorage.setItem("userId", userId);
  }
  return userId;
};

const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reminderDate, setReminderDate] = useState(null);
  const [priority, setPriority] = useState("Low");
  const [selectedIconLabel, setSelectedIconLabel] = useState("Note");
  const navigate = useNavigate();
  const handleReset = () => {
    setTitle("");
    setDescription("");
    setReminderDate(null);
    setPriority("Low");
    setSelectedIconLabel("Note");
  };

  const handleSave = () => {
    const userId = getUserId();

    const newNote = {
      id: crypto.randomUUID(),
      title,
      description,
      date: reminderDate ? reminderDate.toISOString() : null,
      priority,
      iconType: selectedIconLabel,
      createdAt: new Date().toISOString(),
    };

    const existingNotes =
      JSON.parse(localStorage.getItem(`${userId}-notes`)) || [];

    const updatedNotes = [...existingNotes, newNote];
    localStorage.setItem(`${userId}-notes`, JSON.stringify(updatedNotes));

    handleReset();
    alert("Note saved!");
    navigate("/viewNotes"); 

  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 1000, }}>
      <Typography variant="h5" gutterBottom>
        Add New Note
      </Typography>

      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        margin="normal"
      />

      <Box mt={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Reminder Date"
            value={reminderDate}
            onChange={(newValue) => setReminderDate(newValue)}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle1" gutterBottom>
          Select Icon
        </Typography>
        <Stack direction="row" spacing={1}>
          {icons.map(({ icon, label }, index) => (
            <IconButton
              key={index}
              aria-label={label}
              onClick={() => setSelectedIconLabel(label)}
              color={selectedIconLabel === label ? "primary" : "default"}
              sx={{
                border: selectedIconLabel === label ? "2px solid" : "none",
                borderColor: "primary.main",
                borderRadius: 2,
              }}
            >
              {icon}
            </IconButton>
          ))}
        </Stack>
      </Box>

      <TextField
        fullWidth
        select
        label="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        margin="normal"
      >
        {priorities.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <Stack direction="row" spacing={2} mt={3}>
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          Reset
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Stack>
    </Paper>
  );
};

export default NoteForm;
