import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Componentes UI
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

// Servicios y tipos
import { taskService, subtaskService } from "@/api/tasksServices";
import type { Task } from "@/interfaces/tasksInterfases";

export default function CreateTask() {
  // ==================================================
  // HOOKS Y NAVEGACIÓN
  // ==================================================
  const navigate = useNavigate();

  // ==================================================
  // ESTADOS DEL COMPONENTE
  // ==================================================
  const [loading, setLoading] = useState(false); // Estado de carga durante el envío
  
  // Estado para los datos principales de la tarea
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "Media" as Task["priority"],
    creation_date: new Date().toISOString(),
  });

  // Estado para gestionar las subtareas (array de títulos)
  const [subtasks, setSubtasks] = useState<string[]>([""]);

  // ==================================================
  // MANEJADOR PRINCIPAL DEL FORMULARIO
  // ==================================================

  /**
   * Maneja el envío del formulario para crear una nueva tarea con sus subtareas
   * @param e - Evento del formulario
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Crear la tarea principal
      const newTask = await taskService.create({
        ...formData,
        status: "Pendiente", // Estado por defecto para nuevas tareas
      });

      // 2. Crear las subtareas asociadas a la tarea
      for (const subtaskTitle of subtasks) {
        // Solo crear subtareas con título no vacío
        if (subtaskTitle.trim()) {
          await subtaskService.create({
            task_id: newTask.id,
            title: subtaskTitle,
            description: "",
            is_completed: false, // Estado por defecto para nuevas subtareas
          });
        }
      }

      // 3. Redirigir al dashboard después de crear exitosamente
      navigate('/');
    } catch (error) {
      console.error("Error al crear tarea:", error);
      alert("Error al crear la tarea. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  // MANEJADORES DE SUBTAREAS
  // ==================================================

  /**
   * Agrega un nuevo campo de subtarea vacío
   */
  const addSubtask = () => {
    setSubtasks([...subtasks, ""]);
  };

  /**
   * Actualiza el título de una subtarea específica
   * @param index - Índice de la subtarea a actualizar
   * @param value - Nuevo valor del título
   */
  const updateSubtask = (index: number, value: string) => {
    setSubtasks(subtasks.map((st, i) => (i === index ? value : st)));
  };

  /**
   * Elimina una subtarea del array
   * @param index - Índice de la subtarea a eliminar
   */
  const removeSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  // ==================================================
  // RENDERIZADO DEL FORMULARIO
  // ==================================================
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <Card className="bg-white shadow-lg ring-1 ring-slate-200 rounded-lg overflow-hidden">
        
        {/* ==================================================
            ENCABEZADO DE LA PÁGINA
        ================================================== */}
        <CardHeader className="px-6 py-4 border-b border-slate-100">
          <CardTitle className="text-2xl font-semibold text-slate-900">
            Crear Nueva Tarea
          </CardTitle>
        </CardHeader>

        {/* ==================================================
            CONTENIDO DEL FORMULARIO
        ================================================== */}
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* SECCIÓN: TÍTULO DE LA TAREA */}
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                className="w-full"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                placeholder="Título de la tarea"
              />
            </div>

            {/* SECCIÓN: DESCRIPCIÓN DE LA TAREA */}
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                className="w-full"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                placeholder="Descripción de la tarea..."
              />
            </div>

            {/* SECCIÓN: FECHA Y PRIORIDAD EN GRID RESPONSIVE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Campo: Fecha de vencimiento */}
              <div className="space-y-2">
                <Label htmlFor="due_date">Fecha de Vencimiento</Label>
                <Input
                  id="due_date"
                  type="datetime-local"
                  className="w-full"
                  value={formData.due_date}
                  onChange={(e) =>
                    setFormData({ ...formData, due_date: e.target.value })
                  }
                />
              </div>

              {/* Campo: Prioridad con selector */}
              <div className="space-y-2">
                <Label htmlFor="priority">Prioridad *</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value: Task["priority"]) =>
                    setFormData({ ...formData, priority: value })
                  }
                >
                  <SelectTrigger id="priority" className="w-full bg-white">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* SECCIÓN: GESTIÓN DE SUBTAREAS */}
            <div className="space-y-2">
              <Label>Subtareas</Label>
              
              {/* Lista de campos de subtareas */}
              <div className="flex flex-col gap-3">
                {subtasks.map((subtask, index) => (
                  <div
                    key={index}
                    className="flex gap-2 items-center w-full"
                    role="group"
                  >
                    {/* Input para el título de la subtarea */}
                    <Input
                      className="flex-1"
                      value={subtask}
                      onChange={(e) => updateSubtask(index, e.target.value)}
                      placeholder={`Subtarea ${index + 1}`}
                    />
                    
                    {/* Botón para eliminar subtarea (solo mostrar si hay más de una) */}
                    {subtasks.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeSubtask(index)}
                        className="h-10 w-10 p-0 flex items-center justify-center"
                        aria-label={`Eliminar subtarea ${index + 1}`}
                      >
                        ✕
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Botón para agregar nueva subtarea */}
              <Button
                type="button"
                variant="outline"
                onClick={addSubtask}
                className="w-full mt-1"
              >
                + Agregar Subtarea
              </Button>
            </div>

            {/* ==================================================
                BOTONES DE ACCIÓN
            ================================================== */}
            <div className="flex justify-center gap-4 mt-2">
              
              {/* Botón principal: Crear tarea */}
              <Button
                type="submit"
                disabled={loading}
                className="min-w-[140px] px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-colors shadow"
              >
                {loading ? "Creando..." : "Crear Tarea"}
              </Button>

              {/* Botón secundario: Cancelar y volver */}
              <Button
                type="button"
                onClick={() => navigate("/")}
                disabled={loading}
                className="min-w-[140px] px-6 py-2 bg-slate-100 text-slate-800 hover:bg-sky-700 hover:text-white rounded-md transition-colors border border-slate-200 shadow-sm"
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