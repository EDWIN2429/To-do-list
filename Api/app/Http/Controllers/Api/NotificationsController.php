<?php

namespace App\Http\Controllers\Api;

use App\Models\Notification;
use App\Models\Task;
use Illuminate\Http\Request;
use Carbon\Carbon;

use App\Http\Controllers\Controller;

class NotificationsController extends Controller
{
    /**
     *  Mostrar notificaciones activas (tareas próximas a vencer o vencidas)
     */
    public function index()
     {
        $now = Carbon::now();
        $tomorrow = $now->copy()->addDay();

        // Buscar tareas próximas a vencer y vencidas directamente desde la BD
        $upcoming = Task::where('status', '!=', 'Completado')
            ->whereBetween('due_date', [$now, $tomorrow])
            ->orderBy('due_date', 'asc')
            ->get(['id', 'title', 'due_date', 'status']);

        $expired = Task::where('status', '!=', 'Completado')
            ->where('due_date', '<', $now)
            ->orderBy('due_date', 'asc')
            ->get(['id', 'title', 'due_date', 'status']);

        return response()->json([
            'proximas' => $upcoming,
            'vencidas' => $expired,
        ]);
    }


    /**
     * Eliminar una notificación (por ejemplo, si se reprograma)
     */
    public function destroy($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->delete();

        return response()->json(['message' => 'Notificación eliminada']);
    }
}
