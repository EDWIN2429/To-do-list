// src/api/services.ts - NUEVO ARCHIVO
import api from "./api";
import { API_ENDPOINTS } from "./tasksRoutes";
import type {
  Task,
  SubTask,
  Notification,
} from "../interfaces/tasksInterfases";

export const taskService = {
  // Obtener todas las tareas con filtros y paginación
  getAll: async (params?: {
    page?: number;
    search?: string;
    status?: string;
    priority?: string;
  }): Promise<{ data: Task[]; meta: any }> => {
    const response = await api.get(API_ENDPOINTS.tasks.index, { params });
    return {
      data: response.data.data,
      meta: {
        current_page: response.data.current_page,
        last_page: response.data.last_page,
        total: response.data.total,
      },
    };
  },


  // Obtener una tarea por ID
  getById: async (id: number): Promise<Task> => {
    const response = await api.get(API_ENDPOINTS.tasks.show(id));
    return response.data;
  },

  // Crear nueva tarea
  create: async (taskData: Omit<Task, "id">): Promise<Task> => {
    const response = await api.post(API_ENDPOINTS.tasks.store, taskData);
    return response.data.task; // Backend devuelve { message, task }
  },

  // Actualizar tarea
  update: async (id: number, taskData: Partial<Task>): Promise<Task> => {
    const response = await api.put(API_ENDPOINTS.tasks.update(id), taskData);
    return response.data.task; // Backend devuelve { message, task }
  },

  // Eliminar tarea
  delete: async (id: number): Promise<void> => {
    await api.delete(API_ENDPOINTS.tasks.destroy(id));
  },

  // Marcar como completada
  markAsCompleted: async (id: number): Promise<Task> => {
    const response = await api.patch(API_ENDPOINTS.tasks.complete(id));
    return response.data;
  },
};

export const subtaskService = {
  create: async (subtaskData: Omit<SubTask, "id">): Promise<SubTask> => {
    const response = await api.post(API_ENDPOINTS.subtasks.store, subtaskData);
    return response.data.subtask; // Backend devuelve { message, subtask }
  },

  update: async (
    id: number,
    subtaskData: Partial<SubTask>
  ): Promise<SubTask> => {
    const response = await api.put(
      API_ENDPOINTS.subtasks.update(id),
      subtaskData
    );
    return response.data.subtask; // Backend devuelve { message, subtask }
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(API_ENDPOINTS.subtasks.destroy(id));
  },
};

export const notificationService = {
  getAll: async (): Promise<Notification[]> => {
    const response = await api.get(API_ENDPOINTS.notifications.index);
    return response.data;
  },

  create: async (
    notificationData: Omit<Notification, "id">
  ): Promise<Notification> => {
    const response = await api.post(
      API_ENDPOINTS.notifications.store,
      notificationData
    );
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(API_ENDPOINTS.notifications.destroy(id));
  },
};
