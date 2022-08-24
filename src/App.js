import SlateEditor from './examples/slate';
import QuillEditor from './examples/quill';
import DraftEditor from './examples/draft';

const App = () => {
  return (
    <div>
      <h1>Slate Editor</h1>
      <SlateEditor />
      <h1>Quill Editor</h1>
      <QuillEditor />
      <h1>Draft Editor</h1>
      <DraftEditor />
    </div>
  );
}

export default App;
