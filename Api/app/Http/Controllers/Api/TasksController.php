<?php

namespace App\Http\Controllers\Api;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

class TasksController extends Controller
{
    /**
     *  Listar tareas con paginación y filtrado
     */
    public function index(Request $request)
    {
        $query = Task::with('subtasks');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%$search%")
                    ->orWhere('status', 'like', "%$search%")
                    ->orWhere('priority', 'like', "%$search%");
            });
        }

        // CLONAR la query antes de paginar
        $queryForAll = clone $query;

        // Obtener datos paginados
        $paginatedTasks = $query->orderBy('creation_date', 'desc')->paginate(5);

        // Obtener datos completos (sin paginación) usando la query clonada
        $allTasks = $queryForAll->orderBy('creation_date', 'desc')->get();

        return response()->json([
            'paginated' => $paginatedTasks,
            'all' => $allTasks
        ]);
    }

    /**
     *  Mostrar detalles de una tarea
     */
    public function show($id)
    {
        $task = Task::with('subtasks')->findOrFail($id);
        return response()->json($task);
    }

    /**
     *  Actualizar una tarea
     */
    public function update(UpdateTaskRequest $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->update($request->validated());

        return response()->json([
            'message' => 'Tarea actualizada correctamente',
            'task' => $task,
        ]);
    }

    /**
     *  Reprogramar fecha de entrega
     */
    public function reschedule(Request $request, $id)
    {
        $request->validate(['due_date' => 'required|date']);

        $task = Task::findOrFail($id);
        $task->update([
            'due_date' => $request->due_date,
            'status' => 'Reprogramada',
        ]);

        return response()->json(['message' => 'Fecha de entrega actualizada', 'task' => $task]);
    }

    /**
     *  Marcar tarea como completada
     */
    public function markAsCompleted($id)
    {
        $task = Task::findOrFail($id);
        $task->update(['status' => 'Completado']);

        return response()->json(['message' => 'Tarea marcada como completada']);
    }

    /**
     *  Eliminar una tarea
     */
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Tarea eliminada correctamente']);
    }

    /**
     *  Store a newly created task.
     */
    public function store(StoreTaskRequest $request)
    {
        try {
            $data = $request->validated();

            // Asegurar status por defecto si no viene
            if (!isset($data['status'])) {
                $data['status'] = 'Pendiente';
            }

            $task = Task::create($data);

            return response()->json($task, 201);
        } catch (\Throwable $e) {
            if (config('app.debug')) {
                return response()->json(['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()], 500);
            }
            return response()->json(['message' => 'Error interno del servidor.'], 500);
        }
    }
}
