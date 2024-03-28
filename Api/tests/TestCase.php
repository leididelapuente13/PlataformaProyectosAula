<?php

namespace Tests;

use App\Models\Role;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{

    // Add the trait MakesJsonApiRequest to use its functionality
    use CreatesApplication , MakesJsonApiRequests ;

    
}
