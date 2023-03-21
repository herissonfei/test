<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

use App\Models\Cellier;
use App\Models\Bouteille;
use App\Models\Type;
use App\Models\Bouteilles_user;

use Illuminate\Support\Facades\DB;


use Illuminate\Http\Request;

class BouteilleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $bouteilles = Bouteille::all();
        
        // return $bouteilles;

        return response()->json($bouteilles);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        // return view('ajout');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Bouteille  $bouteille
     * @return \Illuminate\Http\Response
     */
    public function show(Bouteille $bouteille)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Bouteille  $bouteille
     * @return \Illuminate\Http\Response
     */
    public function edit(Bouteille $bouteille, $id)
    {
        //
        // var_dump($id);
        // return view('test',['id' => $id]);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Bouteille  $bouteille
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Bouteille $bouteille, $id)
    {
        //
        $cellier = Bouteilles_user::find($id);
        $quantite =  $request['quantite'];
    
        DB::table('bouteilles_users')->where('id', $id)->update([
            'quantite' => $quantite
        ]);

        $cellier = Cellier::find($id);
        return response()->json($cellier);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Bouteille  $bouteille
     * @return \Illuminate\Http\Response
     */
    public function destroy(Bouteille $bouteille)
    {
        //
    }

     

    public function modifierUnBouteille(Request $request, Cellier $cellier, $id)
    {
        
        if($request['type'] == 'Vin rouge') {
            $request['type'] = 1; 
        } elseif($request['type'] == 'Vin blanc') {
            $request['type'] = 2;
        }

        DB::table('bouteilles')->where('id', $id)->update([
            'nom' => $request['nom'],
            'pays' => $request['pays'],
            'prix' => $request['prix'],
            'type' => $request['type']
        ]);

        return response()->json($id);

    }










// just pour test
    public function data(Cellier $cellier, $id)
    {
        $bouteilles = Bouteilles_user::select('bouteilles_users.id','bouteilles.id as id_bouteilles', 'celliers.id as id_bouteille_cellier','bouteilles_users.bouteille_id','bouteilles_users.date_achat','bouteilles_users.quantite', 'bouteilles.nom', 'bouteilles.type', 'bouteilles.image', 'bouteilles.code_saq', 'bouteilles.url_saq', 'bouteilles.pays', 'bouteilles.description', 'types.type','users.id as user_Id')
        ->join('bouteilles', 'bouteilles.id', '=', 'bouteilles_users.bouteille_id')
        ->join('celliers', 'celliers.id', '=', 'bouteilles_users.cellier_id')
        ->join('types', 'types.id', '=', 'bouteilles.type')
        ->join('users', 'users.id', '=', 'celliers.user_id')
        ->get();

    

       
       
        return response()->json($id);

        
    }
}
