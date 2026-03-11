const express = require("express");

const app = express();

app.use(express.json());

let notes = [];

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/home", (req, res) => {
  res.send("hello");
});

app.post("/notes", (req, res) => {
  console.log(req.body);

  notes = [...notes, req.body];

  res.send("note saved");
  console.log(notes);
});

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.listen(3000, () => {
  console.log("server is running");
});
