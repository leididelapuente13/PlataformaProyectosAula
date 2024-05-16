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
        $rol = $this->resource['role_id'];
        $attributes = [
            'type' => 'user',
            'id' => (string) $this->resource['id'],
            'attributes' => [
                'user_name' => $this->resource['user_name'],
                'code' => $this->resource['code'],
                'email' => $this->resource['email'],
                'role_id' => $this->resource['role_id'],
                'description' => $this->resource['description'],
                'state' => $this->resource['state'],
                'created_at' => Carbon::parse($this->resource['created_at'])->format('Y-m-d H:i:s'),
            ],
            'links' => [
                'self' => route('api.user.show', $this->resource['id'])
            ]
        ];

        if ($rol == 2) {
            $attributes['attributes']['semestre'] = $this->resource['semestre'];
            $attributes['attributes']['carrera'] = $this->resource['carrera'];
        } elseif ($rol == 3) {
            $attributes['attributes']['departamento'] = $this->resource['departamento'];
        }
        return $attributes;
    }
}
