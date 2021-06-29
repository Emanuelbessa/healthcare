<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Procedimento extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'procedimentos';
    protected $primaryKey = 'id_procedimento';
    protected $fillable = [
        'nome_procedimento',
        'valor_procedimento',
        'percentual_comissao',
    ];
}
