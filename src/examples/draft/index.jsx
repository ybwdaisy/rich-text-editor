import { useCallback, useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

const DraftEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const handleBold = useCallback(event => {
    event.preventDefault()
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
  }, [editorState]);

  const handleCodeBlock = useCallback(event => {
    event.preventDefault()
    setEditorState(RichUtils.toggleCode(editorState))
  }, [editorState]);

  return (
    <div className="draft">
      <button onMouseDown={handleBold}>Bold</button>
      <button onMouseDown={handleCodeBlock}>Code Block</button>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Enter Text Here."
      />
    </div>
  );
}

export default DraftEditor;
