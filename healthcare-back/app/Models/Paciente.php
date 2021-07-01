<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Atendimento;

class Paciente extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'pacientes';
    protected $primaryKey = 'id_paciente';
    protected $fillable = [
        'nome_paciente',
        'email_paciente',
        'telefone_paciente',
    ];

    public function atendimento()
    {
        return $this->hasMany(Atendimento::class, 'id_paciente');
    }

}
