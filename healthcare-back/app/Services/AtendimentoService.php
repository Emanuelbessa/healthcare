<?php

namespace App\Services;

use App\Repositories\AtendimentoRepository;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;

class AtendimentoService
{
    /**
     * @var $atendimentoRepository
     */
    protected $atendimentoRepository;

    /**
     * AtendimentoService constructor.
     *
     * @param AtendimentoRepository $atendimentoRepository
     */
    public function __construct(AtendimentoRepository $atendimentoRepository)
    {
        $this->atendimentoRepository = $atendimentoRepository;
    }

    /**
     * Delete atendimento by id.
     *
     * @param $id
     * @return String
     */
    public function deleteById($id)
    {
        DB::beginTransaction();

        try {
            $atendimento = $this->atendimentoRepository->delete($id);
        } catch (Exception $e) {
            DB::rollBack();
            Log::info($e->getMessage());

            throw new InvalidArgumentException('Não foi possível excluir o atendimento');
        }

        DB::commit();

        return $atendimento;
    }

    /**
     * Get all atendimento.
     *
     * @return String
     */
    public function getAll()
    {
        return $this->atendimentoRepository->getAll();
    }

    /**
     * Get atendimento by id.
     *
     * @param $id
     * @return String
     */
    public function getById($id)
    {
        return $this->atendimentoRepository->getById($id);
    }

    /**
     * Update atendimento data
     * Store to DB if there are no errors.
     *
     * @param array $data
     * @return String
     */
    public function updateAtendimento($data, $id)
    {
        $validator = Validator::make($data, [
            'valor_total_procedimento' => 'numeric|min:5',
            'valor_total_comissao' => 'numeric|min:5',
        ]);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors());
        }

        DB::beginTransaction();

        try {
            $atendimento = $this->atendimentoRepository->update($data, $id);
        } catch (Exception $e) {
            DB::rollBack();
            Log::info($e->getMessage());

            throw new InvalidArgumentException('Não foi possível atualizar o atendimento');
        }

        DB::commit();

        return $atendimento;
    }

    /**
     * Validate atendimento data.
     * Store to DB if there are no errors.
     *
     * @param array $data
     * @return String
     */
    public function saveAtendimentoData($data)
    {
        $validator = Validator::make($data, [
            'valor_total_procedimento' => 'required|numeric|min:5',
            'valor_total_comissao' => 'required|numeric|min:5',
            'procedimentos' => 'required',
        ]);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        $result = $this->atendimentoRepository->save($data);

        return $result;
    }

    /**
     * Get atendimento by id.
     *
     * @param $id
     * @return String
     */
    public function getWithRelationsById($id)
    {
        return $this->atendimentoRepository->getWithRelationsById($id);
    }


    /**
     * Update atendimento data
     * Store to DB if there are no errors.
     *
     * @param array $data
     * @return String
     */
    public function updateStatusAtendimento($data)
    {
        DB::beginTransaction();

        try {
            $atendimento = $this->atendimentoRepository->updateStatusAtendimento($data);
        } catch (Exception $e) {
            DB::rollBack();
            Log::info($e->getMessage());

            throw new InvalidArgumentException('Não foi possível atualizar o status do atendimento');
        }

        DB::commit();

        return $atendimento;
    }
}
