<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AtendimentoProcedimento extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'atendimentos_procedimentos';
    protected $primaryKey = 'id_atend_proc';
    protected $fillable = [
        'id_atendimento',
        'id_profissional',
        'id_procedimento',
        'valor_procedimento',
        'valor_comissao',
        'procedimento_realizado'
    ];

    public function atendimento()
    {
        return $this->belongsTo(Atendimento::class, 'id_atendimento');
    }

    public function procedimento()
    {
        return $this->hasOne(Procedimento::class, 'id_procedimento');
    }

    public function profissional()
    {
        return $this->hasOne(Profissional::class, 'id_profissional');
    }

}
