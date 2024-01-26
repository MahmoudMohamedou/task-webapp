import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "@emotion/styled";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { Column, TaskItem } from "../types/Column";
import { StrictModeDroppable } from "./DroppableStrictMode";
import { Box, Typography } from "@mui/material";
import KanbanToolbar from "./KanbanToolbar";

type Props = {
  drawerWidth: number;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 190px);
  width: ${({ drawerWidth }: Props) => `calc(100vw - 48px - ${drawerWidth}px);`}
  overflow: auto;
`;

const TaskList = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  width: 250px;
  min-width: 250px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 20px;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  /*min-height: 80vh;*/
`;

const TaskColumnStickyHeader = styled(TaskColumnStyles)`
  // position: sticky;
  // top: 65px;
  // z-index: 1200;
`;

const Title = styled.span`
  padding: 2px 10px;
  align-self: flex-start;
  font-weight: 600;
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f3f3f3;
  width: 250px;
  min-width: 250px;
  border-radius: 5px;
  padding: 8px;
  margin-right: 20px;
`;

const TaskCount = styled.span`
  font-weight: 600;
`;

const Kanban: React.FC<Props> = ({ drawerWidth }) => {
  const [columns, setColumns] = useState<Column | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL_TASK!, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode === undefined) {
          const statuses = {
            TODO: {
              title: "Todo",
              items: [],
            },
            IN_PROGRESS: {
              title: "In progress",
              items: [],
            },
            DONE: {
              title: "Done",
              items: [],
            },
            CANCEL: {
              title: "Cancel",
              items: [],
            },
          };
          setColumns(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            res.reduce((acc: Column, r: TaskItem) => {
              acc[r.status!].items.push({
                id: r.id,
                idNum: r.idNum,
                title: r.title,
                status: r.status,
                priority: r.priority,
                assignedTo: r.assignedTo,
                description: r.description,
                createdBy: r.createdBy,
              });

              return acc;
            }, statuses)
          );
        }
        //return res;
      });
  }, []);

  const onDragStart = () => {
    const elements = document.querySelectorAll(
      "div[data-rbd-droppable-id]"
    ) as NodeListOf<HTMLDivElement>;
    elements.forEach((e) => {
      e.style.backgroundColor = "lightgreen";
    });
  };
  const onDragEnd = (
    result: DropResult,
    columns: Column,
    setColumns: Dispatch<SetStateAction<Column | null>>
  ) => {
    const elements = document.querySelectorAll(
      "div[data-rbd-droppable-id]"
    ) as NodeListOf<HTMLDivElement>;
    elements.forEach((e) => {
      e.style.backgroundColor = "#f3f3f3";
    });
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      fetch(
        `${import.meta.env.VITE_API_URL_TASK}/${
          sourceColumn.items[source.index].id
        }`,
        {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({
            status: destination.droppableId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const handleScrollX = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (!headerRef?.current) return;
    headerRef.current.style.position = "relative";
    headerRef.current.style.left = `-${e.currentTarget.scrollLeft}px`;
  };

  if (!columns) return null;

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      onDragStart={() => onDragStart()}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          //marginTop: 1,
        }}
      >
        <Typography variant="h4">Tasks</Typography>
        <KanbanToolbar onColumnsChange={setColumns} />
      </Box>
      <TaskColumnStickyHeader ref={headerRef}>
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <ColumnHeader key={columnId}>
              <Title>{column.title}</Title>
              <TaskCount>{column.items.length}</TaskCount>
            </ColumnHeader>
          );
        })}
      </TaskColumnStickyHeader>
      <Container drawerWidth={drawerWidth} onScroll={(e) => handleScrollX(e)}>
        <TaskColumnStyles>
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <StrictModeDroppable key={columnId} droppableId={columnId}>
                {(provided) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {column.items.map((item, index) => (
                      <TaskCard
                        key={item.id}
                        item={item}
                        index={index}
                        onColumnsChange={setColumns}
                      />
                    ))}
                    {provided.placeholder}
                  </TaskList>
                )}
              </StrictModeDroppable>
            );
          })}
        </TaskColumnStyles>
      </Container>
    </DragDropContext>
  );
};

export default Kanban;
