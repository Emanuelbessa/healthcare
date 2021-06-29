<?php

namespace App\Services;

use App\Repositories\ProfissionalRepository;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;

class ProfissionalService
{
    /**
     * @var $profissionalRepository
     */
    protected $profissionalRepository;

    /**
     * ProfissionalService constructor.
     *
     * @param ProfissionalRepository $profissionalRepository
     */
    public function __construct(ProfissionalRepository $profissionalRepository)
    {
        $this->profissionalRepository = $profissionalRepository;
    }

    /**
     * Delete profissional by id.
     *
     * @param $id
     * @return String
     */
    public function deleteById($id)
    {
        DB::beginTransaction();

        try {
            $profissional = $this->profissionalRepository->delete($id);
        } catch (Exception $e) {
            DB::rollBack();
            Log::info($e->getMessage());

            throw new InvalidArgumentException('Não foi possível excluir o profissional');
        }

        DB::commit();

        return $profissional;
    }

    /**
     * Get all profissional.
     *
     * @return String
     */
    public function getAll()
    {
        return $this->profissionalRepository->getAll();
    }

    /**
     * Get profissional by id.
     *
     * @param $id
     * @return String
     */
    public function getById($id)
    {
        return $this->profissionalRepository->getById($id);
    }

    /**
     * Update profissional data
     * Store to DB if there are no errors.
     *
     * @param array $data
     * @return String
     */
    public function updateProfissional($data, $id)
    {
        $validator = Validator::make($data, [
            'nome' => 'min:3',
            'email' => 'email|max:100',
            'telefone' => 'min:10|max:13',
        ]);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors());
        }

        DB::beginTransaction();

        try {
            $profissional = $this->profissionalRepository->update($data, $id);
        } catch (Exception $e) {
            DB::rollBack();
            Log::info($e->getMessage());

            throw new InvalidArgumentException('Não foi possível atualizar o profissional');
        }

        DB::commit();

        return $profissional;
    }

    /**
     * Validate profissional data.
     * Store to DB if there are no errors.
     *
     * @param array $data
     * @return String
     */
    public function saveProfissionalData($data)
    {
        $validator = Validator::make($data, [
            'nome' => 'required|min:3',
            'email' => 'required|email|max:100',
            'telefone' => 'required|min:10|max:13',
        ]);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        $result = $this->profissionalRepository->save($data);

        return $result;
    }
}
