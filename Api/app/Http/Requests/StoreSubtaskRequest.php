<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSubtaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'task_id' => 'required|exists:tasks,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'task_id.required' => 'Debe asociar la subtarea a una tarea válida.',
            'task_id.exists' => 'La tarea seleccionada no existe.',
            'title.required' => 'El título de la subtarea es obligatorio.',
            'title.max' => 'El título no puede superar los 255 caracteres.',
        ];
    }
}
