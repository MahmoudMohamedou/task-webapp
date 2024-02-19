export type TaskItem = {
  title: string;
  status?: string;
  priority?: string;
  id?: string;
  idNum?: number;
  description?: string;
  assignedTo?: {
    id?: string;
    name?: string;
  } | null;
  createdBy?: {
    id: string;
    name: string;
  };
};

export type Column = {
  [key: string]: {
    title: string;
    items: Array<TaskItem>;
  };
};

export type TaskEditItem = {
  title: string;
  description?: string;
  priority?: string;
  assignedTo?: {
    id?: string;
    name?: string;
  } | null;
};

export type PriorityType = {
  label: string;
  value: "HIGH" | "MEDIUM" | "LOW";
};
export type AssigneeType = {
  label: string;
  value: string;
};
