import { useEffect, useState } from "react";
import "./App.css";
import NotePreviewComponent from "./NotePreviewComponent";
import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Home() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  async function fetchNotes(currentUser) {
    const q = query(
      collection(db, "notes"),
      where("userId", "==", currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    const notesArray = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));

    setNotes(notesArray);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchNotes(currentUser);
      } else {
        setUser(null);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  async function addNote() {
    const n = notes.length + 1;

    const newNote = {
      title: `My note ${n}`,
      content: `Note content ${n}`,
      userId: user.uid,
    };

    const docRef = await addDoc(collection(db, "notes"), newNote);

    setNotes([...notes, { id: docRef.id, ...newNote }]);
  }

  async function updateNote(noteId, title, content) {
    const updatedNotes = notes.map((note) =>
      note.id === noteId ? { ...note, title, content } : note
    );

    setNotes(updatedNotes);

    await updateDoc(doc(db, "notes", noteId), {
      title,
      content,
    });
  }

  async function handleSignOut() {
    await signOut(auth);
    navigate("/login");
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Notes</h1>

        <button className="add-button" onClick={addNote}>
          + Add note
        </button>

        <button onClick={handleSignOut}>Sign Out</button>
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

export default Home;