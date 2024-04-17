<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type' => 'post',
            'id' => (string) $this->resource->getRouteKey(),
            'attributes' => [
                'title' => $this->title,
                'description' => $this->description,
            ],
            'relationships' => [
                'user' => [
                    'links' => [
                        'related' => route('api.user.show', $this->resource->user->getRouteKey())
                    ]
                ]
            ],
            'links' => [
                //'self' => route('api.post.show', $this->resource->getRouteKey())
            ]
        ];
    }
}
