<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profissional extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'profissionais';
    protected $primaryKey = 'id_profissional';
    protected $fillable = [
        'nome_profissional',
        'email_profissional',
        'telefone_profissional',
    ];

    public function atendimento_procedimento()
    {
        return $this->belongsTo(AtendimentoProcedimento::class, 'id_profissional');
    }
}
