import { Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import AvatarLogo from "./AvatarLogo";
import Icon from "@mdi/react";
import { getTaskPriorityIcon } from "../utils/getTaskPriorityIcon";
import { icons } from "../consts/Icons";
import { formatIdNum } from "../utils/formatIdNum";
import TaskCardToolBar from "./TaskCardToolBar";
import { Dispatch, SetStateAction } from "react";
import { Column } from "../types/Column";
import { Tooltip } from "@mui/material";

const TaskInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 15px;
  min-height: 106px;
  border-radius: 5px;
  border-left: ${({ color }) => `4px solid ${color}`};
  width: 220px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px -2px 4px -1px rgba(0, 0, 0, 0.2);
  margin-top: 15px;
  padding-bottom: 16px;
  .logo {
    align-self: flex-end;
  }

  .secondary-details {
    display: flex;
    justify-content: flex-start;
    gap: 5px;
    align-items: center;
    width: 100%;
    font-size: 12px;
    font-weight: 400px;
    color: #7d7d7d;
    margin-left: 8px;
    span {
      margin-top: 5px;
    }
  }
  /* .priority{ */
  /* margin-right: 12px; */
  /* align-self: center;
    svg{
      width: 12px !important;
      height: 12px !important;
      margin-right: 12px; */
  /* margin-top: 2px; */
  /* } */
  /* } */

  .title {
    margin: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; /* number of lines to show */
  }
`;

const TaskCard = ({
  item,
  index,
  onColumnsChange,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  index: number;
  onColumnsChange: Dispatch<SetStateAction<Column | null>>;
}) => {
  const { icon, color } = getTaskPriorityIcon(item.priority);
  const path = icons[icon];
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskInformation
            style={{
              backgroundColor: snapshot.isDragging ? "lightblue" : "white",
            }}
            color={color}
          >
            <TaskCardToolBar item={item} onColumnsChange={onColumnsChange} />
            <div className="secondary-details">
              <span>{formatIdNum(item.idNum)}</span>
              <Tooltip title={item.priority}>
                <Icon path={path} size={1} color={color} />
              </Tooltip>
            </div>

            <AvatarLogo
              username={item.assignedTo?.name || ""}
              className="logo"
            />
          </TaskInformation>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;

// <span className="priority">
// {item.Priority === 'High' ? (<RedArrow />) : item.Priority === 'Medium' ? (<YellowArrow />) : (<BlueArrow />)}
// </span>
// <div><CustomAvatar name={item.Assignee} isTable={false} size={16} /></div>
