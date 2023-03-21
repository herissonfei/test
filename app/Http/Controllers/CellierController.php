<?php

namespace App\Http\Controllers;

use App\Models\Cellier;
use App\Models\Bouteilles_user;

use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CellierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // afficher les celliers d'utilisateur conneté

         // obtenir les information d'usager connecté
         $id_user_connecte = Auth::user()->id;

         $celliers = Cellier::where('user_id', $id_user_connecte)->get();

        //  if(Auth::user()->privilege == 'admin') {
        //     $celliers = Cellier::all();
        //  }
         return response()->json($celliers);








        //
        //return "Gestion des celliers est en construction !";
        
        //$celliers = Cellier::all();
        // $celliers = Cellier::select('celliers.id', 'celliers.nom', 'celliers.user_id','users.name')
        //             ->join('users', 'users.id', '=', 'celliers.user_id')
        //             ->get();
       
    }

        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function cellierUsager(Request $request)
    {
        //
        //return "Gestion des celliers est en construction !";
        $idUsager =  $request->user_id;
        $celliers = Cellier::select()
                    ->where('user_id','=',$idUsager)
                    ->get();
        return $celliers;

    }
        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function cellierParId(Request $request)
    {
        //
        //return "Gestion des celliers est en construction !";
        
        $idCellier = $request->cellier_id;
        $cellier = Cellier::select('celliers.id', 'celliers.nom', 'celliers.user_id','users.name', 'bouteilles_users.bouteille_id','bouteilles.nom', 'bouteilles.prix','bouteilles.type', 'bouteilles.image', 'bouteilles.code_saq', 'bouteilles.url_saq', 'bouteilles.pays', 'bouteilles.description' )
                            ->join('users', 'users.id', '=', 'celliers.user_id')
                            ->join('bouteilles_users', 'bouteilles_users.cellier_id', '=', 'celliers.id')
                            ->join('bouteilles', 'bouteilles.id', '=', 'bouteilles_users.bouteille_id')
                            ->where('celliers.id','=',$idCellier)
                     ->get();
        return response()->json($cellier);

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
    public function store(Request $request)
    {
        // $objCellier = $request->json()->all();

        // DB::table('celliers')->insert([
        //           'nom'     => $objCellier['nomCellier'],
        //           'user_id' => $objCellier['userId']
        //       ]);

            // return $objCellier;

            
        // $id = Auth::user()->id;

        // $Cellier = Cellier::create([
        //     'nom' => $request->nom,
        //     'user_id' => Auth::user()->id
        // ]);

        DB::table('celliers')->insert([
            'nom'     => $request->nom,
            'user_id' => Auth::user()->id
        ]);

        return true;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cellier  $cellier
     * @return \Illuminate\Http\Response
     */
    public function show(Cellier $cellier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Cellier  $cellier
     * @return \Illuminate\Http\Response
     */
    public function edit(Cellier $cellier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cellier  $cellier
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cellier $cellier, $id)
    {
        //
        DB::table('celliers')->where('id', $id)->update([
            'nom' => $request['nom']
        ]);

        return true;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cellier  $cellier
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cellier $cellier, $id)
    {
        DB::table('celliers')->where('id', $id)->delete();
        return true;
    }

    // public function getListeBouteilleCellier(Cellier $cellier)
    // {
    //     //
    //     $celliers = Cellier::all();
    //     $bouteilles = Bouteille::all();
    //     $types = Type::all();
    //     // $data = [...$celliers,...$bouteilles,...$types];
    //     $data = [$celliers,$bouteilles,$types];
    //     // return $data;
    //     // return $data;
    //     return response()->json($data);
    // }

    public function voir(Request $request)
    {
        //return $request->json()->all();

        return view('test', ['data' => $request->json()->all()]);


        // $celliers = Cellier::select()
        //             ->where('user_id','=',$idUsager)
        //             ->get();
        //return $idUsager;
    }





    // obtenir les bouteilles dans le cellier spécial
    public function getListeBouteilleCellier($id)
    {
        $bouteilles = Bouteilles_user::select('bouteilles_users.id','bouteilles.id as id_bouteille', 'celliers.id as id_cellier','bouteilles_users.bouteille_id','bouteilles_users.date_achat','bouteilles_users.quantite', 'bouteilles.nom', 'bouteilles.prix','bouteilles.type', 'bouteilles.image', 'bouteilles.code_saq', 'bouteilles.url_saq', 'bouteilles.pays', 'bouteilles.description', 'types.type')
        ->join('bouteilles', 'bouteilles.id', '=', 'bouteilles_users.bouteille_id')
        ->join('celliers', 'celliers.id', '=', 'bouteilles_users.cellier_id')
        ->join('types', 'types.id', '=', 'bouteilles.type')
        ->where('celliers.id', '=', $id)
        ->get();
        
        return response()->json($bouteilles);
        
    }
}


