import {
  mdiCodeTags,
  mdiFormatHeader1,
  mdiFormatHeader2,
  mdiFormatHeader3,
  mdiFormatHeader4,
  mdiFormatHeader5,
  mdiFormatHeader6,
  mdiFormatQuoteClose,
} from "@mdi/js";
import Icon from "@mdi/react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

export const BLOCK_TYPES = [
  { label: "H1", style: "header-one", icon: <Icon path={mdiFormatHeader1} /> },
  { label: "H2", style: "header-two", icon: <Icon path={mdiFormatHeader2} /> },
  {
    label: "H3",
    style: "header-three",
    icon: <Icon path={mdiFormatHeader3} />,
  },
  { label: "H4", style: "header-four", icon: <Icon path={mdiFormatHeader4} /> },
  { label: "H5", style: "header-five", icon: <Icon path={mdiFormatHeader5} /> },
  { label: "H6", style: "header-six", icon: <Icon path={mdiFormatHeader6} /> },
  {
    label: "Blockquote",
    style: "blockquote",
    icon: <Icon path={mdiFormatQuoteClose} />,
  },
  {
    label: "UL",
    style: "unordered-list-item",
    icon: <FormatListBulletedIcon />,
  },
  { label: "OL", style: "ordered-list-item", icon: <FormatListNumberedIcon /> },
  {
    label: "Code Block",
    style: "code-block",
    icon: <Icon path={mdiCodeTags} />,
  },
];
