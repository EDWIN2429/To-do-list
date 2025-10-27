<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SubTask extends Model
{
    use HasFactory;

    protected $table = 'subtasks'; 

    protected $fillable = [
        'task_id',
        'title',
        'description',
        'is_completed',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
