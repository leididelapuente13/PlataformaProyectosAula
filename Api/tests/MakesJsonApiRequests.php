<?php

namespace Tests;

use Closure;
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

        TestResponse::macro(
            'assertJsonApiUserResource',
            $this->assertJsonApiUserResource()
        );
    }


    protected function assertJsonApiValidationErrors(): Closure
    {
        return function ($attribute, $code = 422) {
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
                $this->assertStatus($code);
            } catch (ExpectationFailedException $e) {
                Assert::fail("Fail to fin JSON:API INVALIDATION error for key: '{$attribute}' " . $e->getMessage());
            }
        };
    }

    protected function assertJsonApiUserResource(): Closure
    {
        return function ($user , $code = 200) {
            /**
                @var TestResponse $this
             */

            $this->assertStatus($code);
            $this->assertJson([
                'data' =>
                [
                    'type' => 'user',
                    'id' => (string) $user->getRouteKey(),
                    'attributes' => [
                        'user_name' => $user->user_name,
                        'code' => $user->code,
                        'email' => $user->email,
                        'role_id' => $user->role_id,
                        'description' => $user->description,
                        'state' => '1',
                        'token'=> $this->json('data.attributes.token')
                    ],
                    'links' => [
                        'self' => route('api.user.show' , $user->getRouteKey())
                    ]
                ]
            ]);
        };
    }
}
