<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_id',
        'type',
    ];

    // Relación inversa con la tarea principal
    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
