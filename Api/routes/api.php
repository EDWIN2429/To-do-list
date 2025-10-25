<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TasksController;
use App\Http\Controllers\Api\SubTasksController;
use App\Http\Controllers\Api\NotificationsController;

Route::prefix('tasks')->group(function () {
    Route::get('/', [TasksController::class, 'index']);
    Route::get('/{id}', [TasksController::class, 'show']);
    Route::post('/', [TasksController::class, 'store']);
    Route::put('/{id}', [TasksController::class, 'update']);
    Route::delete('/{id}', [TasksController::class, 'destroy']);
    Route::patch('/{id}/reschedule', [TasksController::class, 'reschedule']);
    Route::patch('/{id}/complete', [TasksController::class, 'markAsCompleted']);
});

Route::prefix('subtasks')->group(function () {
    Route::post('/', [SubTasksController::class, 'store']);
    Route::put('/{id}', [SubTasksController::class, 'update']);
    Route::delete('/{id}', [SubTasksController::class, 'destroy']);
});

Route::prefix('notifications')->group(function () {
    Route::get('/', [NotificationsController::class, 'index']);
    Route::post('/', [NotificationsController::class, 'store']);
    Route::delete('/{id}', [NotificationsController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
