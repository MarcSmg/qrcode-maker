<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Inscription
    public function register(Request $request)
    {
        $request->validate([
            'email'=>'required|email|unique:users',
            'password'=>'required|min:6'
        ]);

        $user = User::create([
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
        ]);

        // Envoyer email de vérification
        $user->sendEmailVerificationNotification();

        return response()->json([
            'message'=>'Utilisateur créé. Email de vérification envoyé !'
        ], 201);
    }

    // Connexion
    public function login(Request $request)
    {
        $request->validate([
            'email'=>'required|email',
            'password'=>'required'
        ]);

        if (!Auth::attempt($request->only('email','password'))) {
            return response()->json(['message'=>'Identifiants incorrects'], 401);
        }

        $user = Auth::user();

        // Vérifier email
        if (!$user->hasVerifiedEmail()) {
            return response()->json(['message'=>'Email non vérifié'], 403);
        }

        return response()->json([
            'message'=>'Connexion réussie',
            'user'=>$user
        ]);
    }
}
