const app = require("./src/app");

app.get("/", (req, res) => {
  res.send("home");
});

let notes = [];

app.post("/notes", (req, res) => {
  notes = [...notes, req.body];
  res.send("note created");
  console.log(notes);
});

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];
  res.send("notes deleted");
});

app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].description = req.body.description;
  res.send("notes updated");
});

app.listen(3000, () => {
  console.log("Connected");
});
