import { FunctionComponent, useRef, useState } from "react";
import { TaskItem } from "../types/Column";
import {
  ContentState,
  Editor,
  RawDraftContentState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { Box } from "@mui/material";
import RichEditor2 from "./RichEditor/RichEditor2";
import RichRditorActions from "./RichEditor/RichEditorActions";

interface DescriptionLiveEditProps {
  item: TaskItem;
}

const DescriptionLiveEdit: FunctionComponent<DescriptionLiveEditProps> = ({
  item,
}) => {
  const [currentItem, setCurrentItem] = useState<TaskItem>(item);
  const [editMode, setEditMode] = useState(false);

  const editorRef = useRef<Editor>(null);

  const getInitialDescription = (item: TaskItem) => {
    let parseJson: RawDraftContentState | null;
    try {
      parseJson = JSON.parse(item.description ?? "") as RawDraftContentState;
    } catch (e) {
      parseJson = null;
    }

    if (parseJson) {
      return parseJson;
    }
    return convertToRaw(ContentState.createFromText(item.description ?? ""));
  };

  const renderDescription = (item: TaskItem) => {
    const content = getInitialDescription(item);

    const sanitizedData = DOMPurify.sanitize(
      stateToHTML(convertFromRaw(content))
    );
    return parse(sanitizedData);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleSave = () => {
    const content = editorRef.current?.props.editorState.getCurrentContent();
    const currentContent = getInitialDescription(item);
    const cToRaw = convertToRaw(content!);

    if (
      (content && JSON.stringify(cToRaw)) === JSON.stringify(currentContent)
    ) {
      setEditMode(false);
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL_TASK}/${currentItem.id}`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({
        description: JSON.stringify(cToRaw),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        if (res.statusCode === undefined) {
          setCurrentItem({
            ...currentItem,
            description: res.description,
          });
          setEditMode(false);
          localStorage.setItem("detected-change", "true");
        }
      });
  };
  return editMode ? (
    <RichRditorActions onCancel={handleCancel} onSave={handleSave}>
      <RichEditor2
        initialState={convertFromRaw(getInitialDescription(currentItem))}
        ref={editorRef}
      />
    </RichRditorActions>
  ) : (
    <Box
      sx={{
        //border: "1px solid #ddd"
        background: "#f4f6f8",

        "&:hover": {
          background: "#f3f3f3",
          backgroundImage: "url(edit.png)",
          backgroundPosition: "center center",
          backgroundSize: "20px",
          backgroundRepeat: "no-repeat",
          cursor: "pointer",
        },

        minHeight: 190,
        padding: 2,
      }}
      onClick={() => {
        setEditMode(true);
      }}
    >
      {renderDescription(currentItem)}
    </Box>
  );
};

export default DescriptionLiveEdit;
