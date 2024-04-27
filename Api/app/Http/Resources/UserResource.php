<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */


     //Permite formatear la respuesta JSON
    public function toArray(Request $request): array
    {
        return  [
                'type' => 'user',
                'id' => (string) $this->resource['id'],
                'attributes' => [
                    'user_name' => $this->resource['user_name'],
                    'code' => $this->resource['code'],
                    'email' => $this->resource['email'],
                    'role_id' => $this->resource['role_id'],
                    'description' => $this->resource['description'],
                    'state' => $this->resource['state'],
                    'semestre' => $this->resource['semestre'],
                    'carrera' => $this->resource['carrera'],
                    'departamento' => $this->resource['departamento'],
                    'created_at' => Carbon::parse($this->resource['created_at'])->format('Y-m-d H:i:s'),
                ],
                'links' => [
                    'self' => route('api.user.show' , $this->resource['id'])
                ]
        ];
    }
}
