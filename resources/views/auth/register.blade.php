@extends('layouts.app')

@section('content')

<div class="login-box">
    <h2>{{ __('Register') }}</h2>
    <form method="POST" action="{{ route('register') }}">
        @csrf


        <label for="name">{{ __('Name') }}</label>
        <input type="text" id="name" name="name" value="{{ old('name') }}" class=" @error('name') is-invalid @enderror" required autocomplete="name" autofocus>
        @error('name')
            <span class="error_message" role="alert">
                <strong>{{ $message }}</strong>
            </span>
        @enderror

        <label for="email">{{ __('Email Address') }}</label>
        <input type="text" id="email" name="email" value="{{ old('email') }}" class=" @error('email') is-invalid @enderror" required autocomplete="email" autofocus>
        @error('email')
            <span class="error_message" role="alert">
                <strong>{{ $message }}</strong>
            </span>
        @enderror

        <label for="password">{{ __('Password') }}</label>
        <input type="password" id="password" name="password" class=" @error('password') is-invalid @enderror" required autocomplete="current-password">
        @error('password')
            <span class="error_message" role="alert">
                <strong>{{ $message }}</strong>
            </span>
        @enderror

        <label for="password_confirmation">{{ __('Confirm Password') }}</label>
        <input type="password" id="password_confirmation" name="password_confirmation" class=" @error('password') is-invalid @enderror" required autocomplete="current-password">
        @error('password_confirmation')
            <span class="error_message" role="alert">
                <strong>{{ $message }}</strong>
            </span>
        @enderror


        <input type="submit" value="{{ __('Register') }}" class="login_submit">
    </form>
</div>


@endsection
