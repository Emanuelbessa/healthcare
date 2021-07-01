<?php

namespace Database\Factories;

use App\Models\Profissional;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProfissionalFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Profissional::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nome_profissional' => $this->faker->name,
            'email_profissional' => $this->faker->unique()->safeEmail,
            'telefone_profissional' => $this->faker->phoneNumber,
        ];
    }
}
