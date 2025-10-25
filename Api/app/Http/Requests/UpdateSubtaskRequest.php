<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSubtaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'is_completed' => 'sometimes|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'title.max' => 'El título no puede superar los 255 caracteres.',
            'is_completed.boolean' => 'El campo de completado debe ser verdadero o falso.',
        ];
    }
}
