import { useState } from "react";
import axios from "axios";
import NoteCard from "./components/NoteCard";
import { useEffect } from "react";

const App = () => {
  const [notes, setnotes] = useState([]);

  const fetchData = () => {
    axios.get("http://localhost:3000/notes").then((res) => {
      setnotes(res.data.notes);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, description } = e.target;
    console.log(title.value, description.value);

    axios
      .post("http://localhost:3000/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchData();
      });
  };

  const handleDeleteNote = (noteId) => {
    console.log(noteId);

    axios.delete(`http://localhost:3000/notes/${noteId}`).then((res) => {
      console.log(res.data);
      fetchData();
    });
  };

  const handleUpdateNote = (noteId, updatedNote) => {
    axios
      .patch(`http://localhost:3000/notes/${noteId}`, updatedNote)
      .then((res) => {
        console.log(res.data);
        fetchData(); // reload notes
      });
  };
  return (
    <>
      <form className="note-form" onSubmit={handleSubmit}>
        <h2>Create Note</h2>

        <input
          name="title"
          type="text"
          placeholder="Enter title"
          className="note-input"
          required
        />

        <textarea
          required
          name="description"
          placeholder="Enter description"
          className="note-textarea"
        />

        <button className="note-btn">Create Note</button>
      </form>

      <div className="container">
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            handleDeleteNote={handleDeleteNote}
            handleUpdateNote={handleUpdateNote}
          />
        ))}
      </div>
    </>
  );
};

export default App;
