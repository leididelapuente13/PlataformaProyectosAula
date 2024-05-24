<?php

namespace App\Services;

use App\Http\Requests\CreateReportRequest;
use App\Repositories\ReportRepository;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

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

    public function create(CreateReportRequest $request, $post){
        $title = $request->input('data.attributes.title');
        $description = $request->input('data.attributes.description');
        $user_id = $request->user()->id;

        if ($request->hasFile('data.attributes.pdf')) {
            $file = $request->file('data.attributes.pdf');
            $file_path = $this->storeFile($file, 'public/reports');
        }
        $report =  $this->reportRepository->insert($title, $description, $file_path, $post, $user_id);
        return $report;
    }


    private function storeFile(UploadedFile $file, $path)
    {
        if (app()->environment('testing')) {
            return 'fake_path';
        } else {
            return $file->store($path);
        }
    }

}
