<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'creation_date',
        'due_date',
        'status',
        'priority',
    ];

    // Relación 1:N con subtareas
    public function subtasks()
    {
        return $this->hasMany(SubTask::class);
    }

    // Relación 1:N con notificaciones
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}
