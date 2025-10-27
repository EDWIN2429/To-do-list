import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Componentes UI
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

// Servicios y tipos
import { taskService, subtaskService } from "@/api/tasksServices";
import type { Task, SubTask } from "@/interfaces/tasksInterfases";

// Iconos
import { Eye, Trash2, Plus } from "lucide-react";

export default function TaskDetail() {
  // ==================================================
  // PARÁMETROS Y NAVEGACIÓN
  // ==================================================
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // ==================================================
  // ESTADOS DEL COMPONENTE
  // ==================================================
  const [task, setTask] = useState<Task | null>(null); // Datos de la tarea actual
  const [loading, setLoading] = useState(true); // Estado de carga
  const [newSubtaskTitle, setNewSubtaskTitle] = useState(""); // Título de nueva subtarea

  // ==================================================
  // EFECTOS SECUNDARIOS
  // ==================================================

  /**
   * Cargar los datos de la tarea cuando el ID cambia
   */
  useEffect(() => {
    fetchTask();
  }, [id]);

  // ==================================================
  // FUNCIONES DE CARGA DE DATOS
  // ==================================================

  /**
   * Obtener los datos de la tarea desde la API
   */
  const fetchTask = async () => {
    try {
      const taskData = await taskService.getById(Number(id));
      setTask(taskData);
    } catch (error) {
      console.error("Error al cargar tarea:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  // MANEJADORES DE SUBTAREAS
  // ==================================================

  /**
   * Alternar el estado de completado de una subtarea
   * @param subtaskId - ID de la subtarea
   * @param isCompleted - Estado actual de la subtarea
   */
  const handleToggleSubtask = async (
    subtaskId: number,
    isCompleted: boolean
  ) => {
    try {
      await subtaskService.update(subtaskId, {
        is_completed: !isCompleted,
      });
      fetchTask(); // Recargar los datos para reflejar el cambio
    } catch (error) {
      console.error("Error al actualizar subtarea:", error);
    }
  };

  /**
   * Agregar una nueva subtarea a la tarea actual
   */
  const handleAddSubtask = async () => {
    // Validar que haya título y que exista la tarea
    if (!newSubtaskTitle.trim() || !task) return;

    try {
      await subtaskService.create({
        task_id: task.id,
        title: newSubtaskTitle,
        description: "",
        is_completed: false,
      });
      setNewSubtaskTitle(""); // Limpiar el input
      fetchTask();
    } catch (error) {
      console.error("Error al crear subtarea:", error);
    }
  };

  /**
   * Eliminar una subtarea específica
   * @param subtaskId
   */
  const handleDeleteSubtask = async (subtaskId: number) => {
    try {
      await subtaskService.delete(subtaskId);
      fetchTask();
    } catch (error) {
      console.error("Error al eliminar subtarea:", error);
    }
  };

  // ==================================================
  // ESTADOS DE CARGA Y ERROR
  // ==================================================
  if (loading) {
    return <div className="p-6">Cargando...</div>;
  }

  if (!task) {
    return <div className="p-6">Tarea no encontrada</div>;
  }

  // ==================================================
  // RENDERIZADO PRINCIPAL
  // ==================================================
  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="bg-white rounded-xl shadow-xl overflow-hidden">
        {/* ==================================================
            ENCABEZADO DE LA TAREA
        ================================================== */}
        <CardHeader className="px-6 py-5 border-b border-slate-100">
          <div className="flex flex-col items-center text-center gap-4">
            {/* Icono visual de la tarea */}
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-md bg-sky-600 flex items-center justify-center text-white font-semibold shadow-md">
                <Eye className="h-5 w-5" />
              </div>
            </div>

            {/* Título principal de la tarea */}
            <div className="min-w-0 w-full">
              <div className="text-sm text-slate-500 mb-1">Título</div>
              <CardTitle className="mx-auto text-xl sm:text-2xl font-semibold text-slate-900 truncate max-w-3xl">
                {task.title}
              </CardTitle>
            </div>

            {/* Estado y prioridad de la tarea */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="text-sm text-slate-500">Estado</div>
                <Badge className="shadow-sm px-3 py-1 rounded-full">
                  {task.status}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-sm text-slate-500">Prioridad</div>
                <Badge className="shadow-sm px-3 py-1 rounded-full">
                  {task.priority}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* ==================================================
            CONTENIDO PRINCIPAL
        ================================================== */}
        <CardContent className="p-6 space-y-6">
          {/* Descripción de la tarea */}
          <div className="rounded-md p-3 bg-slate-100">
            <h3 className="font-semibold mb-2 text-slate-800">Descripción</h3>
            <p className="text-slate-600">
              {task.description || "Sin descripción"}
            </p>
          </div>

          {/* Fechas importantes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-md p-3 bg-slate-100">
              <h4 className="text-sm font-semibold text-slate-500">Creación</h4>
              <p className="text-sm text-slate-700">
                {new Date(task.creation_date).toLocaleString("es-ES")}
              </p>
            </div>

            <div className="rounded-md p-3 bg-slate-100">
              <h4 className="text-sm font-semibold text-slate-500">
                Vencimiento
              </h4>
              <p className="text-sm text-slate-700">
                {task.due_date
                  ? new Date(task.due_date).toLocaleString("es-ES")
                  : "Sin fecha"}
              </p>
            </div>
          </div>

          {/* ==================================================
              SECCIÓN DE SUBTAREAS
          ================================================== */}
          <div className="rounded-md p-3 bg-slate-100">
            <h3 className="font-semibold mb-4 text-slate-800">Subtareas</h3>

            {/* Formulario para agregar nueva subtarea */}
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Nueva subtarea..."
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddSubtask()}
                className="flex-1 rounded-md"
              />
              <Button
                onClick={handleAddSubtask}
                variant="outline"
                className="h-10 w-10 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Lista de subtareas existentes */}
            <div>
              {task.subtasks && task.subtasks.length > 0 ? (
                task.subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="rounded-md border border-gray-800 p-3 mb-2 bg-gray-400"
                  >
                    <div className="flex items-center gap-4">
                      {/* Checkbox nativo controlado  */}
                      <input
                        type="checkbox"
                        aria-label={`Marcar subtarea ${subtask.id} como completada`}
                        checked={!!subtask.is_completed}
                        onChange={() =>
                          handleToggleSubtask(subtask.id, subtask.is_completed)
                        }
                        
                      />

                      {/* Título de la subtarea*/}
                      <span
                        className={
                          subtask.is_completed
                            ? "line-through text-gray-800 flex-1"
                            : "flex-1 text-gray-800 font-bold"
                        }
                      >
                        {subtask.title}
                      </span>

                      {/* Botón para eliminar subtarea - Ahora se mantiene en su posición */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteSubtask(subtask.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                // Mensaje cuando no hay subtareas
                <p className="text-slate-500 text-sm">
                  No hay subtareas. Agrega una nueva.
                </p>
              )}
            </div>
          </div>

          {/* ==================================================
              BOTONES DE ACCIÓN
          ================================================== */}
          <div className="flex justify-center gap-4 mt-10">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="bg-sky-600 hover:bg-sky-700 text-white"
            >
              Guardar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
