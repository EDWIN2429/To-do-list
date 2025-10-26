import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { taskService, subtaskService } from "@/api/tasksServices";
import type { Task } from "@/interfaces/tasksInterfases";

export default function CreateTask() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "Media" as Task["priority"],
    creation_date: new Date().toISOString(),
  });
  const [subtasks, setSubtasks] = useState<string[]>([""]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Crear la tarea
      const newTask = await taskService.create({
        ...formData,
        status: "Pendiente",
      });

      // 2. Crear las subtareas si existen
      for (const subtaskTitle of subtasks) {
        if (subtaskTitle.trim()) {
          await subtaskService.create({
            task_id: newTask.id,
            title: subtaskTitle,
            description: "",
            is_completed: false,
          });
        }
      }

      navigate(`/task/${newTask.id}`);
    } catch (error) {
      console.error("Error al crear tarea:", error);
      alert("Error al crear la tarea. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const addSubtask = () => {
    setSubtasks([...subtasks, ""]);
  };

  const updateSubtask = (index: number, value: string) => {
    setSubtasks(subtasks.map((st, i) => (i === index ? value : st)));
  };

  const removeSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Crear Nueva Tarea</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                placeholder="Título de la tarea"
              />
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                placeholder="Descripción de la tarea..."
              />
            </div>

            {/* Fecha de Vencimiento */}
            <div className="space-y-2">
              <Label htmlFor="due_date">Fecha de Vencimiento</Label>
              <Input
                id="due_date"
                type="datetime-local"
                value={formData.due_date}
                onChange={(e) =>
                  setFormData({ ...formData, due_date: e.target.value })
                }
              />
            </div>

            {/* Prioridad */}
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridad *</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: Task["priority"]) =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Seleccionar prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alta">Alta</SelectItem>
                  <SelectItem value="Media">Media</SelectItem>
                  <SelectItem value="Baja">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Subtareas */}
            <div className="space-y-2">
              <Label>Subtareas</Label>
              {subtasks.map((subtask, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={subtask}
                    onChange={(e) => updateSubtask(index, e.target.value)}
                    placeholder={`Subtarea ${index + 1}`}
                  />
                  {subtasks.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeSubtask(index)}
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addSubtask}
                className="w-full"
              >
                + Agregar Subtarea
              </Button>
            </div>

            {/* Botones */}
            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Creando..." : "Crear Tarea"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
                disabled={loading}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
