<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BouteilleController ;
use App\Http\Controllers\CellierController ;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\CellierBouteilleController ;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// ------------------------------test
Route::get('/aaa', [BouteilleController::class, 'modifierUnBouteille']);

Route::get('/test', function () {
    return view('test');
});
// ------------------------------test



Auth::routes();

Route::get('/ajout', function () {
    return view('ajout');
});

Route::get('/', [CellierBouteilleController::class, 'index']);
Route::get('/home', [CellierBouteilleController::class, 'index']);
Route::get('/accueil', [CellierBouteilleController::class, 'index'])->name('accueil');

// récupérer tous les bouteilles
Route::get('/getListeBouteilleCellier', [BouteilleController::class, 'getListeBouteilleCellier']);

// modificaiton la quantité de bouteille dans un cellier
Route::patch('/bouteille/{id}', [BouteilleController::class, 'update']);

Route::patch('/modBouteille/{id}', [BouteilleController::class, 'modifierUnBouteille']);

Route::get('/getBouteillesSAQ', [BouteilleController::class, 'index']);
Route::post('/ajouteBouteilleCellier' , [CellierBouteilleController::class, 'store']);

Route::get('/cellier', function () {return view('cellier');})->name('mesCellier');
Route::get('/getCelliersUsager/{user_id}', [CellierController::class, 'cellierUsager']);
