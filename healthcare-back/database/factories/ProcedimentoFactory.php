<?php

namespace Database\Factories;

use App\Models\Procedimento;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProcedimentoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Procedimento::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nome_procedimento' => $this->faker->bothify('Procedimento-######'),
            'valor_procedimento' => $this->faker->randomFloat($nbMaxDecimals = 2, $min = 1, $max = 50000),
            'percentual_comissao' => $this->faker->randomFloat($nbMaxDecimals = 2, $min = 1, $max = 99),
        ];
    }
}
