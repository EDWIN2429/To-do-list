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
        $query = Task::withCount('subtasks');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%$search%")
                  ->orWhere('status', 'like', "%$search%")
                  ->orWhere('priority', 'like', "%$search%");
            });
        }

        //  Ordenar y paginar
        $tasks = $query->orderBy('creation_date', 'desc')->paginate(5);

        return response()->json($tasks);
    }

    /**
     *  Crear una nueva tarea
     */
    public function store(StoreTaskRequest $request)
    {
        $task = Task::create([
            ...$request->validated(),
            'creation_date' => now(),
            'status' => 'Pendiente',
        ]);

        return response()->json([
            'message' => 'Tarea creada con éxito',
            'task' => $task,
        ], 201);
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
}
