<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{

    //Identité
    public function me(Request $request){
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    // Inscription
    public function register(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email'=>'required|email|unique:users',
            'password'=>'required|min:6'
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'email_verified_at' => now(),
        ]);

        // Envoyer email de vérification
        // $user->sendEmailVerificationNotification();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'ok' => true,
            'message'=> 'Utilisateur enrégistré avec succès',
            'user' => [
                'id'=>$user->id,
                'first_name'=>$user->first_name,
                'last_name'=>$user->last_name,
                'email'=>$user->email,
            ],   
            'token' => $token,
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

        $user = $request->user();
        $token = $user->createToken('auth_token')->plainTextToken;

        // Vérifier email
        // if (!$user->hasVerifiedEmail()) {
        //     return response()->json(['message'=>'Email non vérifié'], 403);
        // }

        return response()->json([
            'ok' => true,
            'token'=>$token,
            'user'=>[
                'id'=>$user->id,
                'first_name'=>$user->first_name,
                'last_name'=>$user->last_name,
                'email'=>$user->email,
                'email_verified_at'=>$user->email_verified_at,
            ]
        ], 200);
    }

    //Déconnexion
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'logged out'
        ]);
    }

    public function forgotPassword(Request $request) {
        $request->validate([
            'email' => 'required|email',
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json([
                'ok' => true,
                'code' => 'RESET_LINK_SENT',
                'message' => 'If the email exists, a reset link has been sent.',
            ], 200)
            : response()->json([
                'ok' => false,
                'code' => 'RESET_LINK_FAILED',
                'message' => 'Unable to send reset link.',
            ], 400);
    }
}

