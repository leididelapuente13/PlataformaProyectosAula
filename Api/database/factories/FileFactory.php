<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\File>
 */
class FileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [];
    }

    public function type($type)
    {
        $file = null;
        $fileName = $type . '_' . Str::random(10);
        if ($type === 'file') {
            $file = UploadedFile::fake()->create($fileName.'.pdf', 1024);
        } elseif ($type === 'cover_image') {
            $file = UploadedFile::fake()->image($fileName.'.jpg', 640, 480);
        }

        return $this->state(function (array $attributes) use ($file, $type) {
            // Almacenar el archivo en la carpeta correspondiente en el almacenamiento
            if (app()->environment('testing')) {
                $path = 'public/' . $type . '/' .$file;
            } else {
                $path = Storage::putFile('public/' . $type, $file);
            }
            return [
                'name' => $file->getClientOriginalName(),
                'path' => $path,
                'type' => $type,
            ];
        });
    }
}
