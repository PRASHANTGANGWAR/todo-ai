import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Box,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import TuneIcon from "@mui/icons-material/Tune";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import GroupIcon from "@mui/icons-material/Group";
import PhotoIcon from "@mui/icons-material/Photo";
import SettingsIcon from "@mui/icons-material/Settings";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ViewNoteCard from "./viewNote";
import DeleteConfirmationDialog from "./modal";
import AIFeatureSelectionModal from "./autoSummarize";

const iconMap = {
  Note: <InsertEmoticonIcon />,
  Calendar: <CalendarTodayIcon />,
  Settings: <SettingsIcon />,
  Photo: <PhotoIcon />,
  Camera: <CameraAltIcon />,
  Group: <GroupIcon />,
  Tools: <TuneIcon />,
};

const NoteCard = ({ title, description, date, iconType, id, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [openAIModal, setOpenAIModal] = useState(false);
  const [selectedAI, setSelectedAI] = useState([]);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleView = () => {
    handleMenuClose();
    setOpenView(true);
  };

  const handleDelete = () => {
    handleMenuClose();
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    const userId = localStorage.getItem("userId");
    const notesKey = `${userId}-notes`;
    const storedNotes = JSON.parse(localStorage.getItem(notesKey)) || [];
    const updatedNotes = storedNotes.filter((note) => note.id !== id);
    localStorage.setItem(notesKey, JSON.stringify(updatedNotes));
    setOpenDelete(false);
    onDelete(id);
  };

  const getShortDescription = (text, wordLimit = 50) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const handleAIModalClose = () => setOpenAIModal(false);
  const handleAIClick = () => setOpenAIModal(true);

  const handleAIFeatureSelection = (selectedFeatures) => {
    setSelectedAI(selectedFeatures);
    setOpenAIModal(false);
    console.log("Selected AI Features:", selectedFeatures);
  };

  const handleEdit = () => {
    handleMenuClose();
    setOpenEdit(true);
  };

  const handleEditSave = () => {
    const userId = localStorage.getItem("userId");
    const notesKey = `${userId}-notes`;
    const storedNotes = JSON.parse(localStorage.getItem(notesKey)) || [];

    const updatedNotes = storedNotes.map((note) =>
      note.id === id ? { ...note, title: editTitle, description: editDescription } : note
    );

    localStorage.setItem(notesKey, JSON.stringify(updatedNotes));
    setOpenEdit(false);
    window.location.reload(); 
  };

  const note = { title, description, date, iconType };

  return (
    <>
      <Card
        sx={{
          width: 300,
          height: 330,
          borderRadius: 3,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent sx={{ flexGrow: 1, overflow: "hidden" }}>
          <Box display="flex" alignItems="center" mb={1} gap={1}>
            {iconMap[iconType] || <InsertEmoticonIcon color="disabled" />}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              overflow: "hidden",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              overflowWrap: "anywhere",
              pr: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary" mb={1}>
              {getShortDescription(description)}
            </Typography>
          </Box>
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleAIClick}
          >
            AI Analysis
          </Button>
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarMonthIcon fontSize="small" />
            <Typography variant="caption">{date}</Typography>
          </Box>
        </CardActions>
      </Card>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleView}>View</MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      <Dialog open={openView} onClose={() => setOpenView(false)} maxWidth="sm" fullWidth>
        <DialogContent sx={{ maxHeight: "70vh", overflowY: "auto" }}>
          <ViewNoteCard note={note} />
        </DialogContent>
      </Dialog>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6">Edit Note</Typography>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Title"
              style={{ padding: "10px", fontSize: "16px" }}
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={5}
              placeholder="Description"
              style={{ padding: "10px", fontSize: "16px" }}
            />
            <Box display="flex" justifyContent="flex-end" gap={1}>
              <Button variant="contained" onClick={() => setOpenEdit(false)} color="error">
                Cancel
              </Button>
              <Button onClick={handleEditSave} variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <DeleteConfirmationDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={confirmDelete}
      />

      <AIFeatureSelectionModal
        open={openAIModal}
        onClose={handleAIModalClose}
        onConfirm={handleAIFeatureSelection}
        title={note.title}
        description={note.description}
      />
    </>
  );
};

export default NoteCard;
