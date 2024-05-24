<?php

namespace App\Repositories;

use App\Models\Report;

class ReportRepository{
    public function __construct(protected Report $report)
    {
    }

    public function select($perPage){
        return $this->report::paginate($perPage);
    }

    public function insert($title, $description, $file_path, $post_id, $user_id){
        return $this->report::create([
            'title' => $title,
            'description' => $description,
            'path_file' => $file_path,
            'post_id' => $post_id,
            'user_id' => $user_id
        ]);
    }
}
