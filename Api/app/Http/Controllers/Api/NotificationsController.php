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

        //  Buscar tareas que están próximas a vencer o vencidas
        $upcoming = Task::where('status', '!=', 'Completado')
            ->whereBetween('due_date', [$now, $tomorrow])
            ->get();

        $expired = Task::where('status', '!=', 'Completado')
            ->where('due_date', '<', $now)
            ->get();

        //  Generar estructura de respuesta tipo "notificaciones"
        $notifications = [
            'proximas' => $upcoming->map(fn($t) => [
                'id' => $t->id,
                'title' => $t->title,
                'due_date' => $t->due_date,
                'type' => 'Próxima a vencer'
            ]),
            'vencidas' => $expired->map(fn($t) => [
                'id' => $t->id,
                'title' => $t->title,
                'due_date' => $t->due_date,
                'type' => 'Vencida'
            ])
        ];

        return response()->json($notifications);
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
