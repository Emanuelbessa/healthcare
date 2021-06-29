<?php

namespace App\Services;

use App\Repositories\ProcedimentoRepository;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;

class ProcedimentoService
{
    /**
     * @var $procedimentoRepository
     */
    protected $procedimentoRepository;

    /**
     * ProcedimentoService constructor.
     *
     * @param ProcedimentoRepository $procedimentoRepository
     */
    public function __construct(ProcedimentoRepository $procedimentoRepository)
    {
        $this->procedimentoRepository = $procedimentoRepository;
    }

    /**
     * Delete procedimento by id.
     *
     * @param $id
     * @return String
     */
    public function deleteById($id)
    {
        DB::beginTransaction();

        try {
            $procedimento = $this->procedimentoRepository->delete($id);
        } catch (Exception $e) {
            DB::rollBack();
            Log::info($e->getMessage());

            throw new InvalidArgumentException('Não foi possível excluir o procedimento');
        }

        DB::commit();

        return $procedimento;
    }

    /**
     * Get all procedimento.
     *
     * @return String
     */
    public function getAll()
    {
        return $this->procedimentoRepository->getAll();
    }

    /**
     * Get procedimento by id.
     *
     * @param $id
     * @return String
     */
    public function getById($id)
    {
        return $this->procedimentoRepository->getById($id);
    }

    /**
     * Update procedimento data
     * Store to DB if there are no errors.
     *
     * @param array $data
     * @return String
     */
    public function updateProcedimento($data, $id)
    {
        $validator = Validator::make($data, [
            'nome' => 'min:3|string',
            'valor' => 'numeric|min:2|max:10',
            'comissao' => 'numeric|min:2|max:3',
        ]);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors());
        }

        DB::beginTransaction();

        try {
            $procedimento = $this->procedimentoRepository->update($data, $id);
        } catch (Exception $e) {
            DB::rollBack();
            Log::info($e->getMessage());

            throw new InvalidArgumentException('Não foi possível atualizar o procedimento');
        }

        DB::commit();

        return $procedimento;
    }

    /**
     * Validate procedimento data.
     * Store to DB if there are no errors.
     *
     * @param array $data
     * @return String
     */
    public function saveProcedimentoData($data)
    {
        $validator = Validator::make($data, [
            'nome' => 'required|min:3|string',
            'valor' => 'required|numeric|min:5',
            'comissao' => 'required|numeric|min:2|max:80',
        ]);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        $result = $this->procedimentoRepository->save($data);

        return $result;
    }
}
