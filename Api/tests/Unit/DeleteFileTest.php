<?php

namespace Tests\Unit;

use App\Repositories\PostRepository;
use App\Services\PostService;
use App\Services\UserService;
use Illuminate\Support\Facades\Storage;
use Mockery;
use stdClass;
use Tests\TestCase;

class DeleteFileTest extends TestCase
{
    public function tearDown(): void
    {
        parent::tearDown();
        Mockery::close();
    }

    public function test_file_deletion()
    {
        // Mock del facade Storage para simular la eliminación de un archivo
        Storage::shouldReceive('delete')->once()->with('public/file/example.jpg')->andReturn(true);

        // Crear una instancia del servicio PostService
        $service = new PostService(
            $this->app->make(PostRepository::class),
            $this->app->make(UserService::class)
        );

        // Llamar al método deleteFile con un path de archivo ficticio
        $result = $service->deleteFile('public/file/example.jpg');

        // Verificar que el método retorna true cuando el archivo se elimina correctamente
        $this->assertTrue($result);
    }
}
