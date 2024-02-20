import React, { useCallback, useEffect, useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import CodeIcon from '@mui/icons-material/Code';
import SubscriptIcon from '@mui/icons-material/Subscript';
import SuperscriptIcon from '@mui/icons-material/Superscript';
import "draft-js/dist/Draft.css";
import "./MyEditor.scss";
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';

const MyEditor = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

  const onChange = useCallback((newEditorState) => {
    setEditorState(newEditorState);
  }, []);

  const handleKeyCommand = useCallback(
    (command, editorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);

      if (newState) {
        onChange(newState);
        return "handled";
      }

      return "not-handled";
    },
    [onChange]
  );


  console.log(editorState.getCurrentContent().getPlainText());

  return (
    <div className="my-editor-main-div">
    <FormattingOptions editorState={editorState} onChange={onChange} />
    <div className="editor-main-div">
    <Editor
      editorState={editorState}
      onChange={onChange}
      handleKeyCommand={handleKeyCommand}
      plugins={[inlineToolbarPlugin]}
    />
    </div>
    </div>
  );
}

const FormattingOptions = ({editorState, onChange}) => {

    const [sizeOfFont, setSizeOfFont] = useState(12);

    const onChangingStyle = useCallback((styleType) => {
        onChange(RichUtils.toggleInlineStyle(editorState, styleType));
    }, [onChange, editorState]);

    const fontSize = useCallback((size) => {
        console.log("called", size)
        const newSizeStyle = `${size}px`;
        onChange(RichUtils.toggleInlineStyle(editorState, newSizeStyle));
    }, [onChange, editorState, sizeOfFont])

    useEffect(() => {
        fontSize(sizeOfFont);
    }, [sizeOfFont])

    const allTheStyles = [
        { label: <FormatBoldIcon />, style: 'BOLD' },
        { label: <FormatItalicIcon />, style: 'ITALIC' },
        { label: <FormatUnderlinedIcon />, style: 'UNDERLINE' },
        { label: <StrikethroughSIcon />, style: 'STRIKETHROUGH' },
        { label: <CodeIcon />, style: 'CODE' },
        
    ]

    return (
        <div className="formatting-div">
        {
            allTheStyles.map((style, index) => {
                return (
                    <button className="formatting-btn" key={index} onClick={() => onChangingStyle(style.style)}>{style.label}</button>
                );
            })
        }
        {/*<input placeholder="font size" value={sizeOfFont ? sizeOfFont : ""} onChange={(e) => setSizeOfFont(parseInt(e.target.value))} />*/}
        </div>
    );
}

export default MyEditor;
