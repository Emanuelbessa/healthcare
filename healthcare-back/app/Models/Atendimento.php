<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Atendimento extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'atendimentos';
    protected $primaryKey = 'id_atendimento';
    protected $fillable = [
        'id_paciente',
        'valor_total_procedimento',
        'valor_total_comissao',
        'data',
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class, 'id_paciente');
    }

    public function atendimento_procedimento()
    {
        return $this->hasMany(AtendimentoProcedimento::class, 'id_atendimento');
    }

}
