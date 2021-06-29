<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
