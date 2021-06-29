<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAtendimentosProcedimentosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('atendimentos_procedimentos', function (Blueprint $table) {
            $table->integer('id_atend_proc', true, true);
            $table->integer('id_atendimento')->unsigned();
            $table->integer('id_profissional')->unsigned();
            $table->integer('id_procedimento')->unsigned();
            $table->decimal('valor_procedimento', 18, 2, true);
            $table->decimal('valor_comissao', 18, 2, true);
            $table->boolean('procedimento_realizado');
            $table->foreign('id_atendimento')->references('id_atendimento')->on('atendimentos');
            $table->foreign('id_profissional')->references('id_profissional')->on('profissionais');
            $table->foreign('id_procedimento')->references('id_procedimento')->on('procedimentos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('atendimentos_procedimentos');
    }
}
