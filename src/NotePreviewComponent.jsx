import { useState } from "react";
import "./NotePreviewComponent.css";

function NotePreviewComponent({ noteId, title, content, updateNote }) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingContent, setEditingContent] = useState(false);

  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentContent, setCurrentContent] = useState(content);

  function saveChanges() {
    setEditingTitle(false);
    setEditingContent(false);
    updateNote(noteId, currentTitle, currentContent);
  }

  return (
    <div className="note-preview">
      <div className="note-title">
        {editingTitle ? (
          <input
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            onBlur={saveChanges}
            autoFocus
          />
        ) : (
          <h2 onDoubleClick={() => setEditingTitle(true)}>{currentTitle}</h2>
        )}
      </div>

      <div className="note-content">
        {editingContent ? (
          <textarea
            value={currentContent}
            onChange={(e) => setCurrentContent(e.target.value)}
            onBlur={saveChanges}
            autoFocus
          />
        ) : (
          <p onDoubleClick={() => setEditingContent(true)}>{currentContent}</p>
        )}
      </div>
    </div>
  );
}

export default NotePreviewComponent;