<?php

namespace Tests;

use Closure;
use FFI\Exception;
use Illuminate\Testing\TestResponse;
use PHPUnit\Framework\Assert;
use PHPUnit\Framework\ExpectationFailedException;

trait MakesJsonApiRequests
{

    //method that starts before each test
    protected function setUp(): void
    {
        parent::setUp();
        //add functionality to the TestResponse class
        TestResponse::macro('assertJsonApiValidationErrors', $this->assertJsonApiValidationErrors());
    }


    protected function assertJsonApiValidationErrors(): Closure
    {
        return function ($attribute) {
            /**
                @var TestResponse $this
             */
            try {

                // Validate the existence of request attribute and its content
                $this->assertJsonFragment([
                    'source' => ['pointer' => "/data/attributes/{$attribute}"]
                ]);
                $this->assertJsonStructure([
                    'errors' => [
                        [
                            'title',
                            'detail',
                            'source' => ['pointer']
                        ]
                    ]
                ]);
                $this->assertStatus(422);
            } catch (ExpectationFailedException $e) {
                Assert::fail("Fail to fin JSON:API INVALIDATION error for key: '{$attribute}' " . $e->getMessage());
            }
        };
    }
}
