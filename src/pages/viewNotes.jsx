import React, { useEffect, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import NoteCard from "../components/noteCard";

const ViewNotes = () => {
  const [notes, setNotes] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const storedNotes =
      JSON.parse(localStorage.getItem(`${userId}-notes`)) || [];
    setNotes(storedNotes);
  }, [userId]);

  const handleDeleteNote = (deletedId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== deletedId));
  };

  return (
    <Box >
      <Grid container spacing={2}>
        {notes.length > 0 ? (
          notes.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <NoteCard
                title={note.title}
                description={note.description}
                date={
                  note.date
                    ? new Date(note.date).toLocaleDateString()
                    : "No Date"
                }
                iconType={note.iconType}
                id={note.id}
                onDelete={handleDeleteNote}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary" align="center">
              No notes available.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ViewNotes;
