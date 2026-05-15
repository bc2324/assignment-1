import { useState } from "react";
import "./App.css";
import NotePreviewComponent from "./NotePreviewComponent";

function App() {
  const [notes, setNotes] = useState([
    { id: 1, title: "My note 1", content: "Note content 1" },
    { id: 2, title: "My note 2", content: "Note content 2" },
    { id: 3, title: "My note 3", content: "Note content 3" },
    { id: 4, title: "My note 4", content: "Note content 4" },
  ]);

  function addNote() {
    const n = notes.length + 1;

    const newNote = {
      id: n,
      title: `My note ${n}`,
      content: `Note content ${n}`,
    };

    setNotes([...notes, newNote]);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Notes</h1>

        <button className="add-button" onClick={addNote}>
          + Add note
        </button>
      </header>

      <main className="notes-container">
        <p>TEST NOTES: {notes.length}</p>

        {notes.map((note) => (
          <NotePreviewComponent
            key={note.id}
            title={note.title}
            content={note.content}
          />
        ))}
      </main>
    </div>
  );
}

export default App;