import "./NoteCard.css";

const NoteCard = ({ note }) => {
  return (
    <div className="note-card">
      <h2 className="note-title">{note.title}</h2>
      <p className="note-description">{note.description}</p>

      <div className="note-footer">
        <button className="edit-btn">Edit</button>
        <button className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
