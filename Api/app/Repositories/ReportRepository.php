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
}
