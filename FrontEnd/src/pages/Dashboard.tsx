// src/pages/Dashboard.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//  Componentes UI
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import NotificationsDrawer from "@/components/layout/NotificationsDrawer";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

//  Servicios y tipos
import { taskService } from "@/api/tasksServices";
import type { Task } from "@/interfaces/tasksInterfases";

//  Iconos
import {
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Plus,
  Trash2,
} from "lucide-react";

export default function Dashboard() {
  // -------------------------------------------------------
  //  Estados locales
  // -------------------------------------------------------
  const [tasks, setTasks] = useState<Task[]>([]); // Lista de tareas
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true); // Control de carga
  const [search, setSearch] = useState(""); // Texto de búsqueda
  const [page, setPage] = useState(1); // Página actual de la paginación
  const [meta, setMeta] = useState<any>(null); // Datos de meta/paginación

  const navigate = useNavigate(); // Hook para redirección

  // -------------------------------------------------------
  //  useEffect: cargar las tareas cada vez que cambie la página
  // -------------------------------------------------------
  useEffect(() => {
    fetchTasks();
  }, [page]);

  // -------------------------------------------------------
  //  Función para obtener las tareas desde la API
  // -------------------------------------------------------
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getAll({
        page,
        search,
      });
      setTasks(response.data);
      setAllTasks(response.allData);
      setMeta(response.meta);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    } finally {
      setLoading(false);
    }
  };
  // -------------------------------------------------------
  //  Función para eliminar tarea
  // -------------------------------------------------------
  const handleDeleteTask = async (taskId: number) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      return;
    }

    try {
      await taskService.delete(taskId);
      alert("Tarea eliminada correctamente");
      fetchTasks(); // Recargar la lista
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      alert("Error al eliminar la tarea. Por favor, intenta nuevamente.");
    }
  };

  // -------------------------------------------------------
  //  Manejo del formulario de búsqueda
  // -------------------------------------------------------
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchTasks();
  };

  // -------------------------------------------------------
  //  Devuelve el estilo correspondiente al estado de la tarea
  // -------------------------------------------------------
  const getStatusBadge = (status: Task["status"]) => {
    switch (status) {
      case "Pendiente":
        return {
          variant: "secondary" as const,
          className:
            "text-sm font-bold text-yellow-500 w-25 h-6 flex items-center justify-center text-center",
        };
      case "En Proceso":
        return {
          variant: "default" as const,
          className:
            "  text-sm font-bold text-blue-500 w-25 h-6 flex items-center justify-center text-center",
        };
      case "Completado":
        return {
          variant: "default" as const,
          className:
            "text-sm font-bold text-green-500 w-25 h-6 flex items-center justify-center text-center",
        };
      case "Reprogramada":
        return { variant: "outline" as const, className: "" };
      default:
        return { variant: "secondary" as const, className: "" };
    }
  };

  // -------------------------------------------------------
  //  Devuelve el estilo correspondiente a la prioridad
  // -------------------------------------------------------
  const getPriorityBadge = (priority: Task["priority"]) => {
    switch (priority) {
      case "Alta":
        return {
          variant: "destructive" as const,
          className:
            "text-sm font-bold text-red-500 w-25 h-6 flex items-center justify-center text-center",
        };
      case "Media":
        return {
          variant: "default" as const,
          className:
            "text-sm font-bold text-yellow-500 w-25 h-6 flex items-center justify-center text-center",
        };
      case "Baja":
        return {
          variant: "secondary" as const,
          className:
            "text-sm font-bold text-green-500 w-25 h-6 flex items-center justify-center text-center",
        };
      default:
        return { variant: "default" as const, className: "" };
    }
  };

  // -------------------------------------------------------
  //  Cálculo de estadísticas
  // -------------------------------------------------------
  const stats = {
    total: allTasks.length,
    pendientes: allTasks.filter((t) => t.status === "Pendiente").length,
    completadas: allTasks.filter((t) => t.status === "Completado").length,
    altaPrioridad: allTasks.filter((t) => t.priority === "Alta").length,
  };

  // -------------------------------------------------------
  //  Vista de carga mientras se obtienen las tareas
  // -------------------------------------------------------
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Cargando tareas...</p>
      </div>
    );
  }

  // -------------------------------------------------------
  //  Render principal del Dashboard
  // -------------------------------------------------------
  return (
    <div className="space-y-8">
      {/* ==================================================
         Encabezado principal y botón de nueva tarea
      ================================================== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Tareas
          </h1>
          <p className="text-gray-600">
            Organiza y gestiona tus tareas de manera eficiente
          </p>
        </div>

        {/* Botón Nueva Tarea */}
        <div className="flex items-center gap-2">
          <NotificationsDrawer />
          <Button
            onClick={() => navigate("/create")}
            className="bg-sky-600 hover:bg-sky-700 text-white"
          >
            <Plus className="h-4 w-4" />
            Nueva Tarea
          </Button>
        </div>
      </div>

      {/* ==================================================
         Tarjetas de estadísticas
      ================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total */}
        <Card className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <CheckCircle2 className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        {/* Pendientes */}
        <Card className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pendientes</p>
                <p className="text-3xl font-bold">{stats.pendientes}</p>
              </div>
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        {/* Completadas */}
        <Card className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completadas</p>
                <p className="text-3xl font-bold">{stats.completadas}</p>
              </div>
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        {/* Alta prioridad */}
        <Card className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Alta prioridad</p>
                <p className="text-3xl font-bold">{stats.altaPrioridad}</p>
              </div>
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ==================================================
         Formulario de búsqueda
      ================================================== */}
      <form
        onSubmit={handleSearch}
        className="flex gap-2 items-center max-w-md w-full"
      >
        <Input
          placeholder="Buscar por título, estado o prioridad..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Buscar
        </Button>
      </form>

      {/* ==================================================
         Tabla con las tareas
      ================================================== */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Subtareas</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* Si no hay tareas, mostrar mensaje */}
              {tasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No hay tareas que coincidan con tu búsqueda.
                  </TableCell>
                </TableRow>
              ) : (
                /* Si existen tareas, mostrarlas en filas */
                tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.title}</TableCell>

                    {/* Estado */}
                    <TableCell>
                      <Badge {...getStatusBadge(task.status)}>
                        {task.status}
                      </Badge>
                    </TableCell>

                    {/* Prioridad */}
                    <TableCell>
                      <Badge {...getPriorityBadge(task.priority)}>
                        {task.priority}
                      </Badge>
                    </TableCell>

                    {/* Fecha de vencimiento */}
                    <TableCell>
                      {task.due_date
                        ? new Date(task.due_date).toLocaleDateString("es-ES")
                        : "-"}
                    </TableCell>

                    {/* Subtareas */}
                    <TableCell>
                      <div className="text-sm font-bold text-blue-500 flex flex-col gap-1">
                        <Badge
                          variant="secondary"
                          className="text-sm font-bold text-blue-500 bg-blue-50 border-blue-200 w-fit"
                        >
                          {task.subtasks?.length || 0} subtareas
                        </Badge>
                        {task.subtasks &&
                          task.subtasks.some((st) => !st.is_completed) && (
                            <Badge
                              variant="secondary"
                              className="text-sm font-bold text-red-500 bg-red-50 border-red-200 w-fit"
                            >
                              {
                                task.subtasks.filter((st) => !st.is_completed)
                                  .length
                              }{" "}
                              pendientes
                            </Badge>
                          )}

                        {task.subtasks &&
                          task.subtasks.length > 0 &&
                          task.subtasks.every((st) => st.is_completed) && (
                            <Badge
                              variant="secondary"
                              className="text-sm font-bold text-green-500 bg-green-50 border-green-200 w-fit"
                            >
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Todas completadas
                            </Badge>
                          )}
                      </div>
                    </TableCell>

                    {/* Botón para ver tarea */}
                    <TableCell>
                      <div className="flex gap-2">
                        {/* Botón Ver */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/task/${task.id}`)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Ver
                        </Button>

                        {/* Botón Eliminar - NUEVO BOTÓN */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ==================================================
         Controles de paginación
      ================================================== */}
      {meta && (
        <div className="flex justify-center items-center gap-4 py-4">
          <Button
            variant="outline"
            disabled={meta.current_page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Anterior
          </Button>

          <span>
            Página {meta.current_page} de {meta.last_page}
          </span>

          <Button
            variant="outline"
            disabled={meta.current_page === meta.last_page}
            onClick={() => setPage((p) => p + 1)}
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
}
