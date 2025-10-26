export interface Task {
  id: number;
  title: string;
  description: string;
  creation_date: string;
  due_date: string;
  status:
    | "Pendiente"
    | "En Proceso"
    | "Completado"
    | "Reprogramada";
  priority: "Alta" | "Media" | "Baja";
  subtasks?: SubTask[];
}

export interface SubTask {
  id: number;
  task_id: number;
  title: string;
  description: string;
  is_completed: boolean;
}

export interface Notification {
  id: number;
  task_id: number;
  message: string;
  created_at: string;
}
