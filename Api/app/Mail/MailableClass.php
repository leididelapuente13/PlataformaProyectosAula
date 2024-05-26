<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MailableClass extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $subject;
    public $htmlContent;

    /**
     * Create a new message instance.
     */
    public function __construct($subject, $htmlContent)
    {
        $this->subject = $subject;
        $this->htmlContent = $htmlContent;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject($this->subject)
                    ->html(
                        '
                <html>
                    <head>
                        <title>'. $this->htmlContent .'</title>
                    </head>
                    <body>
                        <h1>¡Hola!</h1>
                        <p>'. $this->htmlContent .'</p>
                    </body>
                </html>'
                        );
    }

    /**
     * Get the message envelope.
     */
    // public function envelope(): Envelope
    // {
    //     return new Envelope(
    //         subject: 'Tu cuenta ha sido suspendida',
    //     );
    // }

    // /**
    //  * Get the message content definition.
    //  */
    // public function content(): Content
    // {
    //     // Define el contenido HTML del correo directamente en el código
    //     $htmlContent = '<html>
    //         <head>
    //             <title>Correo de ejemplo</title>
    //         </head>
    //         <body>
    //             <h1>¡Hola!</h1>
    //             <p>Este es un correo de ejemplo.</p>
    //         </body>
    //     </html>';

    //     // Retorna el contenido HTML como una instancia de Content
    //     return new Content(html: $htmlContent);
    // }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
