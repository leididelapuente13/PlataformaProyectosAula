<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('user_name')->unique()->nullable(false);
            $table->bigInteger('code')->unique()->nullable(false);
            $table->string('email')->unique();
            $table->enum('state' , ['0' , '1'])->default('1');
            $table->text('description')->nullable();
            $table->string('password')->nullable(false);

            $table->unsignedBigInteger('role_id');
            $table->foreign('role_id')->references('id')->on('roles');
            
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
