<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Data;

class MainController extends Controller
{
    public function storeItem(Request $request) {
        $data = new Data ();
        $data->name = $request->name;
        $data->quantity = $request->quantity;
        $data->price = $request->price;
        $data->total = $request->total;
        $data->save ();
        return $data;
    }
    public function readItems() {
        $data = Data::all ();
        return $data;
    }
}
