<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'priority' => 'sometimes|in:Alta,Media,Baja',
            'status' => 'sometimes|in:Pendiente,En Proceso,Completado,Reprogramada',
        ];
    }

    public function messages(): array
    {
        return [
            'title.max' => 'El título no puede superar los 255 caracteres.',
            'priority' => 'La prioridad debe ser Alta, Media o Baja.',
            'status' => 'El estado debe ser Pendiente, En Proceso, Completado',
        ];
    }
}
