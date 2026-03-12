import { useState } from "react";
import axios from "axios";
import NoteCard from "./components/NoteCard";
import { useEffect } from "react";

const App = () => {
  const [notes, setnotes] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/notes").then((res) => {
      setnotes(res.data.notes);
    });
  }, []);
  return (
    <div className="container">
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} />
      ))}
    </div>
  );
};

export default App;
