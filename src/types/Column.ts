export type TaskItem = {
  title: string;
  status: string;
  priority?: string;
  id: string;
  idNum: number;
  assignedTo?: {
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
