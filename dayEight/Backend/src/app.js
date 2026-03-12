const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors");

const app = express();

/* middleware */
app.use(cors());
app.use(express.json());

/* Creating note -> /notes */
app.post("/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    messsage: "Note created successfully",
    note,
  });
});

/* Get note -> /notes */
app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "fetched note successfully",
    notes,
  });
});

/* update note -> /notes */

app.patch("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;

  await noteModel.findByIdAndUpdate(id, { description });

  res.status(200).json({
    message: "Note updated successfully",
  });
});

/* delete note -> /notes */

app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted successfully",
  });
});

module.exports = app;
