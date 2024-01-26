import React, { FunctionComponent } from "react";
import {
  ContentBlock,
  DraftBlockType,
  DraftHandleValue,
  DraftStyleMap,
  Editor,
  EditorCommand,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
} from "draft-js";
import "draft-js/dist/Draft.css";
import "./Rich-editor.css";

interface RichEditorProps {}

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
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
];

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

type StyleButtonProps = {
  active: boolean;
  label: string;
  style: string;
  onToggle: (params: string) => void;
};

const StyleButton: React.FC<StyleButtonProps> = ({
  onToggle,
  style,
  active,
  label,
}) => {
  const handleToggle = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    onToggle(style);
  };
  let className = "RichEditor-styleButton";
  if (active) {
    className += " RichEditor-activeButton";
  }

  return (
    <span className={className} onMouseDown={handleToggle}>
      {label}
    </span>
  );
};

type BlockStyleControlsProps = {
  editorState: EditorState;
  onToggle: (params: DraftBlockType) => void;
};

const BlockStyleControls: React.FC<BlockStyleControlsProps> = ({
  editorState,
  onToggle,
}) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

type InlineStyleControlsProps = {
  editorState: EditorState;
  onToggle: (params: string) => void;
};

const InlineStyleControls: React.FC<InlineStyleControlsProps> = ({
  editorState,
  onToggle,
}) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
const RichEditor: FunctionComponent<RichEditorProps> = () => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const handleKeyCommand = (
    command: EditorCommand,
    editorState: EditorState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _eventTimeStamp: number
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const mapKeyToEditorCommand = (
    e: React.KeyboardEvent
  ): EditorCommand | null => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
      return null;
    }
    return getDefaultKeyBinding(e);
  };

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
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={setEditorState}
          placeholder="Tell a story..."
          spellCheck={true}
        />
      </div>
    </div>
  );
};

export default RichEditor;
