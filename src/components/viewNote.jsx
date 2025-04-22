import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import TuneIcon from "@mui/icons-material/Tune";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import GroupIcon from "@mui/icons-material/Group";
import PhotoIcon from "@mui/icons-material/Photo";
import SettingsIcon from "@mui/icons-material/Settings";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import PersonIcon from "@mui/icons-material/Person";

const iconMap = {
  Note: <InsertEmoticonIcon fontSize="large" color="primary" />,
  Calendar: <CalendarTodayIcon fontSize="large" color="primary" />,
  Settings: <SettingsIcon fontSize="large" color="primary" />,
  Photo: <PhotoIcon fontSize="large" color="primary" />,
  Camera: <CameraAltIcon fontSize="large" color="primary" />,
  Group: <GroupIcon fontSize="large" color="primary" />,
  Tools: <TuneIcon fontSize="large" color="primary" />,
};

const ViewNoteCard = ({ note }) => {
  if (!note) return null;

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3, borderRadius: 3,}}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          {iconMap[note.iconType] || <InsertEmoticonIcon fontSize="large" color="disabled" />}
          <Typography variant="h5" fontWeight={600}>
            {note.title}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="body1" mb={2}>
          {note.description}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <CalendarMonthIcon color="action" />
          <Typography variant="body2">
            Reminder: {note.date ? new Date(note.date).toLocaleString() : "None"}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <PriorityHighIcon color="action" />
          <Typography variant="body2">Priority: {note.priority}</Typography>
        </Box>

        <Chip
          icon={<PersonIcon />}
          label="Only Me"
          size="small"
          variant="outlined"
        />
      </CardContent>
    </Card>
  );
};

export default ViewNoteCard;
