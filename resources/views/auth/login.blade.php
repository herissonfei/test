@extends('layouts.app')

@section('content')

<div class="login-box">
    <h2>{{ __('Login') }}</h2>
    <form method="POST" action="{{ route('login') }}">
        @csrf
        <label for="email">{{ __('Email Address') }}</label>
        <input type="text" id="email" name="email" value="{{ old('email') }}" class=" @error('email') is-invalid @enderror" required autocomplete="email" autofocus>
                @error('email')
                    <span class="error_message" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" name="password" class=" @error('password') is-invalid @enderror" required autocomplete="current-password">
                @error('password')
                    <span class="error_message" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
        <input type="submit" value="Connecter" class="login_submit">
    </form>
</div>


@endsection
