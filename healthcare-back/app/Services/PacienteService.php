<?php

namespace App\Services;

use App\Repositories\PacienteRepository;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;

class PacienteService
{
    /**
     * @var $pacienteRepository
     */
    protected $pacienteRepository;

    /**
     * PacienteService constructor.
     *
     * @param PacienteRepository $pacienteRepository
     */
    public function __construct(PacienteRepository $pacienteRepository)
    {
        $this->pacienteRepository = $pacienteRepository;
    }

    /**
     * Delete paciente by id.
     *
     * @param $id
     * @return String
     */
    public function deleteById($id)
    {
        DB::beginTransaction();

        try {
            $paciente = $this->pacienteRepository->delete($id);
        } catch (Exception $e) {
            DB::rollBack();
            Log::info($e->getMessage());

            throw new InvalidArgumentException('Não foi possível excluir o paciente');
        }

        DB::commit();

        return $paciente;
    }

    /**
     * Get all paciente.
     *
     * @return String
     */
    public function getAll()
    {
        return $this->pacienteRepository->getAll();
    }

    /**
     * Get paciente by id.
     *
     * @param $id
     * @return String
     */
    public function getById($id)
    {
        return $this->pacienteRepository->getById($id);
    }

    /**
     * Update paciente data
     * Store to DB if there are no errors.
     *
     * @param array $data
     * @return String
     */
    public function updatePaciente($data, $id)
    {
        $validator = Validator::make($data, [
            'nome_paciente' => 'min:3',
            'email_paciente' => 'email|max:100',
            'telefone_paciente' => 'min:10|max:13',
        ]);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors());
        }

        DB::beginTransaction();

        try {
            $paciente = $this->pacienteRepository->update($data, $id);
        } catch (Exception $e) {
            DB::rollBack();
            Log::info($e->getMessage());

            throw new InvalidArgumentException('Não foi possível atualizar o paciente');
        }

        DB::commit();

        return $paciente;
    }

    /**
     * Validate paciente data.
     * Store to DB if there are no errors.
     *
     * @param array $data
     * @return String
     */
    public function savePacienteData($data)
    {
        $validator = Validator::make($data, [
            'nome_paciente' => 'required|min:3',
            'email_paciente' => 'required|email|max:100',
            'telefone_paciente' => 'required|min:10|max:13',
        ]);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        $result = $this->pacienteRepository->save($data);

        return $result;
    }
}
