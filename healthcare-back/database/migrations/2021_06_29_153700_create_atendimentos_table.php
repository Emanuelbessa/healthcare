<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAtendimentosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('atendimentos', function (Blueprint $table) {
            $table->integer('id_atendimento', true, true);
            $table->integer('id_paciente')->unsigned();
            $table->decimal('valor_total_procedimento', 18, 2, true);
            $table->decimal('valor_total_comissao', 18, 2, true);
            $table->timestamp('data');
            $table->foreign('id_paciente')->references('id_paciente')->on('pacientes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('atendimentos');
    }
}
