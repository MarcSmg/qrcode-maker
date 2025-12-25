<?php

namespace App\Http\Controllers\Api;

use Illuminate\Foundation\Auth\EmailVerificationRequest;

class EmailVerificationController
{
    public function __invoke(EmailVerificationRequest $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect(config('app.frontend_url') . '/');
        }

        $request->fulfill();

        return redirect(config('app.frontend_url') . '/');
    }
}
