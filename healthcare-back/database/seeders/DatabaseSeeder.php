<?php

namespace Database\Seeders;

use App\Models\Paciente;
use App\Models\Procedimento;
use App\Models\Profissional;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        Paciente::factory(5)->create();
        Procedimento::factory(5)->create();
        Profissional::factory(5)->create();
    }
}
