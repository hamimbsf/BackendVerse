import "./NoteCard.css";
import { useState } from "react";

const NoteCard = ({ note, handleDeleteNote, handleUpdateNote }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [description, setDescription] = useState(note.description);

  const handleUpdate = () => {
    handleUpdateNote(note._id, { description });
    setIsEditing(false);
  };

  return (
    <div className="note-card">
      {isEditing ? (
        <>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <h3>{note.title}</h3>
          <p>{note.description}</p>

          <button onClick={() => setIsEditing(true)}>Edit</button>

          <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default NoteCard;
