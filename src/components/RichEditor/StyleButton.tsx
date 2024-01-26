type StyleButtonProps = {
  active: boolean;
  label: string;
  icon: React.ReactNode;
  style: string;
  onToggle: (params: string) => void;
};

const StyleButton: React.FC<StyleButtonProps> = ({
  onToggle,
  style,
  icon,
  active,
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
      {icon}
    </span>
  );
};

export default StyleButton;
