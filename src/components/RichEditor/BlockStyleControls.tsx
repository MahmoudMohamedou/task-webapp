import { DraftBlockType, EditorState } from "draft-js";
import { BLOCK_TYPES } from "./block-types.const";
import StyleButton from "./StyleButton";

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
          icon={type.icon}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default BlockStyleControls;
