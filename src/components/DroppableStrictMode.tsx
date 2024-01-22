import { useEffect, useState } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

export const StrictModeDroppable = ({
  droppableId,
  children,
}: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable droppableId={droppableId}>{children}</Droppable>;
};
