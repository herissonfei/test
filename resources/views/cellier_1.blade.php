@extends('layouts.app')

@section('content')
    <div id="entete"></div>
    <div id="cellier" data-set-userId="{{ Auth::user()->id }}" data-set-privilege="{{Auth::user()->privilege }}"></div>
    
@endsection

@section('scripts')
    <script src="{{ asset('js/app.js') }}"></script>
@endsection
