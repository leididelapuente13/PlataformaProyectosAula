<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{

    // Add the trait MakesJsonApiRequest to use its functionality
    use CreatesApplication , MakesJsonApiRequests ;
}
