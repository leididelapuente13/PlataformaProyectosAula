<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    //paths that are allowed for CORS requests, including the path for the CSRF cookie.
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    //allows all HTTP methods (GET, POST, PUT, DELETE, etc.) for CORS requests.
    'allowed_methods' => ['*'],
    //specifies the allowed origins for CORS requests, allowing requests from any origin.
    'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [],
    //allows all headers to be included in CORS requests.
    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    //Setting it to true allows credentials to be included in CORS requests
    'supports_credentials' => true,

];
