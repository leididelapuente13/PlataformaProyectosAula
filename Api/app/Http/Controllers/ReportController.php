<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateReportRequest;
use App\Http\Resources\ReportCollection;
use App\Services\ReportService;
use Illuminate\Http\Request;

class ReportController extends Controller
{


    public function __construct(protected ReportService $reportService){
    }
    public function index(Request $request){
        $reports = $this->reportService->getAll($request);
        if ($reports == null) {
            return response()->json([], 204);
        }
        return ReportCollection::make($reports);
    }

    public function store(CreateReportRequest $request, $post){
        $report = $this->reportService->create($request, $post);
        if(!$report){
            return response()->json([], 500);
        }
        return response()->json($report, 201);
    }
}
