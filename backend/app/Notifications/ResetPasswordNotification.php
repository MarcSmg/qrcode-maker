<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword as BaseResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends BaseResetPassword
{
    public function toMail($notifiable)
    {
        $url = config('app.frontend_url')
            . '/reset-password'
            . '?token=' . $this->token
            . '&email=' . urlencode($notifiable->email);

        return (new MailMessage)
            ->subject('Reset Password')
            ->line('You requested a password reset.')
            ->action('Reset Password', $url)
            ->line('If you did not request this, ignore this email.');
    }
}
