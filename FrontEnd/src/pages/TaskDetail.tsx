import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { taskService, subtaskService } from "@/api/tasksServices";
import type { Task, SubTask } from "@/interfaces/tasksInterfases";
import { ArrowLeft, Trash2, Plus } from "lucide-react";

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");

  useEffect(() => {
    fetchTask();
  }, [id]);

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

  const handleToggleSubtask = async (
    subtaskId: number,
    isCompleted: boolean
  ) => {
    try {
      await subtaskService.update(subtaskId, {
        is_completed: !isCompleted,
      });
      fetchTask();
    } catch (error) {
      console.error("Error al actualizar subtarea:", error);
    }
  };

  const handleAddSubtask = async () => {
    if (!newSubtaskTitle.trim() || !task) return;

    try {
      await subtaskService.create({
        task_id: task.id,
        title: newSubtaskTitle,
        description: "",
        is_completed: false,
      });
      setNewSubtaskTitle("");
      fetchTask();
    } catch (error) {
      console.error("Error al crear subtarea:", error);
    }
  };

  const handleDeleteSubtask = async (subtaskId: number) => {
    try {
      await subtaskService.delete(subtaskId);
      fetchTask();
    } catch (error) {
      console.error("Error al eliminar subtarea:", error);
    }
  };

  if (loading) {
    return <div className="p-6">Cargando...</div>;
  }

  if (!task) {
    return <div className="p-6">Tarea no encontrada</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Botón Volver */}
      <Button variant="outline" onClick={() => navigate("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver
      </Button>

      {/* Card Principal */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{task.title}</CardTitle>
              <div className="flex gap-2">
                <Badge
                  variant={
                    task.status === "Completado"
                      ? "destructive"
                      : task.status === "En Proceso"
                      ? "default"
                      : "secondary"
                  }
                >
                  {task.status}
                </Badge>
                <Badge
                  variant={
                    task.priority === "Alta"
                      ? "destructive"
                      : task.priority === "Media"
                      ? "default"
                      : "secondary"
                  }
                >
                  {task.priority}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Descripción */}
          <div>
            <h3 className="font-semibold mb-2">Descripción</h3>
            <p className="text-gray-600">
              {task.description || "Sin descripción"}
            </p>
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-500">Creación</h4>
              <p className="text-sm">
                {new Date(task.creation_date).toLocaleString("es-ES")}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500">
                Vencimiento
              </h4>
              <p className="text-sm">
                {task.due_date
                  ? new Date(task.due_date).toLocaleString("es-ES")
                  : "Sin fecha"}
              </p>
            </div>
          </div>

          {/* Subtareas */}
          <div>
            <h3 className="font-semibold mb-4">Subtareas</h3>

            {/* Agregar Subtarea */}
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Nueva subtarea..."
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddSubtask()}
              />
              <Button onClick={handleAddSubtask} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Lista de Subtareas */}
            <div className="space-y-2">
              {task.subtasks && task.subtasks.length > 0 ? (
                task.subtasks.map((subtask) => (
                  <Card key={subtask.id}>
                    <CardContent className="flex items-center gap-4 py-3">
                      <Checkbox
                        checked={subtask.is_completed}
                        onCheckedChange={(checked) =>
                          handleToggleSubtask(subtask.id, subtask.is_completed)
                        }
                      />
                      <span
                        className={
                          subtask.is_completed
                            ? "line-through text-gray-400"
                            : "flex-1"
                        }
                      >
                        {subtask.title}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteSubtask(subtask.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-gray-500 text-sm">
                  No hay subtareas. Agrega una nueva.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
