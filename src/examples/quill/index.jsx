import ReactQuill from 'react-quill';
import { useState, useCallback } from 'react';

const QuillEditor = ({
  theme,
  placeholder,
}) => {
  const [editorHtml, setEditorHtml] = useState('');

  const handleChange = useCallback((html) => {
    setEditorHtml(html);
  }, []);

  return (
      <ReactQuill
        theme={theme || 'snow'}
        onChange={handleChange}
        value={editorHtml}
        modules={QuillEditor.modules}
        formats={QuillEditor.formats}
        bounds={'#root'}
        placeholder={placeholder || 'Enter text here.'}
       />
   )
}

QuillEditor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'},
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false,
  }
}

QuillEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

export default QuillEditor;
