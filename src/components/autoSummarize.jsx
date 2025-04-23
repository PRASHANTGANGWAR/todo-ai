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
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
let env = import.meta.env.VITE_API_KEY

const AIFeatureSelectionModal = ({ open, onClose, onConfirm, title, description }) => {
  const [selectedFeature, setSelectedFeature] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [sourceLang, setSourceLang] = useState("eng_Latn");
  const [targetLang, setTargetLang] = useState("hin_Deva");

  const navigate = useNavigate();

  const features = [
    "Translate notes to multiple languages",
    "Sentiment analysis and emoji-based mood indicators",
  ];

  const handleFeatureToggle = (feature) => {
    setSelectedFeature(feature);
    if (feature === "Translate notes to multiple languages") {
      setShowLanguageDialog(true);
    }
  };

  const handleConfirm = () => {
    if (selectedFeature === "Translate notes to multiple languages") {
      translateText(description, sourceLang, targetLang);
    } else if (selectedFeature === "Sentiment analysis and emoji-based mood indicators") {
      analyzeSentiment(description);
    } else {
      onConfirm([selectedFeature]);
    }
  };

  const translateText = async (text, source, target) => {

    setLoading(true);
    setError("");
    try {

      const response = await fetch("https://api-inference.huggingface.co/models/facebook/nllb-200-distilled-600M", {
        method: "POST",
        headers: {
          Authorization:  `Bearer ${env}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: text,
          parameters: {
            src_lang: source,
            tgt_lang: target,
          },
        }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/ai-result", {
          state: {
            result: data[0].translation_text,
            feature: selectedFeature,
          },
        });
      } else {
        throw new Error(data.error || "Failed to translate text");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const analyzeSentiment = async (text) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      });

      const data = await response.json();
      if (response.ok) {
        const sentiment = data[0]?.[0]?.label || "Unknown";
        console.log(data[0]?.[0]?.label,'labelllll')
        const emoji = sentiment === "POSITIVE" ? "😊" : sentiment === "NEGATIVE" ? "😞" : "🤔";

        navigate("/ai-result", {
          state: {
            result: `Sentiment: ${sentiment} ${emoji}`,
            feature: selectedFeature,
          },
        });
      } else {
        throw new Error(data.error || "Failed to analyze sentiment");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{title || "AI Features"}</DialogTitle>
        <DialogContent>
          <List sx={{ p: 0 }}>
            {features.map((feature, index) => (
              <ListItem key={index} sx={{ pl: 0 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedFeature === feature}
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
          <Button onClick={onClose} variant="contained" sx={{ background: "red" }}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            sx={{ color: "white", background: "black", "&:hover": { background: "#333" } }}
            variant="contained"
            disabled={loading}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          Operation completed successfully!
        </Alert>
      </Snackbar>

      <Dialog open={showLanguageDialog} onClose={() => setShowLanguageDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Select Languages</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <FormControl fullWidth>
              <InputLabel>Source Language</InputLabel>
              <Select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                label="Source Language"
              >
                <MenuItem value="eng_Latn">English</MenuItem>
                <MenuItem value="spa_Latn">Spanish</MenuItem>
                <MenuItem value="fra_Latn">French</MenuItem>
                <MenuItem value="hin_Deva">Hindi</MenuItem>
                <MenuItem value="arb_Arab">Arabic</MenuItem>
                <MenuItem value="zho_Hans">Chinese</MenuItem>
                <MenuItem value="rus_Cyrl">Russian</MenuItem>
                <MenuItem value="jpn_Jpan">Japanese</MenuItem>
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
                <MenuItem value="spa_Latn">Spanish</MenuItem>
                <MenuItem value="fra_Latn">French</MenuItem>
                <MenuItem value="hin_Deva">Hindi</MenuItem>
                <MenuItem value="arb_Arab">Arabic</MenuItem>
                <MenuItem value="zho_Hans">Chinese</MenuItem>
                <MenuItem value="rus_Cyrl">Russian</MenuItem>
                <MenuItem value="jpn_Jpan">Japanese</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setShowLanguageDialog(false)} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AIFeatureSelectionModal;
