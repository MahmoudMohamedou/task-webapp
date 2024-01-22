export const getTaskPriorityIcon = (
  priority: string
): {
  color: string;
  icon: string;
} => {
  switch (priority) {
    case "HIGH":
      return {
        color: "red",
        icon: "mdiArrowUp",
      };
    case "MEDIUM":
      return {
        color: "orange",
        icon: "mdiArrowUp",
      };
    case "LOW":
      return {
        color: "green",
        icon: "mdiArrowDown",
      };
  }

  return {
    color: "grey",
    icon: "mdiCancel",
  };
};
