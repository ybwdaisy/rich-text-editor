import ReactQuill from 'react-quill';
import { useState, useCallback, useRef, useMemo } from 'react';

const QuillEditor = ({
  theme,
  placeholder,
}) => {
  const [editorHtml, setEditorHtml] = useState('');
  const quillRef = useRef(null);

  const handleLink = useCallback((value) => {
    const editor = quillRef.current?.getEditor();
    editor?.format('link', value || false);
  }, [])

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        link: handleLink,
      }
    },
    clipboard: {
      matchVisual: false,
    }
  }), [handleLink])

  const handleChange = useCallback((html) => {
    setEditorHtml(html);
  }, []);

  return (
    <ReactQuill
      ref={quillRef}
      theme={theme || 'snow'}
      onChange={handleChange}
      value={editorHtml}
      modules={modules}
      formats={QuillEditor.formats}
      bounds={'#root'}
      placeholder={placeholder || 'Enter text here.'}
    />
  )
}

QuillEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

export default QuillEditor;
