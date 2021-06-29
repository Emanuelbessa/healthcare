<?php

namespace App\Repositories;

use App\Models\Paciente;

class PacienteRepository
{
    /**
     * @var Paciente
     */
    protected $paciente;

    /**
     * PacienteRepository constructor.
     *
     * @param Paciente $paciente
     */
    public function __construct(Paciente $paciente)
    {
        $this->paciente = $paciente;
    }

    /**
     * Get all pacientes.
     *
     * @return Paciente $paciente
     */
    public function getAll()
    {
        return $this->paciente
            ->get();
    }

    /**
     * Get paciente by id
     *
     * @param $id
     * @return mixed
     */
    public function getById($id)
    {
        return $this->paciente
            ->where('id_paciente', $id)
            ->get();
    }

    /**
     * Save Paciente
     *
     * @param $data
     * @return Paciente
     */
    public function save($data)
    {
        $paciente = new $this->paciente;

        $paciente->nome_paciente = $data['nome'];
        $paciente->email_paciente = $data['email'];
        $paciente->telefone_paciente = $data['telefone'];

        $paciente->save();

        return $paciente->fresh();
    }

    /**
     * Update Paciente
     *
     * @param $data
     * @return Paciente
     */
    public function update($data, $id)
    {

        $paciente = $this->paciente->find($id);

        $paciente->nome_paciente = $data['nome'];
        $paciente->email_paciente = $data['email'];
        $paciente->telefone_paciente = $data['telefone'];

        $paciente->update();

        return $paciente;
    }

    /**
     * Update Paciente
     *
     * @param $data
     * @return Paciente
     */
    public function delete($id)
    {

        $paciente = $this->paciente->find($id);
        $paciente->delete();

        return $paciente;
    }
}
