import { useEffect, useState } from "react";
import "./App.css";
import NotePreviewComponent from "./NotePreviewComponent";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [notes, setNotes] = useState([]);

  async function fetchNotes() {
    const querySnapshot = await getDocs(collection(db, "notes"));
    const notesArray = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    setNotes(notesArray);
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  async function addNote() {
    const n = notes.length + 1;

    const newNote = {
      title: `My note ${n}`,
      content: `Note content ${n}`,
    };

    const docRef = await addDoc(collection(db, "notes"), newNote);

    setNotes([...notes, { id: docRef.id, ...newNote }]);
  }

  async function updateNote(noteId, title, content) {
    const updatedNotes = notes.map((note) =>
      note.id === noteId ? { ...note, title: title, content: content } : note
    );

    setNotes(updatedNotes);

    await updateDoc(doc(db, "notes", noteId), {
      title: title,
      content: content,
    });
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
        {notes.map((note) => (
          <NotePreviewComponent
            key={note.id}
            noteId={note.id}
            title={note.title}
            content={note.content}
            updateNote={updateNote}
          />
        ))}
      </main>
    </div>
  );
}

export default App;