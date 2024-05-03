<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class FileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $fileUrl = Storage::url($this->path);
        return [
            'type' => 'file',
            'id' => (string)$this->id,
            'attributes' => [
                'name' => $this->name,
                'path' => $this->path,
                'type' => $this->type
            ],
            'links' => [
                //'self' => route('api.file.show', $this->id),
                'file' => $fileUrl,
                //'download' => route('api.file.download', $this->id),
            ],
        ];
    }
}
