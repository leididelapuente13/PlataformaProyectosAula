<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    function __construct(protected User $user)
    {
    }

    public function insert($userApi, $password, $role_id)
    {
        return $this->user::create([
            'user_name' => $userApi['nombre'] . '_' . $userApi['apellidos'],
            'code' => $userApi['codigo'],
            'email' => $userApi['email'],
            'role_id' => $role_id,
            'state' => '1',
            'password' => $password
        ]);
    }

    public function getByCodes($codes)
    {
        return $this->user::whereIn('code', $codes)->get(); // All the users where codes
    }

    public function getByCode($code)
    {
        return $this->user::where('code', $code)->first(); // User where code
    }

    public function getById($id)
    {
        return $this->user::where('id', $id)->first();
    }

    public function getByFilter($filter)
    {
        $query = $this->user::query();
        $query->where('user_name', 'LIKE', '%' . $filter . '%')
            ->orWhere('state', 'LIKE', ($filter == "Activo" || $filter == "activo") ? 1 : (($filter == "Inactivo" || $filter == "inactivo") ? 0 : 3))
            ->orWhere('role_id', 'LIKE', ($filter == "Estudiante") ? 2 : ($filter == "Profesor" ? 3 : 0));
        $query->where('role_id', '!=', 1);
        return $query->get();
    }


    public function query()
    {
        return $this->user::query();
    }

    public function applyFilter($query, $key, $value)
    {
        // Aquí puedes aplicar filtros genéricos, por ejemplo:
        return $query->where($key, $value)->where('role_id', '!=', 1);
    }
}
