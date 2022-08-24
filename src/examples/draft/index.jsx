import { useState } from 'react';
import { Editor, EditorState } from 'draft-js';

const DraftEditor = () => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  return (
    <div className="draft">
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Enter Text Here."
      />
    </div>
  );
}

export default DraftEditor;
