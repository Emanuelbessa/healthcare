<?php

namespace Database\Factories;

use App\Models\Paciente;
use Illuminate\Database\Eloquent\Factories\Factory;

class PacienteFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Paciente::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nome_paciente' => $this->faker->name,
            'email_paciente' => $this->faker->unique()->safeEmail,
            'telefone_paciente' => $this->faker->phoneNumber,
        ];
    }
}
