<?php

namespace App\Http\Controllers;

use App\Models\Cellier;
use App\Models\Bouteille;
use App\Models\Type;
use App\Models\User;
use Illuminate\Http\Request;

class CellierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        //return "Gestion des celliers est en construction !";
        
        $celliers = Cellier::all();
        return response()->json($celliers);
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
        //$user = Auth::user()->name;
        
        // var_dump($celliers[0]);
        // exit;
        //return "Gestion des celliers est en construction !";
        //return response()->json($celliers);
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
        //
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
    public function update(Request $request, Cellier $cellier)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cellier  $cellier
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cellier $cellier)
    {
        //
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
}
