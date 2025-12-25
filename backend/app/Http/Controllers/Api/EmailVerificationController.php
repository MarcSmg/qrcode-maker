<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request; 

class EmailVerificationController extends Controller
{
    public function __invoke(Request $request, $id, $hash)
    {
        $user = User::findOrFail($id);

        // Vérification du hash
        if (! hash_equals(sha1($user->email), $hash)) {
            abort(403, 'Invalid verification link.');
        }

        if ($user->hasVerifiedEmail()) {
            return redirect(config('app.frontend_url') . '/');
        }

        $user->markEmailAsVerified();
        event(new Verified($user));

        return redirect(config('app.frontend_url') . '/');
    }
}
