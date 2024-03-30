<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
        $role_id = $this->resource->role_id;
        $abilities = $role_id == 1 ? ['admin' ,'user'] : ( $role_id == 2 ? ['student','user'] : ['teacher','user']);
        return  [
                'type' => 'user',
                'id' => (string) $this->resource->getRouteKey(),
                'attributes' => [
                    'user_name' => $this->resource->user_name,
                    'code' => $this->resource->code,
                    'email' => $this->resource->email,
                    'role_id' => $role_id,
                    'description' => $this->resource->description,
                    'state' => '1',
                    'token' => $this->resource->createToken('api_token' , $abilities)->plainTextToken
                ],
                'links' => [
                    'self' => route('api.user.show' , $this->resource->getRouteKey())
                ]
        ];
    }
}
