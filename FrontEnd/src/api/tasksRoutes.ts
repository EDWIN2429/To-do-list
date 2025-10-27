
export const API_ENDPOINTS = {
    tasks: {
      index: '/tasks',
      show: (id: number | string) => `/tasks/${id}`,
      store: '/tasks',
      update: (id: number | string) => `/tasks/${id}`,
      destroy: (id: number | string) => `/tasks/${id}`,
      reschedule: (id: number | string) => `/tasks/${id}/reschedule`,
      complete: (id: number | string) => `/tasks/${id}/complete`,
    },
    subtasks: {
      store: '/subtasks',
      update: (id: number | string) => `/subtasks/${id}`,
      destroy: (id: number | string) => `/subtasks/${id}`,
    },
    notifications: {
      index: '/notifications',
      store: '/notifications',
      destroy: (id: number | string) => `/notifications/${id}`,
    },
  } as const; 