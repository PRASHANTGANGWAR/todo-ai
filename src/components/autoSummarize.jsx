import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Button,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const AIFeatureSelectionModal = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
}) => {
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("fr");

  const features = [
    "Auto-summarize notes using OpenAI",
    "Generate a note title or tags based on content",
    "Classify notes (e.g., Work, Personal, Ideas)",
    "Translate notes to multiple languages",
    "Sentiment analysis and emoji-based mood indicators",
    "Generate follow-up tasks or reminders from a note",
  ];

  const handleFeatureToggle = (feature) => {
    const isSelected = selectedFeatures.includes(feature);
    const updated = isSelected
      ? selectedFeatures.filter((item) => item !== feature)
      : [...selectedFeatures, feature];

    setSelectedFeatures(updated);

    if (!isSelected && feature === "Translate notes to multiple languages") {
      setShowLanguageDialog(true);
    }
  };

  const handleConfirm = () => {
    if (selectedFeatures.includes("Auto-summarize notes using OpenAI")) {
      summarizeText(description);
    }

    if (selectedFeatures.includes("Translate notes to multiple languages")) {
      translateText(description, sourceLang, targetLang);
    }

    onConfirm(selectedFeatures);
  };



  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{title || "AI Features"}</DialogTitle>
        <DialogContent>
          <List>
            {features.map((feature, index) => (
              <ListItem key={index} button>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedFeatures.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                    />
                  }
                  label={feature}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" disabled={loading}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Operation completed successfully!
        </Alert>
      </Snackbar>

      {/* Language selection dialog */}
      <Dialog open={showLanguageDialog} onClose={() => setShowLanguageDialog(false)}>
        <DialogTitle>Select Source and Target Languages</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Source Language</InputLabel>
            <Select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              label="Source Language"
            >
              <MenuItem value="eng_Latn">English</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="hin_Deva">Hindi</MenuItem>
              <MenuItem value="de">German</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Target Language</InputLabel>
            <Select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              label="Target Language"
            >
              <MenuItem value="eng_Latn">English</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="hin_Deva">Hindi</MenuItem>
              <MenuItem value="de">German</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLanguageDialog(false)} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AIFeatureSelectionModal;
