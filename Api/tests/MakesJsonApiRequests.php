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
        TestResponse::macro(
            'assertJsonApiValidationErrors',
            $this->assertJsonApiValidationErrors()
        );
        TestResponse::macro(
            'assertJsonApiUserResource',
            $this->assertJsonApiUserResource()
        );
        TestResponse::macro(
            'assertJsonApiAuthResource',
            $this->assertJsonApiAuthResource()
        );
        TestResponse::macro(
            'assertJsonUsersFilterResource',
            $this->assertJsonUsersFilterResource()
        );
        TestResponse::macro(
            'assertJsonApiPostResource',
            $this->assertJsonApiPostResource()
        );
        TestResponse::macro(
            'assertJsonApiPostsResource',
            $this->assertJsonApiPostsResource()
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

    protected function assertJsonApiAuthResource(): Closure
    {
        return function ($user, $code = 200) {
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
                        'token' => $this->json('data.attributes.token')
                    ],
                    'links' => [
                        'self' => route('api.user.show', $user->getRouteKey())
                    ]
                ]
            ]);
        };
    }

    protected function assertJsonApiUserResource(): Closure
    {
        return function ($user, $userResponse, $createUserTest, $code) {
            /**
                @var TestResponse $this
             */

            $this->assertStatus($code);
            $this->assertJsonStructure([
                'data' =>
                [
                    'type',
                    'id',
                    'attributes' => [
                        'user_name', 'code', 'email', 'role_id', 'description',
                        'state', 'semestre', 'carrera', 'departamento',
                    ],
                    'links' => ['self']
                ]
            ]);

            $createUserTest->assertEquals($userResponse['attributes']['email'], $user->email);
            $createUserTest->assertEquals($userResponse['attributes']['user_name'], $user->user_name);
            $createUserTest->assertEquals($userResponse['attributes']['role_id'], $user->role_id);
            if ($user->role_id == 2) {
                $createUserTest->assertEquals($userResponse['attributes']['departamento'], "");
            } else if ($user->role_id == 3) {
                $createUserTest->assertEquals($userResponse['attributes']['carrera'], "");
                $createUserTest->assertEquals($userResponse['attributes']['semestre'], "");
            }
        };
    }

    protected function assertJsonUsersFilterResource(): Closure
    {
        return function ($users, $usersResponse, $listUserTest) {
            /**
                @var TestResponse $this
             */
            $this->assertOk();
            $this->assertJsonStructure([
                'data' => [
                    '*' => [ //Structure is the same for each user
                        'type',
                        'id',
                        'attributes' => [
                            'user_name',
                            'code',
                            'email',
                            'role_id',
                            'description',
                            'state',
                            'semestre',
                            'carrera',
                            'departamento',
                        ],
                        'links'
                    ]
                ]
            ]);

            // Loop through each user
            foreach ($usersResponse as $userResponse) {
                foreach ($users as $user) {
                    //Only existing users
                    if ($userResponse['attributes']['code'] == $user->code) {
                        //Compare received values with actual
                        $listUserTest->assertEquals($userResponse['attributes']['email'], $user->email);
                        $listUserTest->assertEquals($userResponse['attributes']['user_name'], $user->user_name);
                        $listUserTest->assertEquals($userResponse['attributes']['role_id'], $user->role_id);
                        $listUserTest->assertEquals($userResponse['attributes']['state'], $user->state);
                        if ($user->role_id == 2) {
                            $listUserTest->assertEquals($userResponse['attributes']['departamento'], "");
                        } else if ($user->role_id == 3) {
                            $listUserTest->assertEquals($userResponse['attributes']['carrera'], "");
                            $listUserTest->assertEquals($userResponse['attributes']['semestre'], "");
                        }
                    }
                }
            }
        };
    }

    protected function assertJsonApiPostResource(): Closure
    {
        return function ($post, $code = 200) {
            /**
                @var TestResponse $this
             */

            $this->assertStatus($code);
            $this->assertJson([
                'data' =>
                [
                    'type' => 'post',
                    'id' => (string) $post->getRouteKey(),
                    'attributes' => [
                        'title' => $post->title,
                        'description' => $post->description,
                        'created_at' => $post->created_at,
                        'user_id' => $post->user_id,
                        'likes_count' => $post->likes_count,
                    ],
                    'relationships' => [
                        'user' => [
                            'links' => [
                                'related' => route('api.user.show', $post->user->getRouteKey())
                            ]
                        ],
                        'file' => [
                            'links' => [
                                'related' => route('api.post.files', $post->getRouteKey())
                            ]
                        ]
                    ],
                    'links' => [
                        'self' => route('api.post.show', $post->getRouteKey())
                    ]
                ]
            ]);
        };
    }

    protected function assertJsonApiPostsResource(): Closure
    {
        return function ($posts, $postsResponse, $listPostTest , $user = null) {
            /**
                @var TestResponse $this
             */
            $this->assertOk();
            $this->assertJsonStructure([
                'data' => [
                    '*' => [ //Structure is the same for each user
                        'type',
                        'id',
                        'attributes' => [
                            'title',
                            'description',
                            'created_at',
                            'user_id',
                            'likes_count',
                        ],
                        'relationships' => [
                            'user' => [
                                'links' => [
                                    'related'
                                ]
                            ],
                            'file' => [
                                'links' => [
                                    'related',
                                ]
                            ]
                        ],
                        'links' => [
                            'self',
                        ]
                    ]
                ]
            ]);

            foreach ($posts as $post) {
                foreach ($postsResponse as $postResponse) {
                    if ($postResponse['id'] == $post->id) {
                        $listPostTest->assertEquals($postResponse['attributes']['title'], $post->title);
                        $listPostTest->assertEquals($postResponse['attributes']['description'], $post->description);
                        $listPostTest->assertEquals($postResponse['attributes']['created_at'], $post->created_at);
                        $listPostTest->assertEquals($postResponse['attributes']['likes_count'], $post->likes_count);
                        $listPostTest->assertEquals($postResponse['relationships']['user']['links']['related'], route('api.user.show', $post->user->getRouteKey()));
                        $listPostTest->assertEquals($postResponse['relationships']['file']['links']['related'], route('api.post.files', $post->getRouteKey()));
                        if($user){
                            $listPostTest->assertEquals($postResponse['attributes']['user_id'], $user->getRouteKey());
                        }
                    }
                }
            }
        };
    }
}
