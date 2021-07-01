<?php

namespace App\Repositories;

use App\Models\Atendimento;
use App\Models\AtendimentoProcedimento;
use Illuminate\Support\Facades\DB;

class AtendimentoRepository
{
    /**
     * @var Atendimento
     */
    protected $atendimento;

    /**
     * AtendimentoRepository constructor.
     *
     * @param Atendimento $atendimento
     */
    public function __construct(Atendimento $atendimento)
    {
        $this->atendimento = $atendimento;
    }

    /**
     * Get all atendimentos.
     *
     * @return Atendimento $atendimento
     */
    public function getAll()
    {
        return Atendimento::with('atendimento_procedimento', 'paciente')->get();
    }

    /**
     * Get atendimento by id
     *
     * @param $id
     * @return mixed
     */
    public function getById($id)
    {
        return $this->atendimento
            ->find($id)
            ->atendimento_procedimento;
    }

    /**
     * Save Atendimento
     *
     * @param $data
     * @return Atendimento
     */
    public function save($data)
    {

        $atendimento = new $this->atendimento;

        $atendimento->id_paciente = $data['id_paciente'];
        $atendimento->valor_total_procedimento = $data['valor_total_procedimento'];
        $atendimento->valor_total_comissao = $data['valor_total_comissao'];
        $atendimento->data = now();
        $atendimento->save();

        foreach ($data['procedimentos'] as $procedimento) {
            $atendimentoProcedimento = new AtendimentoProcedimento($procedimento);
            $atendimentoProcedimento->id_atendimento = $atendimento->id_atendimento;
            $atendimento->atendimento_procedimento()->save($atendimentoProcedimento);
        }

        return $atendimento->fresh();
    }

    /**
     * Update Atendimento
     *
     * @param $data
     * @return Atendimento
     */
    public function update($data, $id)
    {

        $atendimento = $this->atendimento->find($id);

        $atendimento->nome_atendimento = $data['nome'];
        $atendimento->email_atendimento = $data['email'];
        $atendimento->telefone_atendimento = $data['telefone'];

        $atendimento->update();

        return $atendimento;
    }

    /**
     * Update Atendimento
     *
     * @param $data
     * @return Atendimento
     */
    public function delete($id)
    {

        $atendimento = $this->atendimento->find($id);
        $atendimento->delete();

        return $atendimento;
    }

    /**
     * Get atendimento with all relations by id
     *
     * @param $id
     * @return mixed
     */
    public function getWithRelationsById($id)
    {
        return DB::table('atendimentos')
            ->join('atendimentos_procedimentos', 'atendimentos.id_atendimento', '=', 'atendimentos_procedimentos.id_atendimento')
            ->join('pacientes', 'pacientes.id_paciente', '=', 'atendimentos.id_paciente')
            ->join('procedimentos', 'procedimentos.id_procedimento', '=', 'atendimentos_procedimentos.id_procedimento')
            ->join('profissionais', 'profissionais.id_profissional', '=', 'atendimentos_procedimentos.id_profissional')
            ->where('atendimentos.id_atendimento', '=', $id)
            ->get();
    }

    /**
     * Update Atendimento
     *
     * @param $data
     * @return Atendimento
     */
    public function updateStatusAtendimento($data)
    {

        foreach($data as $key => $value) {
            $procedimentoAtendimento = AtendimentoProcedimento::find($value);
            $procedimentoAtendimento->procedimento_realizado = true;
            $procedimentoAtendimento->update();
        }

        return $procedimentoAtendimento;
    }
}
