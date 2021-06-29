<?php

namespace App\Repositories;

use App\Models\Profissional;

class ProfissionalRepository
{
    /**
     * @var Profissional
     */
    protected $profissional;

    /**
     * ProfissionalRepository constructor.
     *
     * @param Profissional $profissional
     */
    public function __construct(Profissional $profissional)
    {
        $this->profissional = $profissional;
    }

    /**
     * Get all profissionals.
     *
     * @return Profissional $profissional
     */
    public function getAll()
    {
        return $this->profissional
            ->get();
    }

    /**
     * Get profissional by id
     *
     * @param $id
     * @return mixed
     */
    public function getById($id)
    {
        return $this->profissional
            ->where('id_profissional', $id)
            ->get();
    }

    /**
     * Save Profissional
     *
     * @param $data
     * @return Profissional
     */
    public function save($data)
    {
        $profissional = new $this->profissional;

        $profissional->nome_profissional = $data['nome'];
        $profissional->email_profissional = $data['email'];
        $profissional->telefone_profissional = $data['telefone'];

        $profissional->save();

        return $profissional->fresh();
    }

    /**
     * Update Profissional
     *
     * @param $data
     * @return Profissional
     */
    public function update($data, $id)
    {

        $profissional = $this->profissional->find($id);

        $profissional->nome_profissional = $data['nome'];
        $profissional->email_profissional = $data['email'];
        $profissional->telefone_profissional = $data['telefone'];

        $profissional->update();

        return $profissional;
    }

    /**
     * Update Profissional
     *
     * @param $data
     * @return Profissional
     */
    public function delete($id)
    {

        $profissional = $this->profissional->find($id);
        $profissional->delete();

        return $profissional;
    }
}
