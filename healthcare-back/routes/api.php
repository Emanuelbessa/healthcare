<?php

use App\Http\Controllers\AtendimentoController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\ProcedimentoController;
use App\Http\Controllers\ProfissionalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResources([
    'atendimentos' => AtendimentoController::class,
    'pacientes' => PacienteController::class,
    'procedimentos' => ProcedimentoController::class,
    'profissionais' => ProfissionalController::class,
]);
Route::get('/atendimentos/procedimentos/{id}', [AtendimentoController::class, 'indexatendimentoprocedimentos']);
Route::post('/atendimentos/update/status', [AtendimentoController::class, 'updatestatusatendimento']);
