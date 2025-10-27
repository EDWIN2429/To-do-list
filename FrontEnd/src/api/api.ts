
import axios, { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 5000, 
});

// Interceptor de response 
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log de requests exitosos 
    if (import.meta.env.DEV) {
      console.log(`${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error('400: Solicitud incorrecta.', data);
          break;
        case 404:
          console.error('404: Recurso no encontrado.');
          break;
        case 422:
          console.error('422: Error de validación.', data);
          break;
        case 500:
          console.error('500: Error interno del servidor.');
          break;
        default:
          console.error(`${status}:`, data);
      }
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      console.error('Error en la configuración de la solicitud:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;