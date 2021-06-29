<?php

namespace App\Repositories;

use App\Models\Procedimento;

class ProcedimentoRepository
{
    /**
     * @var Procedimento
     */
    protected $procedimento;

    /**
     * ProcedimentoRepository constructor.
     *
     * @param Procedimento $procedimento
     */
    public function __construct(Procedimento $procedimento)
    {
        $this->procedimento = $procedimento;
    }

    /**
     * Get all procedimentos.
     *
     * @return Procedimento $procedimento
     */
    public function getAll()
    {
        return $this->procedimento
            ->get();
    }

    /**
     * Get procedimento by id
     *
     * @param $id
     * @return mixed
     */
    public function getById($id)
    {
        return $this->procedimento
            ->where('id_procedimento', $id)
            ->get();
    }

    /**
     * Save Procedimento
     *
     * @param $data
     * @return Procedimento
     */
    public function save($data)
    {
        $procedimento = new $this->procedimento;

        $procedimento->nome_procedimento = $data['nome'];
        $procedimento->valor_procedimento = $data['valor'];
        $procedimento->percentual_comissao = $data['comissao'];

        $procedimento->save();

        return $procedimento->fresh();
    }

    /**
     * Update Procedimento
     *
     * @param $data
     * @return Procedimento
     */
    public function update($data, $id)
    {

        $procedimento = $this->procedimento->find($id);

        $procedimento->nome_procedimento = $data['nome'];
        $procedimento->valor_procedimento = $data['valor'];
        $procedimento->percentual_comissao = $data['comissao'];

        $procedimento->update();

        return $procedimento;
    }

    /**
     * Update Procedimento
     *
     * @param $data
     * @return Procedimento
     */
    public function delete($id)
    {

        $procedimento = $this->procedimento->find($id);
        $procedimento->delete();

        return $procedimento;
    }
}
