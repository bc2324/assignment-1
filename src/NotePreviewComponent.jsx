import "./NotePreviewComponent.css";

function NotePreviewComponent({ title, content }) {
  return (
    <div className="note-preview">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export default NotePreviewComponent;