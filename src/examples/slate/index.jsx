// Import React dependencies.
import { useState, useCallback } from 'react';
// Import the Slate editor factory.
import { createEditor, Transforms, Editor, Text } from 'slate';

// // Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react';

const initialValue = JSON.parse(localStorage.getItem('content')) || [{
  type: 'paragraph',
  children: [{ text: 'A line of text in a paragraph.' }],
}];

const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}

const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  )
}

const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
      universal: true,
    })

    return !!match
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    })

    return !!match
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Editor.isBlock(editor, n) }
    )
  },
}

const SlateApp = () => {
  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, []);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  const onKeyDown = useCallback(event => {
    if (!event.ctrlKey) {
      return
    }
    switch (event.key) {
      case '`': {
        event.preventDefault()
        CustomEditor.toggleCodeBlock(editor);
        break
      }

      case 'b': {
        event.preventDefault()
        CustomEditor.toggleBoldMark(editor);
        break
      }

      default:
        break;
    }
  }, [editor])

  const onChange = useCallback((value) => {
    console.log('onChange', value)
    const isAstChange = editor.operations.some(
      op => 'set_selection' !== op.type
    )
    if (isAstChange) {
      const content = JSON.stringify(value)
      localStorage.setItem('content', content)
    }
  }, [editor.operations])

  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={onChange}
    >
      <div>
        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleBoldMark(editor)
          }}
        >
          Bold
        </button>
        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleCodeBlock(editor)
          }}
        >
          Code Block
        </button>
      </div>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
      />
    </Slate>
  )
};

export default SlateApp;