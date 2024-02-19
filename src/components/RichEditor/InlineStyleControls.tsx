import { EditorState } from "draft-js";
import StyleButton from "./StyleButton";
import { INLINE_STYLES } from "./inline-styles.const";

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
          icon={type.icon}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default InlineStyleControls;
