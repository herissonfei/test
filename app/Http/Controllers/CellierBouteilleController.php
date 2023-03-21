<?php

namespace App\Http\Controllers;

use App\Models\Bouteilles_user;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;


class cellierBouteilleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    // il faut déplacer les deux fonctions
    public function index()
    {
        return view('auth.login');
    }

    public function logout()
    {
        Auth::logout();
        return view('auth.login');
    }

    public function accueil()
    {
        return view('accueil');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    //public function store(Request $request)
    public function store(Request $request)
    {

        
        
        $objBouteille = $request->json()->all();

        
         DB::table('bouteilles_users')->insert([
                 'date_achat'   => $objBouteille['data_achat'],
                 'quantite'     => $objBouteille['quantite'],
                 'bouteille_id' => $objBouteille['bouteilles_id'],
                 'cellier_id'   => $objBouteille['celliers_id'],
             ]);
            
            //return $objBouteille;

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\cellierBouteille  $cellierBouteille
     * @return \Illuminate\Http\Response
     */
    public function show(cellierBouteille $cellierBouteille)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\cellierBouteille  $cellierBouteille
     * @return \Illuminate\Http\Response
     */
    public function edit(cellierBouteille $cellierBouteille)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\cellierBouteille  $cellierBouteille
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CellierBouteille $cellierBouteille)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\cellierBouteille  $cellierBouteille
     * @return \Illuminate\Http\Response
     */
    public function destroy(cellierBouteille $cellierBouteille)
    {
        //
    }






   
}
