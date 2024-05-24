<?php

namespace App\Services;

use App\Repositories\ReportRepository;
use Illuminate\Http\Request;

class ReportService
{
    public function __construct(protected ReportRepository $reportRepository)
    {
    }

    public function getAll(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $reports = $this->reportRepository->select($perPage);
        if (!$reports) {
            return null;
        }
        return $reports;
    }
}
