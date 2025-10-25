<?php

namespace App\Http\Controllers\Api;

use App\Models\Subtask;
use App\Models\Task;
use App\Http\Requests\StoreSubtaskRequest;
use App\Http\Requests\UpdateSubtaskRequest;

use App\Http\Controllers\Controller;

class SubTasksController extends Controller
{
    /**
     * ➕ Crear una nueva subtarea
     */
    public function store(StoreSubtaskRequest $request)
    {
        $subtask = Subtask::create($request->validated());

        return response()->json([
            'message' => 'Subtarea creada con éxito',
            'subtask' => $subtask
        ], 201);
    }

    /**
     * ✏️ Actualizar una subtarea (por ejemplo, marcar completada)
     */
    public function update(UpdateSubtaskRequest $request, $id)
    {
        $subtask = Subtask::findOrFail($id);
        $subtask->update($request->validated());

        // ✅ Recalcular estado de la tarea principal
        $task = $subtask->task;
        $total = $task->subtasks()->count();
        $completed = $task->subtasks()->where('is_completed', true)->count();

        if ($completed === $total && $total > 0) {
            $task->update(['status' => 'Completado']);
        } elseif ($completed > 0) {
            $task->update(['status' => 'En Proceso']);
        } else {
            $task->update(['status' => 'Pendiente']);
        }

        return response()->json([
            'message' => 'Subtarea actualizada correctamente',
            'subtask' => $subtask
        ]);
    }

    /**
     * ❌ Eliminar una subtarea
     */
    public function destroy($id)
    {
        $subtask = Subtask::findOrFail($id);
        $task = $subtask->task;
        $subtask->delete();

        //  Actualizar estado de la tarea principal si cambian las subtareas
        $total = $task->subtasks()->count();
        $completed = $task->subtasks()->where('is_completed', true)->count();

        if ($completed === $total && $total > 0) {
            $task->update(['status' => 'Completado']);
        } elseif ($completed > 0) {
            $task->update(['status' => 'En Proceso']);
        } else {
            $task->update(['status' => 'Pendiente']);
        }

        return response()->json(['message' => 'Subtarea eliminada correctamente']);
    }
}
