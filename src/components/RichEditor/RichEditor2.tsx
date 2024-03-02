import React from "react";
import {
  ContentBlock,
  ContentState,
  DraftBlockType,
  DraftStyleMap,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import "./Rich-editor.css";
import BlockStyleControls from "./BlockStyleControls";
import InlineStyleControls from "./InlineStyleControls";

function getBlockStyle(block: ContentBlock) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return "";
  }
}

// Custom overrides for "code" style.
const styleMap: DraftStyleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    //fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

type Props = {
  initialState?: ContentState;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RichEditor2 = React.forwardRef<Editor, Props>(({ initialState }, ref) => {
  const [editorState, setEditorState] = React.useState(
    initialState
      ? EditorState.createWithContent(initialState)
      : EditorState.createEmpty()
  );

  const toggleBlockType = (blockType: DraftBlockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = "RichEditor-editor";
  const contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder";
    }
  }

  return (
    <div className="RichEditor-root">
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />

      <div className={className} /*onClick={this.focus}*/>
        <Editor
          ref={ref}
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          //   handleKeyCommand={handleKeyCommand}
          //   keyBindingFn={mapKeyToEditorCommand}
          onChange={setEditorState}
          placeholder="Tell a story..."
          spellCheck={true}
        />
      </div>
    </div>
  );
});

export default RichEditor2;
