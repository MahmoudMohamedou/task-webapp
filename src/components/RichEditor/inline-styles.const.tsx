import { mdiFormatBold, mdiFormatItalic, mdiFormatUnderline } from "@mdi/js";
import Icon from "@mdi/react";

export const INLINE_STYLES = [
  { label: "Bold", style: "BOLD", icon: <Icon path={mdiFormatBold} /> },
  { label: "Italic", style: "ITALIC", icon: <Icon path={mdiFormatItalic} /> },
  {
    label: "Underline",
    style: "UNDERLINE",
    icon: <Icon path={mdiFormatUnderline} />,
  },
  //   { label: "Monospace", style: "CODE", icon: "" },
];
