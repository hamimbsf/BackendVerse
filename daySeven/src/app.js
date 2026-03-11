const express = require("express");
const app = express();
const noteModel = require("./models/notes.model");

/* middleware */
app.use(express.json());

/* get/notes */

/* post/notes */
app.post("/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

/* patch/notes/:index */
/* delete/notes/:index */

module.exports = app;
