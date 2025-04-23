import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import TuneIcon from "@mui/icons-material/Tune";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import GroupIcon from "@mui/icons-material/Group";
import PhotoIcon from "@mui/icons-material/Photo";
import SettingsIcon from "@mui/icons-material/Settings";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const iconMap = {
  Note: <InsertEmoticonIcon sx={{ fontSize: 30, color: "#1976d2" }} />,
  Calendar: <CalendarTodayIcon sx={{ fontSize: 30, color: "#1976d2" }} />,
  Settings: <SettingsIcon sx={{ fontSize: 30, color: "#1976d2" }} />,
  Photo: <PhotoIcon sx={{ fontSize: 30, color: "#1976d2" }} />,
  Camera: <CameraAltIcon sx={{ fontSize: 30, color: "#1976d2" }} />,
  Group: <GroupIcon sx={{ fontSize: 30, color: "#1976d2" }} />,
  Tools: <TuneIcon sx={{ fontSize: 30, color: "#1976d2" }} />,
};

const formatDate = (dateString) => {
  if (!dateString) return null;
  const [day, month, year] = dateString.split("/");
  const isoString = `${year}-${month}-${day}`;
  const date = new Date(isoString);
  return isNaN(date) ? null : date.toLocaleString();
};

const ViewNoteCard = ({ note }) => {
  if (!note) return null;

  const formattedDate = formatDate(note.date);

  return (
    <Card
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 3,
        borderRadius: 2,
        boxShadow: "none",
        border: "1px solid #e0e0e0",
        backgroundColor: "#fdfdfd",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          {iconMap[note.iconType] || (
            <InsertEmoticonIcon sx={{ fontSize: 30, color: "#b0b0b0" }} />
          )}
          <Typography variant="h6" fontWeight={600} color="text.primary">
            {note.title}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontSize: "1rem", lineHeight: 1.6, mb: 2 }}
        >
          {note.description}
        </Typography>

        {formattedDate && (
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarTodayIcon fontSize="small" sx={{ color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              Reminder: {formattedDate}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ViewNoteCard;
